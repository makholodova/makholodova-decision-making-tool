import HistoryRouterHandler from '../history-router-handler';
import type { RequestParameters } from '../../../types/interfaces';

export default class HashRouterHandler extends HistoryRouterHandler {
  constructor(callbackRouter: (parameters: RequestParameters) => void) {
    super(callbackRouter);

    this.params = {
      nameEvent: 'hashchange',
      locationField: 'hash',
    };

    globalThis.addEventListener(this.params.nameEvent, this.handler);
  }

  public static setHistory(url: string): void {
    globalThis.location.href = `${globalThis.location.href.replace(/#(.*)$/, '')}#${url}`;
  }
}

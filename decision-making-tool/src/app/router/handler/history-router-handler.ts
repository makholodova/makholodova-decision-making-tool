import type { RequestParameters } from '../../types/interfaces';

export default class HistoryRouterHandler {
  protected params: { nameEvent: string; locationField: string };
  protected handler: () => void;
  private callback: (parameters: RequestParameters) => void;

  constructor(callback: (parameters: RequestParameters) => void) {
    this.params = {
      nameEvent: 'popstate',
      locationField: 'pathname',
    };
    this.callback = callback;
    this.handler = this.navigate.bind(this);

    globalThis.addEventListener(this.params.nameEvent, this.handler);
  }
  public static setHistory(url: string): void {
    globalThis.history.pushState({}, '', `/${url}`);
  }

  public navigate(url?: string): void {
    if (typeof url === 'string') {
      HistoryRouterHandler.setHistory(url);
    }
    const urlString = globalThis.location.pathname.slice(1);

    console.log('urlString', urlString);

    const result: { path: string; resource: string } = {
      path: '',
      resource: '',
    };
    [result.path = '', result.resource = ''] = urlString.split('/');

    this.callback(result);
  }

  public disable(): void {
    globalThis.removeEventListener(this.params.nameEvent, this.handler);
  }
}

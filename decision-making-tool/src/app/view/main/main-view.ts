import View from '../view';
import type { ElementCreatorParameters } from '../../types/element-creator-parameters';

const DEFAULT_HEADER_CLASS = {
  MAIN: 'main',
};
const defaultMainParameters: ElementCreatorParameters = {
  tag: 'main',
  classNames: [DEFAULT_HEADER_CLASS.MAIN],
};

export default class MainView extends View {
  constructor(parameters: ElementCreatorParameters = defaultMainParameters) {
    super(parameters);
  }

  public setContent(content: View): void {
    const htmlElement: HTMLElement = this.viewElementCreator.getElement();
    while (htmlElement.firstElementChild) {
      htmlElement.firstElementChild.remove();
    }
    this.viewElementCreator.addInnerElement(content.getHtmlElement());
  }
}

import View from '../view';
import type { ElementCreatorParameters } from '../../types/element-creator-parameters';
import { ELEMENT_CLASSES } from '../../constants/constants';

const defaultMainParameters: Readonly<ElementCreatorParameters> = Object.freeze(
  {
    tag: 'main',
    classNames: [ELEMENT_CLASSES.MAIN],
  }
);

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

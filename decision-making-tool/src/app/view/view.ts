import type { ElementCreatorParameters } from '../types/element-creator-parameters';
import { ElementCreator } from '../until/element-creator';

export default class View {
  protected viewElementCreator: ElementCreator;

  constructor(parameters: ElementCreatorParameters) {
    this.viewElementCreator = this.createView(parameters);
  }

  public getHtmlElement(): HTMLElement {
    return this.viewElementCreator.getElement();
  }

  private createView(parameters: ElementCreatorParameters): ElementCreator {
    this.viewElementCreator = new ElementCreator(parameters);
    return this.viewElementCreator;
  }
}

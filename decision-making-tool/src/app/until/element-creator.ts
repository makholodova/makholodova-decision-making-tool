import type { ElementCreatorParameters } from '../types/element-creator-parameters';
const EVENT_TYPES = {
  CLICK: 'click',
  INPUT: 'input',
};

const ERROR_MESSAGES = {
  NOT_A_CANVAS: 'Element is not a canvas.',
};

export class ElementCreator {
  protected element: HTMLElement;

  constructor(parameters: ElementCreatorParameters) {
    this.element = document.createElement(parameters.tag);
    this.createElement(parameters);
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public addInnerElement(element: ElementCreator | HTMLElement): void {
    if (element instanceof ElementCreator) {
      this.element.append(element.getElement());
    } else {
      this.element.append(element);
    }
  }
  public removeElement(): void {
    this.element.remove();
  }

  public getContext(): CanvasRenderingContext2D {
    return this.getCanvasElement().getContext('2d')!;
  }

  public getCanvasElement(): HTMLCanvasElement {
    if (!(this.element instanceof HTMLCanvasElement)) {
      throw new TypeError(ERROR_MESSAGES.NOT_A_CANVAS);
    }
    return this.element;
  }

  protected createElement(parameters: ElementCreatorParameters): void {
    this.setCssClasses(parameters.classNames);
    this.setTextContent(parameters.textContent);
    this.setCallback(parameters.callback);
    this.setAttributes(parameters.attributes);
  }
  protected setTextContent(text: string = ''): void {
    this.element.textContent = text;
  }

  protected setCallback(callback?: (event: Event) => void): void {
    if (typeof callback === 'function') {
      this.element.addEventListener(EVENT_TYPES.CLICK, callback);
      if (this.element instanceof HTMLInputElement) {
        this.element.addEventListener(EVENT_TYPES.INPUT, callback);
      }
    }
  }

  private setCssClasses(cssClasses: string[] = []): void {
    this.element.classList.add(...cssClasses);
  }

  private setAttributes(attributes?: Record<string, string>): void {
    if (attributes) {
      for (const [key, value] of Object.entries(attributes)) {
        this.element.setAttribute(key, value);
      }
    }
  }
}

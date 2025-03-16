import type { ElementCreatorParameters } from '../types/element-creator-parameters';

const DEFAULT_TEXT_CONTENT: string = '';
const DEFAULT_CSS_CLASSES: string[] = [];

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
    if (!(this.element instanceof HTMLCanvasElement)) {
      throw new TypeError('Element is not a canvas.');
    }

    const context = this.element.getContext('2d');
    if (!context) {
      throw new Error('Failed to get 2D context from canvas.');
    }

    return context;
  }

  public getCanvasElement(): HTMLCanvasElement {
    /*const convas= this.element;*/
    if (!(this.element instanceof HTMLCanvasElement)) {
      throw new TypeError('Element is not a canvas.');
    }
    // convas instanceof HTMLCanvasElement
    return this.element;
  }

  protected createElement(parameters: ElementCreatorParameters): void {
    this.setCssClasses(parameters.classNames);
    this.setTextContent(parameters.textContent);
    this.setCallback(parameters.callback);
    this.setAttributes(parameters.attributes);
  }
  protected setTextContent(text: string = DEFAULT_TEXT_CONTENT): void {
    this.element.textContent = text;
  }

  protected setCallback(callback?: (event: Event) => void): void {
    if (
      this.element instanceof HTMLInputElement &&
      typeof callback === 'function'
    ) {
      this.element.addEventListener('input', (event): void => {
        callback(event);
      });
    }

    if (typeof callback === 'function') {
      this.element.addEventListener('click', (event: MouseEvent): void => {
        callback(event);
      });
    }
  }

  private setCssClasses(cssClasses: string[] = DEFAULT_CSS_CLASSES): void {
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

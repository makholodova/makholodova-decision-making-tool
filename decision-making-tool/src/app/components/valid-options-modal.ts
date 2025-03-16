import { ElementCreator } from '../until/element-creator';
import type { ElementCreatorParameters } from '../types/element-creator-parameters';

const dialogParameters: ElementCreatorParameters = {
  tag: 'dialog',
  classNames: ['dialog'],
};
const containerParameters: ElementCreatorParameters = {
  tag: 'div',
  classNames: ['modal-container'],
};
const titleParameters: ElementCreatorParameters = {
  tag: 'h3',
  classNames: ['modal-title'],
  textContent: 'Please add at least 2 valid options',
};
const textParameters: ElementCreatorParameters = {
  tag: 'p',
  classNames: ['modal-text'],
  textContent:
    'An option is considered valid if its title is not empty and its weight is greater than 0',
};

export class ValidOptionsModal extends ElementCreator {
  private container: ElementCreator;
  private title: ElementCreator;
  private closeButton: ElementCreator;
  private text: ElementCreator;

  constructor() {
    super(dialogParameters);
    this.container = new ElementCreator(containerParameters);
    this.title = new ElementCreator(titleParameters);
    this.text = new ElementCreator(textParameters);

    const closeButtonParameters: ElementCreatorParameters = {
      tag: 'button',
      classNames: ['button', 'close-button'],
      textContent: 'Close',
      callback: this.close.bind(this),
    };

    this.closeButton = new ElementCreator(closeButtonParameters);

    this.addInnerElement(this.container);
    this.container.addInnerElement(this.title);
    this.container.addInnerElement(this.text);
    this.container.addInnerElement(this.closeButton);
    this.setupEventListeners();
  }

  public show(): void {
    const element = this.getElement();
    if (element instanceof HTMLDialogElement) {
      element.showModal();
    }
  }

  public close(): void {
    const element = this.getElement();
    if (element instanceof HTMLDialogElement) {
      element.close();
    }
    this.element.remove();
  }

  private setupEventListeners(): void {
    const element = this.getElement();
    if (element instanceof HTMLDialogElement) {
      element.addEventListener('click', (event: MouseEvent) => {
        if (event.target === element) {
          this.close();
        }
      });
      element.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          this.close();
        }
      });
    }
  }
}

import { ElementCreator } from '../until/element-creator';
import type { ElementCreatorParameters } from '../types/element-creator-parameters';
import { BUTTONS_TEXTS, ELEMENT_CLASSES } from '../constants/constants';
const DEFAULT_TITLE_TEXT = 'Please add at least 2 valid options';
const DEFAULT_TEXT_CONTENT =
  'An option is considered valid if its title is not empty and its weight is greater than 0';
const dialogParameters: ElementCreatorParameters = {
  tag: 'dialog',
  classNames: [ELEMENT_CLASSES.DIALOG],
};
const containerParameters: ElementCreatorParameters = {
  tag: 'div',
  classNames: [ELEMENT_CLASSES.MODAL_CONTAINER],
};
const titleParameters: ElementCreatorParameters = {
  tag: 'h3',
  classNames: [ELEMENT_CLASSES.MODAL_TITLE],
  textContent: DEFAULT_TITLE_TEXT,
};
const textParameters: ElementCreatorParameters = {
  tag: 'p',
  classNames: [ELEMENT_CLASSES.MODAL_TEXT],
  textContent: DEFAULT_TEXT_CONTENT,
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
      classNames: [ELEMENT_CLASSES.BUTTON, ELEMENT_CLASSES.CLOSE_BUTTON],
      textContent: BUTTONS_TEXTS.CLOSE,
      callback: this.close.bind(this),
    };
    this.closeButton = new ElementCreator(closeButtonParameters);
    this.configure();
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
  private configure(): void {
    this.addInnerElement(this.container);
    this.container.addInnerElement(this.title);
    this.container.addInnerElement(this.text);
    this.container.addInnerElement(this.closeButton);
    this.setupEventListeners();
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

import { ElementCreator } from '../until/element-creator';
import type { ElementCreatorParameters } from '../types/element-creator-parameters';
import { parseFromCSV } from '../until/parse-from-csv';
import {
  BUTTONS_TEXTS,
  ELEMENT_CLASSES,
  PLACEHOLDER_TEXTAREA,
} from '../constants/constants';

const dialogParameters: ElementCreatorParameters = {
  tag: 'dialog',
  classNames: [ELEMENT_CLASSES.DIALOG],
};
const formParameters: ElementCreatorParameters = {
  tag: 'form',
  classNames: [ELEMENT_CLASSES.FORM],
  callback: (event: Event) => {
    event.preventDefault();
  },
};
const textareaParameters: ElementCreatorParameters = {
  tag: 'textarea',
  classNames: [ELEMENT_CLASSES.TEXTAREA],
  attributes: {
    placeholder: PLACEHOLDER_TEXTAREA,
    name: 'table',
    rows: '12',
    cols: '64',
  },
};

export class PasteListModal extends ElementCreator {
  private form: ElementCreator;
  private textarea: ElementCreator;
  private cancelButton: ElementCreator;
  private confirmButton: ElementCreator;
  private onConfirmCallback: (
    data: { title: string; weight?: string }[]
  ) => void;

  constructor(onConfirm: (data: { title: string; weight?: string }[]) => void) {
    super(dialogParameters);
    this.onConfirmCallback = onConfirm;

    this.form = new ElementCreator(formParameters);
    this.textarea = new ElementCreator(textareaParameters);

    const cancelButtonParameters: ElementCreatorParameters = {
      tag: 'button',
      classNames: [ELEMENT_CLASSES.BUTTON, ELEMENT_CLASSES.CANCEL_BUTTON],
      textContent: BUTTONS_TEXTS.CLOSE,
      attributes: {
        type: 'button',
      },
      callback: this.close.bind(this),
    };

    const confirmButtonParameters: ElementCreatorParameters = {
      tag: 'button',
      classNames: [ELEMENT_CLASSES.BUTTON, ELEMENT_CLASSES.CONFIRM_BUTTON],
      textContent: BUTTONS_TEXTS.CONFIRM,
      callback: (): void => {
        this.handleConfirm();
      },
    };
    this.cancelButton = new ElementCreator(cancelButtonParameters);
    this.confirmButton = new ElementCreator(confirmButtonParameters);

    this.addInnerElement(this.form);
    this.form.addInnerElement(this.textarea);
    this.form.addInnerElement(this.cancelButton);
    this.form.addInnerElement(this.confirmButton);

    this.setupEventListeners();
  }

  public show(): void {
    const element = this.getElement();
    if (element instanceof HTMLDialogElement) {
      element.showModal();
    }
  }

  public close(): void {
    const element: HTMLElement = this.getElement();
    if (element instanceof HTMLDialogElement) {
      element.close();
    }
    this.element.remove();
  }
  private setupEventListeners(): void {
    const element: HTMLElement = this.getElement();
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

  private getValueTextarea(): string {
    const csvElement: HTMLElement = this.textarea.getElement();
    return csvElement instanceof HTMLTextAreaElement ? csvElement.value : '';
  }

  private handleConfirm(): void {
    const parsedData = parseFromCSV(this.getValueTextarea());
    this.onConfirmCallback(parsedData);
    const textareaElement: HTMLElement = this.textarea.getElement();
    if (textareaElement instanceof HTMLTextAreaElement) {
      textareaElement.value = '';
    }
    this.close();
  }
}

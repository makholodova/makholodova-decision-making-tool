import { ElementCreator } from '../until/element-creator';
import type { ElementCreatorParameters } from '../types/element-creator-parameters';
import { parseFromCSV } from '../until/parse-from-csv';

const dialogParameters: ElementCreatorParameters = {
  tag: 'dialog',
  classNames: ['dialog'],
};
const formParameters: ElementCreatorParameters = {
  tag: 'form',
  classNames: ['form'],
  callback: (event: Event) => {
    event.preventDefault();
  },
};
const textareaParameters: ElementCreatorParameters = {
  tag: 'textarea',
  classNames: ['textarea'],
  attributes: {
    placeholder: 'textarea',
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
      classNames: ['button', 'cancel-button'],
      textContent: 'Cancel',
      attributes: {
        type: 'button',
      },
      callback: this.close.bind(this),
    };

    const confirmButtonParameters: ElementCreatorParameters = {
      tag: 'button',
      classNames: ['button', 'confirm-button'],
      textContent: 'Confirm',
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

  /*public parseFromCSV(csv: string): { title: string; weight?: string }[] {
    if (!csv) return [];

    const result: { title: string; weight?: string }[] = [];

    csv.split('\n').forEach((line: string): void => {
      const fields = line.split(/[\t,]\s*!/);
      if (fields.length === 0) return;

      let weight: string | undefined;
      let title = fields.slice(0, -1).join(' ').trim();

      const lastField = fields.at(-1);
      if (isNaN(Number(lastField))) {
        title = fields.join(' ').trim();
      } else {
        weight = lastField;
      }

      result.push({ title, weight });
    });

    return result;
  }*/
  private getValueTextarea(): string {
    const csvElement: HTMLElement = this.textarea.getElement();
    return csvElement instanceof HTMLTextAreaElement ? csvElement.value : '';
  }

  private handleConfirm(): void {
    const parsedData = parseFromCSV(this.getValueTextarea());
    this.onConfirmCallback(parsedData);
    const textareaElement = this.textarea.getElement();
    if (textareaElement instanceof HTMLTextAreaElement) {
      textareaElement.value = '';
    }
    this.close();
  }
}

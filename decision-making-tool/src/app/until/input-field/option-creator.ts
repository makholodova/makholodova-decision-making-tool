import type { ElementCreatorParameters } from '../../types/element-creator-parameters';
import { ElementCreator } from '../element-creator';
import { deleteOption } from '../../../services/local-storage-service';
import type { OptionData } from '../../types/interfaces';

const labelParameters: ElementCreatorParameters = {
  tag: 'label',
  classNames: ['label'],
};
const inputTitleParameters: ElementCreatorParameters = {
  tag: 'input',
  classNames: ['title'],
  attributes: {
    type: 'text',
    placeholder: 'title',
  },
};
const inputWeightParameters: ElementCreatorParameters = {
  tag: 'input',
  classNames: ['weight'],
  attributes: {
    type: 'number',
    placeholder: 'weight',
  },
};

export class OptionCreator extends ElementCreator {
  public onRemove?: (option: OptionCreator) => void;
  private inputTitleElement: ElementCreator;
  private inputWeightElement: ElementCreator;
  private labelElement: ElementCreator;
  private button: ElementCreator;
  private onUpdate: () => void;

  constructor(parameters: ElementCreatorParameters, onUpdate: () => void) {
    super(parameters);
    this.onUpdate = onUpdate;

    this.inputTitleElement = new ElementCreator({
      ...inputTitleParameters,
      callback: this.onUpdate,
    });
    this.inputWeightElement = new ElementCreator({
      ...inputWeightParameters,
      callback: this.onUpdate,
    });
    this.labelElement = new ElementCreator(labelParameters);

    const buttonParameters: ElementCreatorParameters = {
      tag: 'button',
      classNames: ['button'],
      textContent: 'Delete',
      callback: this.removeElement.bind(this),
    };
    this.button = new ElementCreator(buttonParameters);

    this.createElement(parameters);
  }

  public setValueTitle(value: string): void {
    const element: HTMLElement = this.inputTitleElement.getElement();
    if (element instanceof HTMLInputElement) {
      element.value = value;
    }
  }
  public setValueWeight(value: string): void {
    const element: HTMLElement = this.inputWeightElement.getElement();
    if (element instanceof HTMLInputElement) {
      element.value = value.toString();
    }
  }
  public setValueId(value: string): void {
    const element: HTMLElement = this.labelElement.getElement();
    if (element instanceof HTMLElement) {
      element.textContent = value;
    }
    this.element.id = value;
  }
  public getValues(): OptionData {
    const titleElement: HTMLElement = this.inputTitleElement.getElement();
    const weightElement: HTMLElement = this.inputWeightElement.getElement();
    const labelElement: HTMLElement = this.labelElement.getElement();

    return {
      title: titleElement instanceof HTMLInputElement ? titleElement.value : '',
      weight:
        weightElement instanceof HTMLInputElement
          ? weightElement.value || ''
          : '',
      id: labelElement.textContent || '',
    };
  }
  public removeElement(): void {
    this.element.remove();
    deleteOption(this.element.id);

    if (this.onRemove) {
      this.onRemove(this);
    }
    this.onUpdate();
  }

  protected createElement(parameters: ElementCreatorParameters): void {
    super.createElement(parameters);

    this.addInnerElement(this.labelElement);
    this.addInnerElement(this.inputTitleElement);
    this.addInnerElement(this.inputWeightElement);
    this.addInnerElement(this.button);
  }

  /* protected setCallback(callback: (event: Event) => void): void {

    if (typeof callback === 'function') {
      this.inputTitleElement.getElement().addEventListener('input', (event): void => {
        event.stopPropagation();
        console.log('Title input changed');
        callback(event);
      });

      this.inputWeightElement.getElement().addEventListener('input', (event): void => {
        event.stopPropagation();
        console.log('Weight input changed');
        callback(event);
      });
    }
  }*/
}

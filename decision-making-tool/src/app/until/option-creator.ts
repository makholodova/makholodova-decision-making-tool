import type { ElementCreatorParameters } from '../types/element-creator-parameters';
import { ElementCreator } from './element-creator';
import { InputElementCreator } from './input-element-creator';
import type { OptionData } from '../types/interfaces';
import { deleteOption } from '../../services/local-storage-service';
import { ELEMENT_CLASSES, PLACEHOLDER_TEXT } from '../constants/constants';

const labelParameters: ElementCreatorParameters = {
  tag: 'label',
  classNames: [ELEMENT_CLASSES.LABEL],
};
const inputTitleParameters: ElementCreatorParameters = {
  tag: 'input',
  classNames: [ELEMENT_CLASSES.TITLE_INPUT],
  attributes: {
    type: 'text',
    placeholder: PLACEHOLDER_TEXT.TITLE,
  },
};
const inputWeightParameters: ElementCreatorParameters = {
  tag: 'input',
  classNames: [ELEMENT_CLASSES.WEIGHT_INPUT],
  attributes: {
    type: 'number',
    placeholder: PLACEHOLDER_TEXT.WEIGHT,
  },
};

export class OptionCreator extends ElementCreator {
  public onRemove?: (option: OptionCreator) => void;
  private inputTitleElement: InputElementCreator;
  private inputWeightElement: InputElementCreator;
  private labelElement: ElementCreator;
  private button: ElementCreator;
  private onUpdate: () => void;

  constructor(parameters: ElementCreatorParameters, onUpdate: () => void) {
    super(parameters);
    this.onUpdate = onUpdate;

    this.inputTitleElement = new InputElementCreator(
      inputTitleParameters,
      this.onUpdate
    );
    this.inputWeightElement = new InputElementCreator(
      inputWeightParameters,
      this.onUpdate
    );
    this.labelElement = new ElementCreator(labelParameters);
    this.button = this.createDeleteButton();

    this.createElement(parameters);
  }

  public setValueTitle(value: string): void {
    this.inputTitleElement.setValue(value);
  }

  public setValueWeight(value: string): void {
    this.inputWeightElement.setValue(value);
  }

  public setValueId(value: string): void {
    const element: HTMLElement = this.labelElement.getElement();
    if (element instanceof HTMLElement) {
      element.textContent = value;
    }
    this.element.id = value;
  }

  public getValues(): OptionData {
    return {
      title: this.inputTitleElement.getValue(),
      weight: this.inputWeightElement.getValue(),
      id: this.labelElement.getElement().textContent || '',
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

  private createDeleteButton(): ElementCreator {
    const buttonParameters: ElementCreatorParameters = {
      tag: 'button',
      classNames: [
        ELEMENT_CLASSES.BUTTON,
        ELEMENT_CLASSES.ICON_BUTTON,
        ELEMENT_CLASSES.DELETE_BUTTON,
      ],
      callback: this.removeElement.bind(this),
    };
    return new ElementCreator(buttonParameters);
  }
}

import View from '../../view';
import type { ElementCreatorParameters } from '../../../types/element-creator-parameters';
import { ElementCreator } from '../../../until/element-creator';
import type Router from '../../../router/router';

import type { OptionData } from '../../../types/interfaces';
import { WheelCanvas } from '../../../components/wheel-canvas';
import { getOptionsData } from '../../../until/get-options-data';
import type { Sounds } from '../../../components/sound';
import { ELEMENT_CLASSES, Pages } from '../../../constants/constants';
import { InputElementCreator } from '../../../until/input-element-creator';

const defaultErrorParameters: ElementCreatorParameters = {
  tag: 'section',
  classNames: [ELEMENT_CLASSES.DECISION_PICKER],
};
const DecisionPickerContainerParameters: ElementCreatorParameters = {
  tag: 'form',
  classNames: ['decision-picker-container'],
};

const labelParameters: ElementCreatorParameters = {
  tag: 'label',
  classNames: [ELEMENT_CLASSES.DURATION_LABEL],
  textContent: 'Time: ',
};
const inputParameters: ElementCreatorParameters = {
  tag: 'input',
  classNames: [ELEMENT_CLASSES.DURATION],
  attributes: {
    type: 'number',
    value: '12',
    min: '5',
    required: 'true',
    placeholder: 'sec',
  },
};

const pickedOptionParameters: ElementCreatorParameters = {
  tag: 'p',
  classNames: [ELEMENT_CLASSES.PICKED_OPTION],
  textContent: 'Press start button',
};

const canvasParameters: ElementCreatorParameters = {
  tag: 'canvas',
  classNames: [ELEMENT_CLASSES.WHEEL_CANVAS],
  textContent: 'Decision Picker Wheel',
  attributes: { width: '450', height: '450' },
};

export default class DecisionPickerView extends View {
  private pickedOption: ElementCreator;
  private wheelCanvas: ElementCreator;
  private decisionPickerContainer: ElementCreator;
  private labelElement: ElementCreator;
  private inputElement: InputElementCreator;
  private listOfOptions: OptionData[];
  private wheel: WheelCanvas;
  private buttons: ElementCreator[] = [];
  private sounds: Sounds;

  constructor(router: Router, sound: Sounds) {
    super(defaultErrorParameters);

    this.sounds = sound;

    const listOfOptions: OptionData[] | undefined = getOptionsData();
    if (listOfOptions) {
      this.listOfOptions = listOfOptions;
    } else {
      router.navigate(Pages.INDEX);
      this.listOfOptions = [];
    }

    this.decisionPickerContainer = new ElementCreator(
      DecisionPickerContainerParameters
    );

    this.labelElement = new ElementCreator(labelParameters);
    this.inputElement = new InputElementCreator(
      inputParameters,
      (): void => {}
    );
    this.pickedOption = new ElementCreator(pickedOptionParameters);
    this.wheelCanvas = new ElementCreator(canvasParameters);

    this.configureView(router);

    this.wheel = new WheelCanvas(
      this,
      this.listOfOptions,
      this.wheelCanvas,
      this.getSeconds()
    );
  }
  public setPickedOption(value: string): void {
    this.pickedOption.getElement().textContent = value;
  }
  public showPickedOption(isSpinning: boolean): void {
    if (isSpinning) {
      this.pickedOption.getElement().classList.remove(ELEMENT_CLASSES.PICKED);
    } else {
      this.pickedOption.getElement().classList.add(ELEMENT_CLASSES.PICKED);
      this.sounds.playWinSound();
    }
  }

  public setDisabledState(isDisabled: boolean): void {
    for (const button of this.buttons) {
      if (isDisabled) {
        button.getElement().setAttribute('disabled', 'true');
      } else button.getElement().removeAttribute('disabled');
    }

    const inputElement = this.inputElement.getElement();
    if (isDisabled) {
      inputElement.setAttribute('disabled', 'true');
    } else inputElement.removeAttribute('disabled');
  }

  private getSeconds(): number {
    const durationValue = this.inputElement.getValue()
      ? Number(this.inputElement.getValue())
      : '';
    return Number(durationValue);
  }

  private manageSoundsButton(event: Event): void {
    const buttonElement = event.target;
    if (buttonElement instanceof HTMLButtonElement) {
      buttonElement.classList.toggle(
        ELEMENT_CLASSES.SOUND_OFF,
        !this.sounds.enabled
      );
    }
    this.sounds.toggleAudio();
  }

  private configureView(router: Router): void {
    this.labelElement.addInnerElement(this.inputElement);

    const backButton = new ElementCreator({
      tag: 'button',
      classNames: [
        ELEMENT_CLASSES.BUTTON,
        ELEMENT_CLASSES.ICON_BUTTON,
        ELEMENT_CLASSES.BACK_BUTTON,
      ],
      attributes: { type: 'button' },
      callback: (): void => {
        router.navigate(Pages.INDEX);
      },
    });

    const soundButton = new ElementCreator({
      tag: 'button',
      classNames: [
        ELEMENT_CLASSES.BUTTON,
        ELEMENT_CLASSES.ICON_BUTTON,
        ELEMENT_CLASSES.SOUND_BUTTON,
      ],
      attributes: { type: 'button' },
      callback: (event: Event): void => {
        this.manageSoundsButton(event);
      },
    });

    const pickButton = new ElementCreator({
      tag: 'button',
      classNames: [
        ELEMENT_CLASSES.BUTTON,
        ELEMENT_CLASSES.ICON_BUTTON,
        ELEMENT_CLASSES.PICK_BUTTON,
      ],
      callback: (): void => {
        this.wheel.spinWheel(this.getSeconds());
      },
    });

    this.buttons.push(backButton, soundButton, pickButton);

    this.decisionPickerContainer.addInnerElement(backButton);
    if (this.sounds.enabled) {
      soundButton.getElement().classList.add(ELEMENT_CLASSES.SOUND_OFF);
    }
    this.decisionPickerContainer.addInnerElement(soundButton);
    this.decisionPickerContainer.addInnerElement(this.labelElement);
    this.decisionPickerContainer.addInnerElement(pickButton);

    this.viewElementCreator.addInnerElement(this.decisionPickerContainer);
    this.viewElementCreator.addInnerElement(this.pickedOption);
    this.viewElementCreator.addInnerElement(this.wheelCanvas);
  }
}

import View from '../../view';
import type { ElementCreatorParameters } from '../../../types/element-creator-parameters';
import { ElementCreator } from '../../../until/element-creator';
import type Router from '../../../router/router';
import { Pages } from '../../../router/pages';
import type { OptionData } from '../../../types/interfaces';
import { WheelCanvas } from '../../../components/wheel-canvas';
import { getOptionsData } from '../../../until/get-options-data';
import type { Sounds } from '../../../components/sound';

const DEFAULT_DECISION_PICKER_CLASS = {
  SECTION: 'decision-picker',
  BUTTON: 'button',
  BACK_BUTTON: 'back-button',
  SOUND_BUTTON: 'sound-button',
  PICK_BUTTON: 'pick-button',
};

const defaultErrorParameters: ElementCreatorParameters = {
  tag: 'section',
  classNames: [DEFAULT_DECISION_PICKER_CLASS.SECTION],
};
const DecisionPickerContainerParameters: ElementCreatorParameters = {
  tag: 'form',
  classNames: ['decision-picker-container'],
};

const labelParameters: ElementCreatorParameters = {
  tag: 'label',
  classNames: ['duration-label'],
  textContent: 'Time: ',
};
const inputParameters: ElementCreatorParameters = {
  tag: 'input',
  classNames: ['duration'],
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
  classNames: ['picked-option'],
  textContent: 'Press start button',
};

const canvasParameters: ElementCreatorParameters = {
  tag: 'canvas',
  classNames: ['wheel-canvas'],
  textContent: 'Decision Picker Wheel',
  attributes: { width: '512', height: '512' },
};

export default class DecisionPickerView extends View {
  private pickedOption: ElementCreator;
  private wheelCanvas: ElementCreator;
  private decisionPickerContainer: ElementCreator;
  private labelElement: ElementCreator;
  private inputElement: ElementCreator;
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
    this.inputElement = new ElementCreator(inputParameters);

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
      this.pickedOption.getElement().classList.remove('picked');
    } else {
      this.pickedOption.getElement().classList.add('picked');
      this.sounds.playWinSound();
    }
  }

  public setDisabledState(isDisabled: boolean): void {
    for (const button of this.buttons) {
      if (isDisabled) {
        button.getElement().setAttribute('disabled', 'true');
      } else button.getElement().removeAttribute('disabled');
    }
    if (isDisabled) {
      this.inputElement.getElement().setAttribute('disabled', 'true');
    } else this.inputElement.getElement().removeAttribute('disabled');
  }

  private getSeconds(): number {
    const durationElement: HTMLElement = this.inputElement.getElement();
    const durationValue =
      durationElement instanceof HTMLInputElement ? durationElement.value : '';

    return Number(durationValue);
  }

  private manageSoundsButton(event: Event): void {
    const buttonElement = event.target;
    if (buttonElement instanceof HTMLButtonElement) {
      buttonElement.classList.toggle('sound-off', !this.sounds.enabled);
    }
    this.sounds.toggleAudio();
  }

  private configureView(router: Router): void {
    this.labelElement.addInnerElement(this.inputElement);
    this.decisionPickerContainer.addInnerElement(this.labelElement);
    const backButton = new ElementCreator({
      tag: 'button',
      classNames: [
        DEFAULT_DECISION_PICKER_CLASS.BUTTON,
        DEFAULT_DECISION_PICKER_CLASS.BACK_BUTTON,
      ],
      textContent: 'Back',
      attributes: { type: 'button' },
      callback: (): void => {
        router.navigate(Pages.INDEX);
      },
    });

    const soundButton = new ElementCreator({
      tag: 'button',
      classNames: [
        DEFAULT_DECISION_PICKER_CLASS.BUTTON,
        DEFAULT_DECISION_PICKER_CLASS.SOUND_BUTTON,
      ],
      attributes: { type: 'button' },
      callback: (event: Event): void => {
        this.manageSoundsButton(event);
      },
    });

    const pickButton = new ElementCreator({
      tag: 'button',
      classNames: [
        DEFAULT_DECISION_PICKER_CLASS.BUTTON,
        DEFAULT_DECISION_PICKER_CLASS.PICK_BUTTON,
      ],
      textContent: 'Start',
      attributes: { type: 'button' },
      callback: (): void => {
        this.wheel.spinWheel(this.getSeconds());
      },
    });

    this.buttons.push(backButton, soundButton, pickButton);

    this.decisionPickerContainer.addInnerElement(backButton);
    if (this.sounds.enabled) {
      soundButton.getElement().classList.add('sound-off');
    }
    this.decisionPickerContainer.addInnerElement(soundButton);
    this.decisionPickerContainer.addInnerElement(pickButton);

    this.viewElementCreator.addInnerElement(this.decisionPickerContainer);
    this.viewElementCreator.addInnerElement(this.pickedOption);
    this.viewElementCreator.addInnerElement(this.wheelCanvas);
  }
}

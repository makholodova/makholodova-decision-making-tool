import View from '../../view';
import type { ElementCreatorParameters } from '../../../types/element-creator-parameters';
import { ElementCreator } from '../../../until/element-creator';
import type Router from '../../../router/router';
import { Pages } from '../../../router/pages';
import { OptionCreator } from '../../../until/input-field/option-creator';

import {
  clearOptions,
  loadOptions,
  saveOptions,
} from '../../../../services/local-storage-service';
import { PasteListModal } from '../../../components/paste-list-modal';
import type { OptionData } from '../../../types/interfaces';
import { getOptionsData } from '../../../until/get-options-data';
import { ValidOptionsModal } from '../../../components/valid-options-modal';
import type { Sounds } from '../../../components/sound';

const DEFAULT_INDEX_CLASS = {
  OPTIONS: 'options',
  BUTTON: 'button',
  ADD_OPTION_BUTTON: 'add-option-button',
  PASTE_LIST_BUTTON: 'paste-list-button',
  CLEAR_LIST_BUTTON: 'clear-list-button',
  SAVE_LIST_BUTTON: 'save-list-button',
  LOAD_LIST_BUTTON: 'load-list-button',
  START_BUTTON: 'start-button',
};
const defaultErrorParameters: ElementCreatorParameters = {
  tag: 'section',
  classNames: [DEFAULT_INDEX_CLASS.OPTIONS],
};

const listParames = {
  tag: 'ul',
  classNames: ['option-list'],
};

export default class IndexView extends View {
  private creatorList: ElementCreator;
  private optionParames = {
    tag: 'li',
    classNames: ['option'],
  };
  private optionIdCounter: number = 1;
  private optionInstances: OptionCreator[] = [];
  private dialog: PasteListModal;
  private sounds: Sounds;

  constructor(
    router: Router,
    sound: Sounds,
    parameters: ElementCreatorParameters = defaultErrorParameters
  ) {
    super(parameters);
    this.sounds = sound;
    this.creatorList = new ElementCreator(listParames);
    this.dialog = new PasteListModal((parsedData) =>
      this.pasteList(parsedData)
    );
    this.configureView(router);
  }

  private configureView(router: Router): void {
    const buttons = [
      {
        class: DEFAULT_INDEX_CLASS.ADD_OPTION_BUTTON,
        text: 'Add Option',
        action: (): void => this.createAndAddOption(),
      },
      {
        class: DEFAULT_INDEX_CLASS.PASTE_LIST_BUTTON,
        text: 'Paste list',
        action: (): void => {
          //this.dialog = new PasteListModal((parsedData) => this.pasteList(parsedData));
          document.body.append(this.dialog.getElement());
          this.dialog.show();
        },
      },
      {
        class: DEFAULT_INDEX_CLASS.CLEAR_LIST_BUTTON,
        text: 'Clear list',
        action: (): void => this.clearOptions(),
      },
      {
        class: DEFAULT_INDEX_CLASS.SAVE_LIST_BUTTON,
        text: 'Save list to file',
        action: (): void => this.saveListToFile(),
      },
      {
        class: DEFAULT_INDEX_CLASS.LOAD_LIST_BUTTON,
        text: 'Load list from file',
        action: (): void => this.loadListFromFile(),
      },
      {
        class: DEFAULT_INDEX_CLASS.START_BUTTON,
        text: 'Start',
        action: (): void => {
          if (!getOptionsData()) {
            const dialog = new ValidOptionsModal();
            document.body.append(dialog.getElement());
            dialog.show();
          }

          router.navigate(Pages.DECISION_PICKER);
        },
      },
    ];

    this.loadOptions();

    this.viewElementCreator.addInnerElement(this.creatorList);

    for (const { class: className, text, action } of buttons) {
      const buttonParameters: ElementCreatorParameters = {
        tag: 'button',
        classNames: [DEFAULT_INDEX_CLASS.BUTTON, className],
        textContent: text,
        callback: action,
      };
      this.viewElementCreator.addInnerElement(
        new ElementCreator(buttonParameters)
      );
    }
  }

  private createAndAddOption(): void {
    const newOption = new OptionCreator(this.optionParames, () => {
      if (this.optionInstances.length === 0) {
        this.optionIdCounter = 1;
      }
      this.saveOptions();
    });
    const optionId = `#${this.optionIdCounter}`;
    newOption.setValueId(`${optionId}`);
    this.optionIdCounter++;

    newOption.onRemove = (option: OptionCreator): void => {
      this.removeOptionInstance(option);
    };

    this.optionInstances.push(newOption);
    this.creatorList.addInnerElement(newOption);
    this.saveOptions();
  }

  private getOptionsData(): OptionData[] {
    return this.optionInstances.map((option) => option.getValues());
  }

  private saveOptions(): void {
    const options: OptionData[] = this.getOptionsData();
    saveOptions(options);
    localStorage.setItem('optionIdCounter', String(this.optionIdCounter));
  }

  private removeOptionInstance(option: OptionCreator): void {
    this.optionInstances = this.optionInstances.filter((opt) => opt !== option);
    this.saveOptions();
  }

  private loadOptions(): void {
    const savedOptions: OptionData[] = loadOptions();
    const savedCounter = localStorage.getItem('optionIdCounter');

    if (savedCounter) {
      this.optionIdCounter = Number.parseInt(savedCounter, 10);
    }
    if (savedCounter) {
      for (const option of savedOptions) {
        const newOption = new OptionCreator(this.optionParames, () =>
          this.saveOptions()
        );
        newOption.setValueId(option.id);
        newOption.setValueTitle(option.title);
        newOption.setValueWeight(option.weight);

        newOption.onRemove = (option: OptionCreator): void =>
          this.removeOptionInstance(option);

        this.optionInstances.push(newOption);

        this.creatorList.addInnerElement(newOption);
      }
    } else {
      this.createAndAddOption();
    }
  }

  private clearOptions(): void {
    clearOptions();
    const listElement = this.creatorList.getElement();
    while (listElement.firstChild) {
      listElement.firstChild.remove();
    }
    this.optionIdCounter = 1;
    this.optionInstances = [];
    this.saveOptions();
  }
  private saveListToFile(): void {
    const options: OptionData[] = loadOptions();
    const lastId = this.optionIdCounter - 1;

    const dataToSave = {
      list: options,
      lastId: lastId,
    };
    const optionsJson: string = JSON.stringify(dataToSave, undefined, 2);

    const blob = new Blob([optionsJson], { type: 'application/json' });
    const url: string = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'option-list.json';
    link.click();

    URL.revokeObjectURL(url);
  }

  private loadListFromFile(): void {
    const input: HTMLInputElement = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.addEventListener('change', async (event: Event): Promise<void> => {
      const target = event.target;

      if (target instanceof HTMLInputElement) {
        const file = target.files?.[0];
        if (!file) return;

        const result = await file.text();
        const data = JSON.parse(result);

        if (
          !data.list ||
          !Array.isArray(data.list) ||
          typeof data.lastId !== 'number'
        ) {
          console.warn('Invalid file format, creating a new option.');
          this.createAndAddOption();
          return;
        }

        this.clearOptions();
        this.optionIdCounter = data.lastId + 1;

        for (const optionData of data.list) {
          const newOption = new OptionCreator(this.optionParames, () =>
            this.saveOptions()
          );
          newOption.setValueId(optionData.id);
          newOption.setValueTitle(optionData.title);
          newOption.setValueWeight(optionData.weight);

          newOption.onRemove = (option: OptionCreator): void =>
            this.removeOptionInstance(option);

          this.optionInstances.push(newOption);
          this.creatorList.addInnerElement(newOption);
        }

        this.saveOptions();
      } else {
        console.error('Unexpected target type:', target);
      }
    });

    input.click();
  }

  private pasteList(parsedData: { title: string; weight?: string }[]): void {
    console.log('Received parsed data:', parsedData);
    for (const optionData of parsedData) {
      const newOption = new OptionCreator(this.optionParames, () =>
        this.saveOptions()
      );

      const id = `#${this.optionIdCounter}`;
      newOption.setValueId(id);
      newOption.setValueTitle(optionData.title);

      const weight = optionData.weight || '';
      newOption.setValueWeight(weight);

      newOption.onRemove = (option: OptionCreator): void =>
        this.removeOptionInstance(option);

      this.optionInstances.push(newOption);
      this.creatorList.addInnerElement(newOption);
      this.optionIdCounter++;
    }
    this.saveOptions();
  }
}

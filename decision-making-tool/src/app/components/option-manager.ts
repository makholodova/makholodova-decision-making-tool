import { OptionCreator } from '../until/option-creator';
import type { OptionData } from '../types/interfaces';
import {
  clearOptions,
  loadOptions,
  saveOptions,
} from '../../services/local-storage-service';
const ID_PREFIX = '#';
export class OptionManager {
  private optionInstances: OptionCreator[] = [];
  private optionIdCounter: number = 1;
  private optionParams = { tag: 'li', classNames: ['option'] };

  constructor(
    private creatorList: HTMLElement,
    private onUpdate: () => void
  ) {
    this.loadOptions();
  }

  public getOptions(): OptionData[] {
    return this.optionInstances.map(
      (option: OptionCreator): OptionData => option.getValues()
    );
  }

  public createAndAddOption(
    id: string = `${ID_PREFIX}${this.optionIdCounter}`,
    title: string = '',
    weight: string = ''
  ): void {
    const newOption = new OptionCreator(this.optionParams, this.onUpdate);
    newOption.setValueId(id);
    newOption.setValueTitle(title);
    newOption.setValueWeight(weight);
    newOption.onRemove = this.removeOptionInstance.bind(this);

    this.optionInstances.push(newOption);
    this.creatorList.append(newOption.getElement());
    this.optionIdCounter++;
    this.saveOptions();
  }

  public clearOptions(): void {
    clearOptions();
    this.creatorList.innerHTML = '';
    this.optionIdCounter = 1;
    this.optionInstances = [];
    this.saveOptions();
  }

  public saveOptions(): void {
    saveOptions(this.getOptions());
    localStorage.setItem('optionIdCounter', String(this.optionIdCounter));
  }

  public saveListToFile(): void {
    const options: OptionData[] = loadOptions();
    const lastId: number = this.optionIdCounter - 1;

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

  public loadListFromFile(): void {
    const input = Object.assign(document.createElement('input'), {
      type: 'file',
      accept: 'application/json',
    });

    input.addEventListener('change', async (event: Event): Promise<void> => {
      const inputElement = event.target;
      if (inputElement instanceof HTMLInputElement && inputElement.files) {
        const file: File = inputElement.files[0];
        if (!file) return;

        try {
          const { list, lastId } = JSON.parse(await file.text());
          if (!Array.isArray(list) || typeof lastId !== 'number')
            throw new Error('Invalid file format');

          this.clearOptions();
          this.optionIdCounter = lastId + 1;
          for (const { id, title, weight } of list)
            this.createAndAddOption(id, title, weight);
        } catch {
          console.warn('Invalid file format, creating a new option.');
          this.createAndAddOption();
        }
      }
    });

    input.click();
  }

  public pasteList(parsedData: { title: string; weight?: string }[]): void {
    for (const { title, weight } of parsedData)
      this.createAndAddOption(`#${this.optionIdCounter}`, title, weight || '');
  }

  private removeOptionInstance(option: OptionCreator): void {
    this.optionInstances = this.optionInstances.filter((opt) => opt !== option);

    if (this.optionInstances.length === 0) {
      this.optionIdCounter = 1;
    }
    this.saveOptions();
  }
  private loadOptions(): void {
    const savedOptions = loadOptions();
    const savedCounter = Number(localStorage.getItem('optionIdCounter')) || 1;
    this.optionIdCounter = savedCounter;

    if (savedOptions.length > 0) {
      for (const option of savedOptions)
        this.createAndAddOption(option.id, option.title, option.weight);
    } else {
      this.createAndAddOption();
    }
  }
}

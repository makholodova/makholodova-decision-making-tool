import type { OptionData } from '../app/types/interfaces';

export function saveOptions(options: OptionData[]): void {
  localStorage.setItem('options-makholodova', JSON.stringify(options));
}

export function loadOptions(): OptionData[] {
  const savedOptions: string | null = localStorage.getItem(
    'options-makholodova'
  );
  if (savedOptions) {
    try {
      const parsedOptions = JSON.parse(savedOptions);
      if (
        Array.isArray(parsedOptions) &&
        parsedOptions.every(
          (option) => 'id' in option && 'title' in option && 'weight' in option
        )
      ) {
        return parsedOptions;
      }
    } catch (error) {
      console.error('Failed to parse saved options:', error);
    }
  }
  return [];
}

export function clearOptions(): void {
  localStorage.removeItem('options-makholodova');
  localStorage.removeItem('optionIdCounter');
}

export function deleteOption(id: string): void {
  const options: OptionData[] = loadOptions();
  const updatedOptions: OptionData[] = options.filter(
    (option) => option.id !== id
  );
  saveOptions(updatedOptions);
}

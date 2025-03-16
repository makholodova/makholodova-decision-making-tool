import type { OptionData } from '../types/interfaces';
import { loadOptions } from '../../services/local-storage-service';

export function getOptionsData(): OptionData[] | undefined {
  const options: OptionData[] = loadOptions();
  const filteredOptions: OptionData[] = options.filter(
    (option: OptionData): boolean => {
      return option.weight !== '' && option.title !== '';
    }
  );
  return filteredOptions.length > 1 ? filteredOptions : undefined;
}

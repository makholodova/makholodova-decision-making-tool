import type { ElementCreatorParameters } from '../types/element-creator-parameters';
import { ElementCreator } from './element-creator';

export class InputElementCreator extends ElementCreator {
  constructor(parameters: ElementCreatorParameters, onUpdate: () => void) {
    super({ ...parameters, callback: onUpdate });
  }

  public setValue(value: string): void {
    const input: HTMLElement = this.getElement();
    if (input instanceof HTMLInputElement) {
      input.value = value;
    }
  }

  public getValue(): string {
    const input: HTMLElement = this.getElement();
    return input instanceof HTMLInputElement ? input.value : '';
  }
}

import View from '../view';
import type { ElementCreatorParameters } from '../../types/element-creator-parameters';
import { ELEMENT_CLASSES } from '../../constants/constants';

const HEADER_TEXT = 'Decision Making Tool';

const defaultHeaderParameters: Readonly<ElementCreatorParameters> =
  Object.freeze({
    tag: 'header',
    textContent: HEADER_TEXT,
    classNames: [ELEMENT_CLASSES.HEADER],
  });

export default class HeaderView extends View {
  constructor(parameters: ElementCreatorParameters = defaultHeaderParameters) {
    super(parameters);
  }
}

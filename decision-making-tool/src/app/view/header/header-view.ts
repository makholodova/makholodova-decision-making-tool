import View from '../view';
import type { ElementCreatorParameters } from '../../types/element-creator-parameters';

const DEFAULT_HEADER_CLASS = {
  HEADER: 'header',
};
const DEFAULT_HEADER_TEXT = 'Decision Making Tool';

const defaultHeaderParameters: ElementCreatorParameters = {
  tag: 'header',
  textContent: DEFAULT_HEADER_TEXT,
  classNames: [DEFAULT_HEADER_CLASS.HEADER],
};

export default class HeaderView extends View {
  constructor(parameters: ElementCreatorParameters = defaultHeaderParameters) {
    super(parameters);
  }
}

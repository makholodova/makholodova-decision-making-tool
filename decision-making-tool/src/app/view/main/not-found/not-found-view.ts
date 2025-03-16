import View from '../../view';
import type { ElementCreatorParameters } from '../../../types/element-creator-parameters';
import { ElementCreator } from '../../../until/element-creator';
import { Pages } from '../../../router/pages';
import type Router from '../../../router/router';

const DEFAULT_ERROR_CLASS = {
  ERROR: 'not-found',
  TITLE: 'title',
  BUTTON: 'button',
  BUTTON_NOT_FOUND: 'button__not-found',
};
const DEFAULT_ERROR_TEXT = 'Error. Page not found.';
const DEFAULT_BUTTON_TEXT = 'Back to main page';

const defaultErrorParameters: ElementCreatorParameters = {
  tag: 'section',
  classNames: [DEFAULT_ERROR_CLASS.ERROR],
};

export default class NotFoundView extends View {
  constructor(
    router: Router,
    parameters: ElementCreatorParameters = defaultErrorParameters
  ) {
    super(parameters);
    this.configureView(router);
  }
  private configureView(router: Router): void {
    const titleParameters: ElementCreatorParameters = {
      tag: 'h1',
      classNames: [DEFAULT_ERROR_CLASS.TITLE],
      textContent: DEFAULT_ERROR_TEXT,
    };
    const creatorTitle = new ElementCreator(titleParameters);
    this.viewElementCreator.addInnerElement(creatorTitle);

    const buttonParameters: ElementCreatorParameters = {
      tag: 'button',
      classNames: [
        DEFAULT_ERROR_CLASS.BUTTON,
        DEFAULT_ERROR_CLASS.BUTTON_NOT_FOUND,
      ],
      textContent: DEFAULT_BUTTON_TEXT,
      callback: (): void => router.navigate(Pages.INDEX),
    };
    const creatorButton = new ElementCreator(buttonParameters);

    this.viewElementCreator.addInnerElement(creatorButton);
  }
}

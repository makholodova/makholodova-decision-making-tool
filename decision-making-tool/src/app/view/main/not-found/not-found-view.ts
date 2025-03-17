import View from '../../view';
import type { ElementCreatorParameters } from '../../../types/element-creator-parameters';
import { ElementCreator } from '../../../until/element-creator';

import type Router from '../../../router/router';
import {
  ELEMENT_CLASSES,
  ERROR_TEXTS,
  Pages,
} from '../../../constants/constants';

const errorParameters: ElementCreatorParameters = {
  tag: 'section',
  classNames: [ELEMENT_CLASSES.ERROR],
};

export default class NotFoundView extends View {
  constructor(router: Router) {
    super(errorParameters);
    this.configureView(router);
  }
  private configureView(router: Router): void {
    this.addErrorTitle();
    this.addErrorButton(router);
  }

  private addErrorTitle(): void {
    const titleParameters: ElementCreatorParameters = {
      tag: 'h2',
      classNames: [ELEMENT_CLASSES.TITLE],
      textContent: ERROR_TEXTS.TITLE,
    };
    this.viewElementCreator.addInnerElement(
      new ElementCreator(titleParameters)
    );
  }

  private addErrorButton(router: Router): void {
    const buttonParameters: ElementCreatorParameters = {
      tag: 'button',
      classNames: [ELEMENT_CLASSES.BUTTON, ELEMENT_CLASSES.BUTTON_NOT_FOUND],
      textContent: ERROR_TEXTS.BUTTON,
      callback: (): void => router.navigate(Pages.INDEX),
    };
    this.viewElementCreator.addInnerElement(
      new ElementCreator(buttonParameters)
    );
  }
}

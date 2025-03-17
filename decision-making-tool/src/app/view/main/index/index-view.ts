import View from '../../view';
import type { ElementCreatorParameters } from '../../../types/element-creator-parameters';
import { ElementCreator } from '../../../until/element-creator';
import type Router from '../../../router/router';
import { PasteListModal } from '../../../components/paste-list-modal';
import { ValidOptionsModal } from '../../../components/valid-options-modal';
import type { Sounds } from '../../../components/sound';
import {
  BUTTONS_TEXTS,
  ELEMENT_CLASSES,
  Pages,
} from '../../../constants/constants';
import { OptionManager } from '../../../components/option-manager';
import { getOptionsData } from '../../../until/get-options-data';

const defaultErrorParameters: ElementCreatorParameters = {
  tag: 'section',
  classNames: [ELEMENT_CLASSES.OPTIONS],
};

const listParameters = {
  tag: 'ul',
  classNames: [ELEMENT_CLASSES.OPTION_LIST],
};

export default class IndexView extends View {
  private creatorList = new ElementCreator(listParameters);
  private optionManager: OptionManager;
  private dialog: PasteListModal;
  private sounds: Sounds;

  constructor(
    router: Router,
    sound: Sounds,
    parameters: ElementCreatorParameters = defaultErrorParameters
  ) {
    super(parameters);
    this.sounds = sound;
    this.dialog = new PasteListModal((parsedData) =>
      this.optionManager.pasteList(parsedData)
    );
    this.optionManager = new OptionManager(
      this.creatorList.getElement(),
      this.updateView.bind(this)
    );
    this.configureView(router);
  }
  private static showDialog(dialog: PasteListModal | ValidOptionsModal): void {
    document.body.append(dialog.getElement());
    dialog.show();
  }

  private configureView(router: Router): void {
    const buttons = [
      {
        class: ELEMENT_CLASSES.ADD_OPTION_BUTTON,
        text: BUTTONS_TEXTS.ADD_OPTION,
        action: (): void => this.optionManager.createAndAddOption(),
      },
      {
        class: ELEMENT_CLASSES.PASTE_LIST_BUTTON,
        text: BUTTONS_TEXTS.PASTE_LIST,
        action: (): void => {
          IndexView.showDialog(this.dialog);
        },
      },
      {
        class: ELEMENT_CLASSES.CLEAR_LIST_BUTTON,
        text: BUTTONS_TEXTS.CLEAR_LIST,
        action: (): void => this.optionManager.clearOptions(),
      },
      {
        class: ELEMENT_CLASSES.SAVE_LIST_BUTTON,
        text: BUTTONS_TEXTS.SAVE_LIST,
        action: (): void => this.optionManager.saveListToFile(),
      },
      {
        class: ELEMENT_CLASSES.LOAD_LIST_BUTTON,
        text: BUTTONS_TEXTS.LOAD_LIST,
        action: (): void => this.optionManager.loadListFromFile(),
      },
      {
        class: ELEMENT_CLASSES.START_BUTTON,
        text: BUTTONS_TEXTS.START,
        action: (): void => {
          if (getOptionsData()) {
            router.navigate(Pages.DECISION_PICKER);
          } else {
            IndexView.showDialog(new ValidOptionsModal());
          }
        },
      },
    ];

    this.viewElementCreator.addInnerElement(this.creatorList);

    for (const { class: className, text, action } of buttons) {
      this.viewElementCreator.addInnerElement(
        new ElementCreator({
          tag: 'button',
          classNames: [ELEMENT_CLASSES.BUTTON, className],
          textContent: text,
          callback: action,
        })
      );
    }
  }

  private updateView(): void {
    this.optionManager.saveOptions();
  }
}

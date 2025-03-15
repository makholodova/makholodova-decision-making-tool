"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["src_app_view_main_index_index-view_ts"],{

/***/ "./src/app/components/paste-list-modal.ts":
/*!************************************************!*\
  !*** ./src/app/components/paste-list-modal.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PasteListModal: () => (/* binding */ PasteListModal)
/* harmony export */ });
/* harmony import */ var _until_element_creator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../until/element-creator */ "./src/app/until/element-creator.ts");
/* harmony import */ var _until_parse_from_csv__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../until/parse-from-csv */ "./src/app/until/parse-from-csv.ts");


const dialogParameters = {
    tag: 'dialog',
    classNames: ['dialog'],
};
const formParameters = {
    tag: 'form',
    classNames: ['form'],
    callback: (event) => {
        event.preventDefault();
    },
};
const textareaParameters = {
    tag: 'textarea',
    classNames: ['textarea'],
    attributes: {
        placeholder: 'textarea',
        name: 'table',
        rows: '12',
        cols: '64',
    },
};
class PasteListModal extends _until_element_creator__WEBPACK_IMPORTED_MODULE_0__.ElementCreator {
    constructor(onConfirm) {
        super(dialogParameters);
        this.onConfirmCallback = onConfirm;
        this.form = new _until_element_creator__WEBPACK_IMPORTED_MODULE_0__.ElementCreator(formParameters);
        this.textarea = new _until_element_creator__WEBPACK_IMPORTED_MODULE_0__.ElementCreator(textareaParameters);
        const cancelButtonParameters = {
            tag: 'button',
            classNames: ['button', 'cancel-button'],
            textContent: 'Cancel',
            attributes: {
                type: 'button',
            },
            callback: this.close.bind(this),
        };
        const confirmButtonParameters = {
            tag: 'button',
            classNames: ['button', 'confirm-button'],
            textContent: 'Confirm',
            callback: () => {
                this.handleConfirm();
            },
        };
        this.cancelButton = new _until_element_creator__WEBPACK_IMPORTED_MODULE_0__.ElementCreator(cancelButtonParameters);
        this.confirmButton = new _until_element_creator__WEBPACK_IMPORTED_MODULE_0__.ElementCreator(confirmButtonParameters);
        this.addInnerElement(this.form);
        this.form.addInnerElement(this.textarea);
        this.form.addInnerElement(this.cancelButton);
        this.form.addInnerElement(this.confirmButton);
        this.setupEventListeners();
    }
    show() {
        const element = this.getElement();
        if (element instanceof HTMLDialogElement) {
            element.showModal();
        }
    }
    close() {
        const element = this.getElement();
        if (element instanceof HTMLDialogElement) {
            element.close();
        }
        this.element.remove();
    }
    setupEventListeners() {
        const element = this.getElement();
        if (element instanceof HTMLDialogElement) {
            element.addEventListener('click', (event) => {
                if (event.target === element) {
                    this.close();
                }
            });
            element.addEventListener('keydown', (event) => {
                if (event.key === 'Escape') {
                    this.close();
                }
            });
        }
    }
    /*public parseFromCSV(csv: string): { title: string; weight?: string }[] {
      if (!csv) return [];
  
      const result: { title: string; weight?: string }[] = [];
  
      csv.split('\n').forEach((line: string): void => {
        const fields = line.split(/[\t,]\s*!/);
        if (fields.length === 0) return;
  
        let weight: string | undefined;
        let title = fields.slice(0, -1).join(' ').trim();
  
        const lastField = fields.at(-1);
        if (isNaN(Number(lastField))) {
          title = fields.join(' ').trim();
        } else {
          weight = lastField;
        }
  
        result.push({ title, weight });
      });
  
      return result;
    }*/
    getValueTextarea() {
        const csvElement = this.textarea.getElement();
        return csvElement instanceof HTMLTextAreaElement ? csvElement.value : '';
    }
    handleConfirm() {
        const parsedData = (0,_until_parse_from_csv__WEBPACK_IMPORTED_MODULE_1__.parseFromCSV)(this.getValueTextarea());
        this.onConfirmCallback(parsedData);
        const textareaElement = this.textarea.getElement();
        if (textareaElement instanceof HTMLTextAreaElement) {
            textareaElement.value = '';
        }
        this.close();
    }
}


/***/ }),

/***/ "./src/app/components/valid-options-modal.ts":
/*!***************************************************!*\
  !*** ./src/app/components/valid-options-modal.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ValidOptionsModal: () => (/* binding */ ValidOptionsModal)
/* harmony export */ });
/* harmony import */ var _until_element_creator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../until/element-creator */ "./src/app/until/element-creator.ts");

const dialogParameters = {
    tag: 'dialog',
    classNames: ['dialog'],
};
const containerParameters = {
    tag: 'div',
    classNames: ['modal-container'],
};
const titleParameters = {
    tag: 'h3',
    classNames: ['modal-title'],
    textContent: 'Please add at least 2 valid options',
};
const textParameters = {
    tag: 'p',
    classNames: ['modal-text'],
    textContent: 'An option is considered valid if its title is not empty and its weight is greater than 0',
};
class ValidOptionsModal extends _until_element_creator__WEBPACK_IMPORTED_MODULE_0__.ElementCreator {
    constructor() {
        super(dialogParameters);
        this.container = new _until_element_creator__WEBPACK_IMPORTED_MODULE_0__.ElementCreator(containerParameters);
        this.title = new _until_element_creator__WEBPACK_IMPORTED_MODULE_0__.ElementCreator(titleParameters);
        this.text = new _until_element_creator__WEBPACK_IMPORTED_MODULE_0__.ElementCreator(textParameters);
        const closeButtonParameters = {
            tag: 'button',
            classNames: ['button', 'close-button'],
            textContent: 'Close',
            callback: this.close.bind(this),
        };
        this.closeButton = new _until_element_creator__WEBPACK_IMPORTED_MODULE_0__.ElementCreator(closeButtonParameters);
        this.addInnerElement(this.container);
        this.container.addInnerElement(this.title);
        this.container.addInnerElement(this.text);
        this.container.addInnerElement(this.closeButton);
        this.setupEventListeners();
    }
    show() {
        const element = this.getElement();
        if (element instanceof HTMLDialogElement) {
            element.showModal();
        }
    }
    close() {
        const element = this.getElement();
        if (element instanceof HTMLDialogElement) {
            element.close();
        }
        this.element.remove();
    }
    setupEventListeners() {
        const element = this.getElement();
        if (element instanceof HTMLDialogElement) {
            element.addEventListener('click', (event) => {
                if (event.target === element) {
                    this.close();
                }
            });
            element.addEventListener('keydown', (event) => {
                if (event.key === 'Escape') {
                    this.close();
                }
            });
        }
    }
}


/***/ }),

/***/ "./src/app/until/get-options-data.ts":
/*!*******************************************!*\
  !*** ./src/app/until/get-options-data.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getOptionsData: () => (/* binding */ getOptionsData)
/* harmony export */ });
/* harmony import */ var _services_local_storage_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/local-storage-service */ "./src/services/local-storage-service.ts");

function getOptionsData() {
    const options = (0,_services_local_storage_service__WEBPACK_IMPORTED_MODULE_0__.loadOptions)();
    const filteredOptions = options.filter((option) => {
        return option.weight !== '' && option.title !== '';
    });
    return filteredOptions.length > 1 ? filteredOptions : undefined;
}


/***/ }),

/***/ "./src/app/until/input-field/option-creator.ts":
/*!*****************************************************!*\
  !*** ./src/app/until/input-field/option-creator.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OptionCreator: () => (/* binding */ OptionCreator)
/* harmony export */ });
/* harmony import */ var _element_creator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../element-creator */ "./src/app/until/element-creator.ts");
/* harmony import */ var _services_local_storage_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../services/local-storage-service */ "./src/services/local-storage-service.ts");


const labelParameters = {
    tag: 'label',
    classNames: ['label'],
};
const inputTitleParameters = {
    tag: 'input',
    classNames: ['title'],
    attributes: {
        type: 'text',
        placeholder: 'title',
    },
};
const inputWeightParameters = {
    tag: 'input',
    classNames: ['weight'],
    attributes: {
        type: 'number',
        placeholder: 'weight',
    },
};
class OptionCreator extends _element_creator__WEBPACK_IMPORTED_MODULE_0__.ElementCreator {
    constructor(parameters, onUpdate) {
        super(parameters);
        this.onUpdate = onUpdate;
        this.inputTitleElement = new _element_creator__WEBPACK_IMPORTED_MODULE_0__.ElementCreator(Object.assign(Object.assign({}, inputTitleParameters), { callback: this.onUpdate }));
        this.inputWeightElement = new _element_creator__WEBPACK_IMPORTED_MODULE_0__.ElementCreator(Object.assign(Object.assign({}, inputWeightParameters), { callback: this.onUpdate }));
        this.labelElement = new _element_creator__WEBPACK_IMPORTED_MODULE_0__.ElementCreator(labelParameters);
        const buttonParameters = {
            tag: 'button',
            classNames: ['button'],
            textContent: 'Delete',
            callback: this.removeElement.bind(this),
        };
        this.button = new _element_creator__WEBPACK_IMPORTED_MODULE_0__.ElementCreator(buttonParameters);
        this.createElement(parameters);
    }
    setValueTitle(value) {
        const element = this.inputTitleElement.getElement();
        if (element instanceof HTMLInputElement) {
            element.value = value;
        }
    }
    setValueWeight(value) {
        const element = this.inputWeightElement.getElement();
        if (element instanceof HTMLInputElement) {
            element.value = value.toString();
        }
    }
    setValueId(value) {
        const element = this.labelElement.getElement();
        if (element instanceof HTMLElement) {
            element.textContent = value;
        }
        this.element.id = value;
    }
    getValues() {
        const titleElement = this.inputTitleElement.getElement();
        const weightElement = this.inputWeightElement.getElement();
        const labelElement = this.labelElement.getElement();
        return {
            title: titleElement instanceof HTMLInputElement ? titleElement.value : '',
            weight: weightElement instanceof HTMLInputElement
                ? weightElement.value || ''
                : '',
            id: labelElement.textContent || '',
        };
    }
    removeElement() {
        this.element.remove();
        (0,_services_local_storage_service__WEBPACK_IMPORTED_MODULE_1__.deleteOption)(this.element.id);
        if (this.onRemove) {
            this.onRemove(this);
        }
        this.onUpdate();
    }
    createElement(parameters) {
        super.createElement(parameters);
        this.addInnerElement(this.labelElement);
        this.addInnerElement(this.inputTitleElement);
        this.addInnerElement(this.inputWeightElement);
        this.addInnerElement(this.button);
    }
}


/***/ }),

/***/ "./src/app/until/parse-from-csv.ts":
/*!*****************************************!*\
  !*** ./src/app/until/parse-from-csv.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseFromCSV: () => (/* binding */ parseFromCSV)
/* harmony export */ });
function parseFromCSV(csv) {
    if (!csv)
        return [];
    const result = [];
    for (const line of csv.split('\n')) {
        const fields = line.split(/[\t,]\s*/);
        if (fields.length === 0)
            continue;
        let weight;
        let title = fields.slice(0, -1).join(' ').trim();
        const lastField = fields.at(-1);
        if (Number.isNaN(Number(lastField))) {
            title = fields.join(' ').trim();
        }
        else {
            weight = lastField;
        }
        result.push({ title, weight });
    }
    return result;
}


/***/ }),

/***/ "./src/app/view/main/index/index-view.ts":
/*!***********************************************!*\
  !*** ./src/app/view/main/index/index-view.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IndexView)
/* harmony export */ });
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../view */ "./src/app/view/view.ts");
/* harmony import */ var _until_element_creator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../until/element-creator */ "./src/app/until/element-creator.ts");
/* harmony import */ var _router_pages__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../router/pages */ "./src/app/router/pages.ts");
/* harmony import */ var _until_input_field_option_creator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../until/input-field/option-creator */ "./src/app/until/input-field/option-creator.ts");
/* harmony import */ var _services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../services/local-storage-service */ "./src/services/local-storage-service.ts");
/* harmony import */ var _components_paste_list_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/paste-list-modal */ "./src/app/components/paste-list-modal.ts");
/* harmony import */ var _until_get_options_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../until/get-options-data */ "./src/app/until/get-options-data.ts");
/* harmony import */ var _components_valid_options_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../components/valid-options-modal */ "./src/app/components/valid-options-modal.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};








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
const defaultErrorParameters = {
    tag: 'section',
    classNames: [DEFAULT_INDEX_CLASS.OPTIONS],
};
const listParames = {
    tag: 'ul',
    classNames: ['option-list'],
};
class IndexView extends _view__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(router, sound, parameters = defaultErrorParameters) {
        super(parameters);
        this.optionParames = {
            tag: 'li',
            classNames: ['option'],
        };
        this.optionIdCounter = 1;
        this.optionInstances = [];
        this.sounds = sound;
        this.creatorList = new _until_element_creator__WEBPACK_IMPORTED_MODULE_1__.ElementCreator(listParames);
        this.dialog = new _components_paste_list_modal__WEBPACK_IMPORTED_MODULE_5__.PasteListModal((parsedData) => this.pasteList(parsedData));
        this.configureView(router);
    }
    configureView(router) {
        const buttons = [
            {
                class: DEFAULT_INDEX_CLASS.ADD_OPTION_BUTTON,
                text: 'Add Option',
                action: () => this.createAndAddOption(),
            },
            {
                class: DEFAULT_INDEX_CLASS.PASTE_LIST_BUTTON,
                text: 'Paste list',
                action: () => {
                    //this.dialog = new PasteListModal((parsedData) => this.pasteList(parsedData));
                    document.body.append(this.dialog.getElement());
                    this.dialog.show();
                },
            },
            {
                class: DEFAULT_INDEX_CLASS.CLEAR_LIST_BUTTON,
                text: 'Clear list',
                action: () => this.clearOptions(),
            },
            {
                class: DEFAULT_INDEX_CLASS.SAVE_LIST_BUTTON,
                text: 'Save list to file',
                action: () => this.saveListToFile(),
            },
            {
                class: DEFAULT_INDEX_CLASS.LOAD_LIST_BUTTON,
                text: 'Load list from file',
                action: () => this.loadListFromFile(),
            },
            {
                class: DEFAULT_INDEX_CLASS.START_BUTTON,
                text: 'Start',
                action: () => {
                    if (!(0,_until_get_options_data__WEBPACK_IMPORTED_MODULE_6__.getOptionsData)()) {
                        const dialog = new _components_valid_options_modal__WEBPACK_IMPORTED_MODULE_7__.ValidOptionsModal();
                        document.body.append(dialog.getElement());
                        dialog.show();
                    }
                    router.navigate(_router_pages__WEBPACK_IMPORTED_MODULE_2__.Pages.DECISION_PICKER);
                },
            },
        ];
        this.loadOptions();
        this.viewElementCreator.addInnerElement(this.creatorList);
        for (const { class: className, text, action } of buttons) {
            const buttonParameters = {
                tag: 'button',
                classNames: [DEFAULT_INDEX_CLASS.BUTTON, className],
                textContent: text,
                callback: action,
            };
            this.viewElementCreator.addInnerElement(new _until_element_creator__WEBPACK_IMPORTED_MODULE_1__.ElementCreator(buttonParameters));
        }
    }
    createAndAddOption() {
        const newOption = new _until_input_field_option_creator__WEBPACK_IMPORTED_MODULE_3__.OptionCreator(this.optionParames, () => {
            if (this.optionInstances.length === 0) {
                this.optionIdCounter = 1;
            }
            this.saveOptions();
        });
        const optionId = `#${this.optionIdCounter}`;
        newOption.setValueId(`${optionId}`);
        this.optionIdCounter++;
        newOption.onRemove = (option) => {
            this.removeOptionInstance(option);
        };
        this.optionInstances.push(newOption);
        this.creatorList.addInnerElement(newOption);
        this.saveOptions();
    }
    getOptionsData() {
        return this.optionInstances.map((option) => option.getValues());
    }
    saveOptions() {
        const options = this.getOptionsData();
        (0,_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__.saveOptions)(options);
        localStorage.setItem('optionIdCounter', String(this.optionIdCounter));
    }
    removeOptionInstance(option) {
        this.optionInstances = this.optionInstances.filter((opt) => opt !== option);
        this.saveOptions();
    }
    loadOptions() {
        const savedOptions = (0,_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__.loadOptions)();
        const savedCounter = localStorage.getItem('optionIdCounter');
        if (savedCounter) {
            this.optionIdCounter = Number.parseInt(savedCounter, 10);
        }
        if (savedCounter) {
            for (const option of savedOptions) {
                const newOption = new _until_input_field_option_creator__WEBPACK_IMPORTED_MODULE_3__.OptionCreator(this.optionParames, () => this.saveOptions());
                newOption.setValueId(option.id);
                newOption.setValueTitle(option.title);
                newOption.setValueWeight(option.weight);
                newOption.onRemove = (option) => this.removeOptionInstance(option);
                this.optionInstances.push(newOption);
                this.creatorList.addInnerElement(newOption);
            }
        }
        else {
            this.createAndAddOption();
        }
    }
    clearOptions() {
        (0,_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__.clearOptions)();
        const listElement = this.creatorList.getElement();
        while (listElement.firstChild) {
            listElement.firstChild.remove();
        }
        this.optionIdCounter = 1;
        this.optionInstances = [];
        this.saveOptions();
    }
    saveListToFile() {
        const options = (0,_services_local_storage_service__WEBPACK_IMPORTED_MODULE_4__.loadOptions)();
        const lastId = this.optionIdCounter - 1;
        const dataToSave = {
            list: options,
            lastId: lastId,
        };
        const optionsJson = JSON.stringify(dataToSave, undefined, 2);
        const blob = new Blob([optionsJson], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'option-list.json';
        link.click();
        URL.revokeObjectURL(url);
    }
    loadListFromFile() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';
        input.addEventListener('change', (event) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const target = event.target;
            if (target instanceof HTMLInputElement) {
                const file = (_a = target.files) === null || _a === void 0 ? void 0 : _a[0];
                if (!file)
                    return;
                const result = yield file.text();
                const data = JSON.parse(result);
                if (!data.list ||
                    !Array.isArray(data.list) ||
                    typeof data.lastId !== 'number') {
                    console.warn('Invalid file format, creating a new option.');
                    this.createAndAddOption();
                    return;
                }
                this.clearOptions();
                this.optionIdCounter = data.lastId + 1;
                for (const optionData of data.list) {
                    const newOption = new _until_input_field_option_creator__WEBPACK_IMPORTED_MODULE_3__.OptionCreator(this.optionParames, () => this.saveOptions());
                    newOption.setValueId(optionData.id);
                    newOption.setValueTitle(optionData.title);
                    newOption.setValueWeight(optionData.weight);
                    newOption.onRemove = (option) => this.removeOptionInstance(option);
                    this.optionInstances.push(newOption);
                    this.creatorList.addInnerElement(newOption);
                }
                this.saveOptions();
            }
            else {
                console.error('Unexpected target type:', target);
            }
        }));
        input.click();
    }
    pasteList(parsedData) {
        console.log('Received parsed data:', parsedData);
        for (const optionData of parsedData) {
            const newOption = new _until_input_field_option_creator__WEBPACK_IMPORTED_MODULE_3__.OptionCreator(this.optionParames, () => this.saveOptions());
            const id = `#${this.optionIdCounter}`;
            newOption.setValueId(id);
            newOption.setValueTitle(optionData.title);
            const weight = optionData.weight || '';
            newOption.setValueWeight(weight);
            newOption.onRemove = (option) => this.removeOptionInstance(option);
            this.optionInstances.push(newOption);
            this.creatorList.addInnerElement(newOption);
            this.optionIdCounter++;
        }
        this.saveOptions();
    }
}


/***/ }),

/***/ "./src/services/local-storage-service.ts":
/*!***********************************************!*\
  !*** ./src/services/local-storage-service.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearOptions: () => (/* binding */ clearOptions),
/* harmony export */   deleteOption: () => (/* binding */ deleteOption),
/* harmony export */   loadOptions: () => (/* binding */ loadOptions),
/* harmony export */   saveOptions: () => (/* binding */ saveOptions)
/* harmony export */ });
function saveOptions(options) {
    localStorage.setItem('options-makholodova', JSON.stringify(options));
}
function loadOptions() {
    const savedOptions = localStorage.getItem('options-makholodova');
    if (savedOptions) {
        try {
            const parsedOptions = JSON.parse(savedOptions);
            if (Array.isArray(parsedOptions) &&
                parsedOptions.every((option) => 'id' in option && 'title' in option && 'weight' in option)) {
                return parsedOptions;
            }
        }
        catch (error) {
            console.error('Failed to parse saved options:', error);
        }
    }
    return [];
}
function clearOptions() {
    localStorage.removeItem('options-makholodova');
    localStorage.removeItem('optionIdCounter');
}
function deleteOption(id) {
    const options = loadOptions();
    const updatedOptions = options.filter((option) => option.id !== id);
    saveOptions(updatedOptions);
}


/***/ })

}]);
//# sourceMappingURL=src_app_view_main_index_index-view_ts.index.js.map
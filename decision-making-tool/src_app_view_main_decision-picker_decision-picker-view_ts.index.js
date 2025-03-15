"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["src_app_view_main_decision-picker_decision-picker-view_ts"],{

/***/ "./src/app/components/wheel-canvas.ts":
/*!********************************************!*\
  !*** ./src/app/components/wheel-canvas.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WheelCanvas: () => (/* binding */ WheelCanvas)
/* harmony export */ });
/* harmony import */ var _until_text_utiities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../until/text-utiities */ "./src/app/until/text-utiities.ts");
/* harmony import */ var _until_generate_colors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../until/generate-colors */ "./src/app/until/generate-colors.ts");
/* harmony import */ var _until_shuffle_array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../until/shuffle-array */ "./src/app/until/shuffle-array.ts");
/* harmony import */ var _until_canvas_utiities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../until/canvas-utiities */ "./src/app/until/canvas-utiities.ts");
/* harmony import */ var _until_ease_in_out__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../until/ease-in-out */ "./src/app/until/ease-in-out.ts");





class WheelCanvas {
    constructor(decisionPickerView, listOfOptions, canvasElement, seconds) {
        this.rotationAngle = 0;
        this.isSpinning = false;
        this.totalRotationAngle = 0;
        this.totalDuration = 0;
        this.decisionPickerView = decisionPickerView;
        this.listOfOptions = (0,_until_shuffle_array__WEBPACK_IMPORTED_MODULE_2__.shuffleArray)(listOfOptions);
        this.sectorColors = this.listOfOptions.map(() => (0,_until_generate_colors__WEBPACK_IMPORTED_MODULE_1__.getRandomColorRGB)());
        this.canvas = canvasElement.getCanvasElement();
        this.ctx = canvasElement.getContext();
        this.duration = seconds;
        this.spinStartTime = 0;
        this.drawWheel();
    }
    drawWheel() {
        this.ctx.strokeStyle = '#00000';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 50;
        const innerRadius = radius * 0.15;
        (0,_until_canvas_utiities__WEBPACK_IMPORTED_MODULE_3__.clearCanvas)(this.ctx, this.canvas);
        this.ctx.save();
        this.ctx.translate(centerX, centerY);
        this.ctx.rotate(this.rotationAngle);
        this.ctx.translate(-centerX, -centerY);
        this.drawWheelBase(centerX, centerY, radius);
        this.drawWheelText(centerX, centerY, radius);
        this.ctx.restore();
        (0,_until_canvas_utiities__WEBPACK_IMPORTED_MODULE_3__.drawCircle)(this.ctx, centerX, centerY, innerRadius);
        (0,_until_canvas_utiities__WEBPACK_IMPORTED_MODULE_3__.drawCursor)(this.ctx, centerX, centerY, radius);
        (0,_until_canvas_utiities__WEBPACK_IMPORTED_MODULE_3__.drawStar)(this.ctx, centerX, centerY, radius);
        if (this.isSpinning) {
            this.updatePickedOption();
        }
    }
    spinWheel(seconds) {
        this.duration = seconds;
        if (this.duration < 5)
            return;
        if (this.isSpinning)
            return;
        this.isSpinning = true;
        this.decisionPickerView.setDisabledState(this.isSpinning);
        this.decisionPickerView.showPickedOption(this.isSpinning);
        this.spinStartTime = Date.now();
        const rotationCount = this.duration + Math.random() * 3;
        this.totalRotationAngle = 2 * Math.PI * rotationCount;
        this.totalDuration = this.duration * 1000;
        requestAnimationFrame(this.animateSpin.bind(this));
    }
    animateSpin() {
        const timeCount = Date.now() - this.spinStartTime;
        if (timeCount < this.totalDuration) {
            const timeProgress = Math.max(0, Math.min((Date.now() - this.spinStartTime) / (this.duration * 1000), 1));
            const animationProgress = (0,_until_ease_in_out__WEBPACK_IMPORTED_MODULE_4__.easeInOut)(timeProgress);
            this.rotationAngle = this.totalRotationAngle * animationProgress;
            this.drawWheel();
            requestAnimationFrame(this.animateSpin.bind(this));
        }
        else {
            this.isSpinning = false;
            this.decisionPickerView.setDisabledState(this.isSpinning);
            this.decisionPickerView.showPickedOption(this.isSpinning);
            this.drawWheel();
        }
    }
    drawWheelBase(centerX, centerY, radius) {
        const totalWeight = this.listOfOptions.reduce((sum, option) => sum + Number(option.weight), 0);
        let angleStart = -Math.PI / 2;
        for (let index = 0; index < this.listOfOptions.length; index++) {
            const weight = Number(this.listOfOptions[index].weight) / totalWeight;
            const angle = 2 * Math.PI * weight;
            const angleEnd = angleStart + angle;
            this.ctx.beginPath();
            this.ctx.moveTo(centerX, centerY);
            this.ctx.arc(centerX, centerY, radius, angleStart, angleEnd);
            this.ctx.closePath();
            this.ctx.fillStyle = this.sectorColors[index];
            this.ctx.fill();
            this.ctx.stroke();
            angleStart = angleEnd;
        }
    }
    drawWheelText(centerX, centerY, radius) {
        const totalWeight = this.listOfOptions.reduce((sum, option) => sum + Number(option.weight), 0);
        let angleStart = -Math.PI / 2;
        this.ctx.fillStyle = '#FFF';
        this.ctx.font = '16px Arial';
        this.ctx.textBaseline = 'middle';
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
        this.ctx.shadowBlur = 4;
        this.ctx.shadowOffsetX = -2;
        this.ctx.shadowOffsetY = -2;
        for (const option of this.listOfOptions) {
            const weight = Number(option.weight) / totalWeight;
            const angle = 2 * Math.PI * weight;
            const angleEnd = angleStart + angle;
            this.ctx.save();
            this.ctx.translate(centerX, centerY);
            this.ctx.rotate(angleStart + angle / 2);
            const textX = radius * 0.3;
            const textY = 0;
            const maxTextWidth = radius * 0.4;
            let displayedText = option.title;
            const textWidth = this.ctx.measureText(displayedText).width;
            if (textWidth > maxTextWidth) {
                displayedText = (0,_until_text_utiities__WEBPACK_IMPORTED_MODULE_0__.truncateText)(this.ctx, option.title, maxTextWidth);
            }
            const textFitAngle = textWidth / radius;
            if (textFitAngle / 2 > angle) {
                displayedText = '';
            }
            this.ctx.fillText(displayedText, textX, textY);
            this.ctx.restore();
            angleStart = angleEnd;
        }
        this.ctx.shadowColor = 'transparent';
        this.ctx.shadowBlur = 0;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
    }
    getCurrentPickedOption() {
        let currentAngle = ((this.rotationAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        currentAngle = (-currentAngle + Math.PI / 2 + 2 * Math.PI) % (2 * Math.PI); // Корректируем направление
        let currentOption = undefined;
        let angleStart = 0;
        for (const option of this.listOfOptions) {
            const weight = Number(option.weight);
            const totalWeight = this.listOfOptions.reduce((sum, option) => sum + Number(option.weight), 0);
            const angle = (2 * Math.PI * weight) / totalWeight;
            const angleEnd = angleStart + angle;
            if (currentAngle >= angleStart && currentAngle < angleEnd) {
                currentOption = option;
                break;
            }
            angleStart = angleEnd;
        }
        return currentOption;
    }
    updatePickedOption() {
        const pickedOption = this.getCurrentPickedOption();
        if (pickedOption) {
            this.decisionPickerView.setPickedOption(pickedOption.title);
        }
    }
}


/***/ }),

/***/ "./src/app/until/canvas-utiities.ts":
/*!******************************************!*\
  !*** ./src/app/until/canvas-utiities.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearCanvas: () => (/* binding */ clearCanvas),
/* harmony export */   drawCircle: () => (/* binding */ drawCircle),
/* harmony export */   drawCursor: () => (/* binding */ drawCursor),
/* harmony export */   drawStar: () => (/* binding */ drawStar)
/* harmony export */ });
function clearCanvas(context, canvas) {
    context.resetTransform();
    context.clearRect(0, 0, canvas.width, canvas.height);
}
function drawCursor(context, centerX, centerY, radius) {
    /*context.beginPath();
    context.moveTo(centerX - 25, centerY - radius - 20);
    context.lineTo(centerX, centerY - radius - 7);
    context.lineTo(centerX + 25, centerY - radius - 20);
    context.lineTo(centerX, centerY - radius + 30);
    context.closePath();*/
    context.beginPath();
    context.moveTo(centerX + radius + 20, centerY + 25);
    context.lineTo(centerX + radius + 7, centerY);
    context.lineTo(centerX + radius + 20, centerY - 25);
    context.lineTo(centerX + radius - 30, centerY);
    context.closePath();
    context.fillStyle = 'rgba(49,255,195,0.99)';
    context.fill();
    context.stroke();
}
function drawStar(context, centerX, centerY, radius) {
    const outerRadius = radius * 0.15;
    const innerRadius = outerRadius * 0.5;
    const points = 9;
    const angleStep = (Math.PI * 2) / (points * 2);
    context.beginPath();
    for (let index = 0; index < points * 2; index++) {
        const angle = index * angleStep - Math.PI / 2;
        const r = index % 2 === 0 ? outerRadius : innerRadius;
        const x = centerX + Math.cos(angle) * r;
        const y = centerY + Math.sin(angle) * r;
        if (index === 0) {
            context.moveTo(x, y);
        }
        else {
            context.lineTo(x, y);
        }
    }
    context.closePath();
    context.fillStyle = 'rgba(241,248,4,0.99)';
    context.fill();
    context.stroke();
}
function drawCircle(context, centerX, centerY, radius) {
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, Math.PI * 2);
    context.fillStyle = '#FFF';
    context.fill();
    context.stroke();
}


/***/ }),

/***/ "./src/app/until/ease-in-out.ts":
/*!**************************************!*\
  !*** ./src/app/until/ease-in-out.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   easeInOut: () => (/* binding */ easeInOut)
/* harmony export */ });
function easeInOut(x) {
    return x < 0.5 ? 4 * x ** 3 : 4 * x ** 3 - 12 * x ** 2 + 12 * x - 3;
}


/***/ }),

/***/ "./src/app/until/generate-colors.ts":
/*!******************************************!*\
  !*** ./src/app/until/generate-colors.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getRandomColorRGB: () => (/* binding */ getRandomColorRGB)
/* harmony export */ });
function getRandomColorRGB() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
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

/***/ "./src/app/until/shuffle-array.ts":
/*!****************************************!*\
  !*** ./src/app/until/shuffle-array.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   shuffleArray: () => (/* binding */ shuffleArray)
/* harmony export */ });
function shuffleArray(array) {
    const shuffleArray = [...array];
    for (let index = shuffleArray.length - 1; index > 0; index--) {
        const k = Math.floor(Math.random() * (index + 1));
        [shuffleArray[index], shuffleArray[k]] = [
            shuffleArray[k],
            shuffleArray[index],
        ];
    }
    return shuffleArray;
}


/***/ }),

/***/ "./src/app/until/text-utiities.ts":
/*!****************************************!*\
  !*** ./src/app/until/text-utiities.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   truncateText: () => (/* binding */ truncateText)
/* harmony export */ });
function truncateText(context, text, maxWidth) {
    const ellipsis = '...';
    let textWidth = context.measureText(text).width;
    while (text.length > 0 && textWidth > maxWidth) {
        text = text.slice(0, -1);
        textWidth = context.measureText(text + ellipsis).width;
    }
    return text + (textWidth > maxWidth ? '' : ellipsis);
}


/***/ }),

/***/ "./src/app/view/main/decision-picker/decision-picker-view.ts":
/*!*******************************************************************!*\
  !*** ./src/app/view/main/decision-picker/decision-picker-view.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DecisionPickerView)
/* harmony export */ });
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../view */ "./src/app/view/view.ts");
/* harmony import */ var _until_element_creator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../until/element-creator */ "./src/app/until/element-creator.ts");
/* harmony import */ var _router_pages__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../router/pages */ "./src/app/router/pages.ts");
/* harmony import */ var _components_wheel_canvas__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/wheel-canvas */ "./src/app/components/wheel-canvas.ts");
/* harmony import */ var _until_get_options_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../until/get-options-data */ "./src/app/until/get-options-data.ts");





const DEFAULT_DECISION_PICKER_CLASS = {
    SECTION: 'decision-picker',
    BUTTON: 'button',
    BACK_BUTTON: 'back-button',
    SOUND_BUTTON: 'sound-button',
    PICK_BUTTON: 'pick-button',
};
const defaultErrorParameters = {
    tag: 'section',
    classNames: [DEFAULT_DECISION_PICKER_CLASS.SECTION],
};
const DecisionPickerContainerParameters = {
    tag: 'form',
    classNames: ['decision-picker-container'],
};
const labelParameters = {
    tag: 'label',
    classNames: ['duration-label'],
    textContent: 'Time: ',
};
const inputParameters = {
    tag: 'input',
    classNames: ['duration'],
    attributes: {
        type: 'number',
        value: '12',
        min: '5',
        required: 'true',
        placeholder: 'sec',
    },
};
const pickedOptionParameters = {
    tag: 'p',
    classNames: ['picked-option'],
    textContent: 'Press start button',
};
const canvasParameters = {
    tag: 'canvas',
    classNames: ['wheel-canvas'],
    textContent: 'Decision Picker Wheel',
    attributes: { width: '512', height: '512' },
};
class DecisionPickerView extends _view__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(router, sound) {
        super(defaultErrorParameters);
        this.buttons = [];
        this.sounds = sound;
        const listOfOptions = (0,_until_get_options_data__WEBPACK_IMPORTED_MODULE_4__.getOptionsData)();
        if (listOfOptions) {
            this.listOfOptions = listOfOptions;
        }
        else {
            router.navigate(_router_pages__WEBPACK_IMPORTED_MODULE_2__.Pages.INDEX);
            this.listOfOptions = [];
        }
        this.decisionPickerContainer = new _until_element_creator__WEBPACK_IMPORTED_MODULE_1__.ElementCreator(DecisionPickerContainerParameters);
        this.labelElement = new _until_element_creator__WEBPACK_IMPORTED_MODULE_1__.ElementCreator(labelParameters);
        this.inputElement = new _until_element_creator__WEBPACK_IMPORTED_MODULE_1__.ElementCreator(inputParameters);
        this.pickedOption = new _until_element_creator__WEBPACK_IMPORTED_MODULE_1__.ElementCreator(pickedOptionParameters);
        this.wheelCanvas = new _until_element_creator__WEBPACK_IMPORTED_MODULE_1__.ElementCreator(canvasParameters);
        this.configureView(router);
        this.wheel = new _components_wheel_canvas__WEBPACK_IMPORTED_MODULE_3__.WheelCanvas(this, this.listOfOptions, this.wheelCanvas, this.getSeconds());
    }
    setPickedOption(value) {
        this.pickedOption.getElement().textContent = value;
    }
    showPickedOption(isSpinning) {
        if (isSpinning) {
            this.pickedOption.getElement().classList.remove('picked');
        }
        else {
            this.pickedOption.getElement().classList.add('picked');
            this.sounds.playWinSound();
        }
    }
    setDisabledState(isDisabled) {
        for (const button of this.buttons) {
            if (isDisabled) {
                button.getElement().setAttribute('disabled', 'true');
            }
            else
                button.getElement().removeAttribute('disabled');
        }
        if (isDisabled) {
            this.inputElement.getElement().setAttribute('disabled', 'true');
        }
        else
            this.inputElement.getElement().removeAttribute('disabled');
    }
    getSeconds() {
        const durationElement = this.inputElement.getElement();
        const durationValue = durationElement instanceof HTMLInputElement ? durationElement.value : '';
        return Number(durationValue);
    }
    manageSoundsButton(event) {
        const buttonElement = event.target;
        if (buttonElement instanceof HTMLButtonElement) {
            buttonElement.classList.toggle('sound-off', !this.sounds.enabled);
        }
        this.sounds.toggleAudio();
    }
    configureView(router) {
        this.labelElement.addInnerElement(this.inputElement);
        this.decisionPickerContainer.addInnerElement(this.labelElement);
        const backButton = new _until_element_creator__WEBPACK_IMPORTED_MODULE_1__.ElementCreator({
            tag: 'button',
            classNames: [
                DEFAULT_DECISION_PICKER_CLASS.BUTTON,
                DEFAULT_DECISION_PICKER_CLASS.BACK_BUTTON,
            ],
            textContent: 'Back',
            attributes: { type: 'button' },
            callback: () => {
                router.navigate(_router_pages__WEBPACK_IMPORTED_MODULE_2__.Pages.INDEX);
            },
        });
        const soundButton = new _until_element_creator__WEBPACK_IMPORTED_MODULE_1__.ElementCreator({
            tag: 'button',
            classNames: [
                DEFAULT_DECISION_PICKER_CLASS.BUTTON,
                DEFAULT_DECISION_PICKER_CLASS.SOUND_BUTTON,
            ],
            attributes: { type: 'button' },
            callback: (event) => {
                this.manageSoundsButton(event);
            },
        });
        const pickButton = new _until_element_creator__WEBPACK_IMPORTED_MODULE_1__.ElementCreator({
            tag: 'button',
            classNames: [
                DEFAULT_DECISION_PICKER_CLASS.BUTTON,
                DEFAULT_DECISION_PICKER_CLASS.PICK_BUTTON,
            ],
            textContent: 'Start',
            attributes: { type: 'button' },
            callback: () => {
                this.wheel.spinWheel(this.getSeconds());
            },
        });
        this.buttons.push(backButton, soundButton, pickButton);
        this.decisionPickerContainer.addInnerElement(backButton);
        if (this.sounds.enabled) {
            soundButton.getElement().classList.add('sound-off');
        }
        this.decisionPickerContainer.addInnerElement(soundButton);
        this.decisionPickerContainer.addInnerElement(pickButton);
        this.viewElementCreator.addInnerElement(this.decisionPickerContainer);
        this.viewElementCreator.addInnerElement(this.pickedOption);
        this.viewElementCreator.addInnerElement(this.wheelCanvas);
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
//# sourceMappingURL=src_app_view_main_decision-picker_decision-picker-view_ts.index.js.map
"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["src_app_view_main_not-found_not-found-view_ts"],{

/***/ "./src/app/view/main/not-found/not-found-view.ts":
/*!*******************************************************!*\
  !*** ./src/app/view/main/not-found/not-found-view.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NotFoundView)
/* harmony export */ });
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../view */ "./src/app/view/view.ts");
/* harmony import */ var _until_element_creator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../until/element-creator */ "./src/app/until/element-creator.ts");
/* harmony import */ var _router_pages__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../router/pages */ "./src/app/router/pages.ts");



const DEFAULT_ERROR_CLASS = {
    ERROR: 'not-found',
    TITLE: 'title',
    BUTTON: 'button',
    BUTTON_NOT_FOUND: 'button__not-found',
};
const DEFAULT_ERROR_TEXT = 'Error. Page not found.';
const DEFAULT_BUTTON_TEXT = 'Back to main page';
const defaultErrorParameters = {
    tag: 'section',
    classNames: [DEFAULT_ERROR_CLASS.ERROR],
};
class NotFoundView extends _view__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(router, parameters = defaultErrorParameters) {
        super(parameters);
        this.configureView(router);
    }
    configureView(router) {
        const titleParameters = {
            tag: 'h1',
            classNames: [DEFAULT_ERROR_CLASS.TITLE],
            textContent: DEFAULT_ERROR_TEXT,
        };
        const creatorTitle = new _until_element_creator__WEBPACK_IMPORTED_MODULE_1__.ElementCreator(titleParameters);
        this.viewElementCreator.addInnerElement(creatorTitle);
        const buttonParameters = {
            tag: 'button',
            classNames: [
                DEFAULT_ERROR_CLASS.BUTTON,
                DEFAULT_ERROR_CLASS.BUTTON_NOT_FOUND,
            ],
            textContent: DEFAULT_BUTTON_TEXT,
            callback: () => router.navigate(_router_pages__WEBPACK_IMPORTED_MODULE_2__.Pages.INDEX),
        };
        const creatorButton = new _until_element_creator__WEBPACK_IMPORTED_MODULE_1__.ElementCreator(buttonParameters);
        this.viewElementCreator.addInnerElement(creatorButton);
    }
}


/***/ })

}]);
//# sourceMappingURL=src_app_view_main_not-found_not-found-view_ts.index.js.map
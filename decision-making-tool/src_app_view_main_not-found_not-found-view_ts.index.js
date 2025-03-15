"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk"] = self["webpackChunk"] || []).push([["src_app_view_main_not-found_not-found-view_ts"],{

/***/ "./src/app/view/main/not-found/not-found-view.ts":
/*!*******************************************************!*\
  !*** ./src/app/view/main/not-found/not-found-view.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ NotFoundView)\n/* harmony export */ });\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../view */ \"./src/app/view/view.ts\");\n/* harmony import */ var _until_element_creator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../until/element-creator */ \"./src/app/until/element-creator.ts\");\n/* harmony import */ var _router_pages__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../router/pages */ \"./src/app/router/pages.ts\");\n\n\n\nconst DEFAULT_ERROR_CLASS = {\n    ERROR: 'not-found',\n    TITLE: 'title',\n    BUTTON: 'button',\n    BUTTON_NOT_FOUND: 'button__not-found',\n};\nconst DEFAULT_ERROR_TEXT = 'Error. Page not found.';\nconst DEFAULT_BUTTON_TEXT = 'Back to main page';\nconst defaultErrorParameters = {\n    tag: 'section',\n    classNames: [DEFAULT_ERROR_CLASS.ERROR],\n};\nclass NotFoundView extends _view__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor(router, parameters = defaultErrorParameters) {\n        super(parameters);\n        this.configureView(router);\n    }\n    configureView(router) {\n        const titleParameters = {\n            tag: 'h1',\n            classNames: [DEFAULT_ERROR_CLASS.TITLE],\n            textContent: DEFAULT_ERROR_TEXT,\n        };\n        const creatorTitle = new _until_element_creator__WEBPACK_IMPORTED_MODULE_1__.ElementCreator(titleParameters);\n        this.viewElementCreator.addInnerElement(creatorTitle);\n        const buttonParameters = {\n            tag: 'button',\n            classNames: [\n                DEFAULT_ERROR_CLASS.BUTTON,\n                DEFAULT_ERROR_CLASS.BUTTON_NOT_FOUND,\n            ],\n            textContent: DEFAULT_BUTTON_TEXT,\n            callback: () => router.navigate(_router_pages__WEBPACK_IMPORTED_MODULE_2__.Pages.INDEX),\n        };\n        const creatorButton = new _until_element_creator__WEBPACK_IMPORTED_MODULE_1__.ElementCreator(buttonParameters);\n        this.viewElementCreator.addInnerElement(creatorButton);\n    }\n}\n\n\n//# sourceURL=webpack:///./src/app/view/main/not-found/not-found-view.ts?");

/***/ })

}]);
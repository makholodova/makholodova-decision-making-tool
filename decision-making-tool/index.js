/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app/app.ts":
/*!************************!*\
  !*** ./src/app/app.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var _view_header_header_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view/header/header-view */ \"./src/app/view/header/header-view.ts\");\n/* harmony import */ var _view_main_main_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view/main/main-view */ \"./src/app/view/main/main-view.ts\");\n/* harmony import */ var _router_pages__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./router/pages */ \"./src/app/router/pages.ts\");\n/* harmony import */ var _router_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./router/router */ \"./src/app/router/router.ts\");\n/* harmony import */ var _components_sound__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/sound */ \"./src/app/components/sound.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n\n\n\n\nclass App {\n    constructor() {\n        const routes = this.createRoutes();\n        this.router = new _router_router__WEBPACK_IMPORTED_MODULE_3__[\"default\"](routes);\n        this.sounds = new _components_sound__WEBPACK_IMPORTED_MODULE_4__.Sounds();\n        this.headerView = new _view_header_header_view__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n        this.main = new _view_main_main_view__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n        this.createView();\n    }\n    createView() {\n        document.body.append(this.headerView.getHtmlElement(), this.main.getHtmlElement());\n        //getOptionsData();\n    }\n    createRoutes() {\n        return [\n            {\n                path: ``,\n                callback: () => __awaiter(this, void 0, void 0, function* () {\n                    const { default: IndexView } = yield __webpack_require__.e(/*! import() */ \"src_app_view_main_index_index-view_ts\").then(__webpack_require__.bind(__webpack_require__, /*! ./view/main/index/index-view */ \"./src/app/view/main/index/index-view.ts\"));\n                    this.setContent(new IndexView(this.router, this.sounds));\n                }),\n            },\n            {\n                path: `${_router_pages__WEBPACK_IMPORTED_MODULE_2__.Pages.INDEX}`,\n                callback: () => __awaiter(this, void 0, void 0, function* () {\n                    const { default: IndexView } = yield __webpack_require__.e(/*! import() */ \"src_app_view_main_index_index-view_ts\").then(__webpack_require__.bind(__webpack_require__, /*! ./view/main/index/index-view */ \"./src/app/view/main/index/index-view.ts\"));\n                    this.setContent(new IndexView(this.router, this.sounds));\n                }),\n            },\n            {\n                path: `${_router_pages__WEBPACK_IMPORTED_MODULE_2__.Pages.DECISION_PICKER}`,\n                callback: () => __awaiter(this, void 0, void 0, function* () {\n                    const { default: DecisionPickerView } = yield __webpack_require__.e(/*! import() */ \"src_app_view_main_decision-picker_decision-picker-view_ts\").then(__webpack_require__.bind(__webpack_require__, /*! ./view/main/decision-picker/decision-picker-view */ \"./src/app/view/main/decision-picker/decision-picker-view.ts\"));\n                    this.setContent(new DecisionPickerView(this.router, this.sounds));\n                }),\n            },\n            {\n                path: `${_router_pages__WEBPACK_IMPORTED_MODULE_2__.Pages.NOT_FOUND}`,\n                callback: () => __awaiter(this, void 0, void 0, function* () {\n                    const { default: NotFoundView } = yield __webpack_require__.e(/*! import() */ \"src_app_view_main_not-found_not-found-view_ts\").then(__webpack_require__.bind(__webpack_require__, /*! ./view/main/not-found/not-found-view */ \"./src/app/view/main/not-found/not-found-view.ts\"));\n                    this.setContent(new NotFoundView(this.router));\n                }),\n            },\n        ];\n    }\n    setContent(view) {\n        this.main.setContent(view);\n    }\n}\n\n\n//# sourceURL=webpack:///./src/app/app.ts?");

/***/ }),

/***/ "./src/app/components/sound.ts":
/*!*************************************!*\
  !*** ./src/app/components/sound.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Sounds: () => (/* binding */ Sounds)\n/* harmony export */ });\nclass Sounds {\n    constructor() {\n        this.winSound = new Audio('./sounds/winSound.mp3');\n        const savedSoundState = localStorage.getItem('soundEnabled');\n        this.enabled = savedSoundState ? JSON.parse(savedSoundState) : false;\n    }\n    toggleAudio() {\n        this.enabled = !this.enabled;\n        localStorage.setItem('soundEnabled', JSON.stringify(this.enabled));\n        console.log(this.enabled);\n    }\n    playWinSound() {\n        if (this.enabled) {\n            this.winSound.play();\n        }\n    }\n}\n\n\n//# sourceURL=webpack:///./src/app/components/sound.ts?");

/***/ }),

/***/ "./src/app/router/handler/hash/hash-router-handler.ts":
/*!************************************************************!*\
  !*** ./src/app/router/handler/hash/hash-router-handler.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ HashRouterHandler)\n/* harmony export */ });\n/* harmony import */ var _history_router_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../history-router-handler */ \"./src/app/router/handler/history-router-handler.ts\");\n\nclass HashRouterHandler extends _history_router_handler__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor(callbackRouter) {\n        super(callbackRouter);\n        this.params = {\n            nameEvent: 'hashchange',\n            locationField: 'hash',\n        };\n        window.addEventListener(this.params.nameEvent, this.handler);\n    }\n    static setHistory(url) {\n        window.location.href = `${window.location.href.replace(/#(.*)$/, '')}#${url}`;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/app/router/handler/hash/hash-router-handler.ts?");

/***/ }),

/***/ "./src/app/router/handler/history-router-handler.ts":
/*!**********************************************************!*\
  !*** ./src/app/router/handler/history-router-handler.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ HistoryRouterHandler)\n/* harmony export */ });\nclass HistoryRouterHandler {\n    constructor(callback) {\n        this.params = {\n            nameEvent: 'popstate',\n            locationField: 'pathname',\n        };\n        this.callback = callback;\n        this.handler = this.navigate.bind(this);\n        window.addEventListener(this.params.nameEvent, this.handler);\n    }\n    static setHistory(url) {\n        window.history.pushState(null, '', `/${url}`);\n    }\n    navigate(url) {\n        if (typeof url === 'string') {\n            url = url.replace(/\\/$/, '');\n            HistoryRouterHandler.setHistory(url);\n        }\n        const urlString = globalThis.location.pathname.replace(/\\/$/, '').slice(1);\n        console.log('urlString', urlString);\n        const result = {\n            path: urlString,\n        };\n        this.callback(result);\n    }\n    disable() {\n        window.removeEventListener(this.params.nameEvent, this.handler);\n    }\n}\n\n\n//# sourceURL=webpack:///./src/app/router/handler/history-router-handler.ts?");

/***/ }),

/***/ "./src/app/router/pages.ts":
/*!*********************************!*\
  !*** ./src/app/router/pages.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Pages: () => (/* binding */ Pages)\n/* harmony export */ });\nconst Pages = {\n    INDEX: 'index',\n    DECISION_PICKER: 'decision-picker',\n    NOT_FOUND: 'not-found',\n};\n\n\n\n//# sourceURL=webpack:///./src/app/router/pages.ts?");

/***/ }),

/***/ "./src/app/router/router.ts":
/*!**********************************!*\
  !*** ./src/app/router/router.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Router)\n/* harmony export */ });\n/* harmony import */ var _handler_hash_hash_router_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./handler/hash/hash-router-handler */ \"./src/app/router/handler/hash/hash-router-handler.ts\");\n/* harmony import */ var _handler_history_router_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./handler/history-router-handler */ \"./src/app/router/handler/history-router-handler.ts\");\n/* harmony import */ var _pages__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages */ \"./src/app/router/pages.ts\");\n\n\n\nclass Router {\n    constructor(routes) {\n        this.routes = routes;\n        this.handler = new _handler_history_router_handler__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.urlChangedHandler.bind(this));\n        document.addEventListener('DOMContentLoaded', () => {\n            this.handler.navigate('');\n        });\n    }\n    setHashHandler() {\n        this.handler.disable();\n        this.handler = new _handler_hash_hash_router_handler__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.urlChangedHandler.bind(this));\n    }\n    navigate(url) {\n        this.handler.navigate(url);\n    }\n    urlChangedHandler(requestParameters) {\n        console.log('requestParameters', requestParameters);\n        const pathForFind = requestParameters.path.replace(/\\/$/, '');\n        console.log('pathForFind:', pathForFind);\n        const route = this.routes.find((item) => item.path === pathForFind);\n        if (!route) {\n            this.redirectToNotFoundPage();\n            return;\n        }\n        route.callback();\n    }\n    redirectToNotFoundPage() {\n        const notFoundPage = this.routes.find((item) => item.path === _pages__WEBPACK_IMPORTED_MODULE_2__.Pages.NOT_FOUND);\n        if (notFoundPage) {\n            this.navigate(notFoundPage.path);\n        }\n    }\n}\n\n\n//# sourceURL=webpack:///./src/app/router/router.ts?");

/***/ }),

/***/ "./src/app/until/element-creator.ts":
/*!******************************************!*\
  !*** ./src/app/until/element-creator.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ElementCreator: () => (/* binding */ ElementCreator)\n/* harmony export */ });\nconst DEFAULT_TEXT_CONTENT = '';\nconst DEFAULT_CSS_CLASSES = [];\nclass ElementCreator {\n    constructor(parameters) {\n        this.element = document.createElement(parameters.tag);\n        this.createElement(parameters);\n    }\n    getElement() {\n        return this.element;\n    }\n    addInnerElement(element) {\n        if (element instanceof ElementCreator) {\n            this.element.append(element.getElement());\n        }\n        else {\n            this.element.append(element);\n        }\n    }\n    removeElement() {\n        this.element.remove();\n    }\n    getContext() {\n        if (!(this.element instanceof HTMLCanvasElement)) {\n            throw new TypeError('Element is not a canvas.');\n        }\n        const context = this.element.getContext('2d');\n        if (!context) {\n            throw new Error('Failed to get 2D context from canvas.');\n        }\n        return context;\n    }\n    getCanvasElement() {\n        /*const convas= this.element;*/\n        if (!(this.element instanceof HTMLCanvasElement)) {\n            throw new TypeError('Element is not a canvas.');\n        }\n        // convas instanceof HTMLCanvasElement\n        return this.element;\n    }\n    createElement(parameters) {\n        this.setCssClasses(parameters.classNames);\n        this.setTextContent(parameters.textContent);\n        this.setCallback(parameters.callback);\n        this.setAttributes(parameters.attributes);\n    }\n    setTextContent(text = DEFAULT_TEXT_CONTENT) {\n        this.element.textContent = text;\n    }\n    setCallback(callback) {\n        if (this.element instanceof HTMLInputElement &&\n            typeof callback === 'function') {\n            this.element.addEventListener('input', (event) => {\n                callback(event);\n            });\n        }\n        if (typeof callback === 'function') {\n            this.element.addEventListener('click', (event) => {\n                callback(event);\n            });\n        }\n    }\n    setCssClasses(cssClasses = DEFAULT_CSS_CLASSES) {\n        this.element.classList.add(...cssClasses);\n    }\n    setAttributes(attributes) {\n        if (attributes) {\n            for (const [key, value] of Object.entries(attributes)) {\n                this.element.setAttribute(key, value);\n            }\n        }\n    }\n}\n\n\n//# sourceURL=webpack:///./src/app/until/element-creator.ts?");

/***/ }),

/***/ "./src/app/view/header/header-view.ts":
/*!********************************************!*\
  !*** ./src/app/view/header/header-view.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ HeaderView)\n/* harmony export */ });\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view */ \"./src/app/view/view.ts\");\n\nconst DEFAULT_HEADER_CLASS = {\n    HEADER: 'header',\n};\nconst DEFAULT_HEADER_TEXT = 'Decision Making Tool';\nconst defaultHeaderParameters = {\n    tag: 'header',\n    textContent: DEFAULT_HEADER_TEXT,\n    classNames: [DEFAULT_HEADER_CLASS.HEADER],\n};\nclass HeaderView extends _view__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor(parameters = defaultHeaderParameters) {\n        super(parameters);\n    }\n}\n\n\n//# sourceURL=webpack:///./src/app/view/header/header-view.ts?");

/***/ }),

/***/ "./src/app/view/main/main-view.ts":
/*!****************************************!*\
  !*** ./src/app/view/main/main-view.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MainView)\n/* harmony export */ });\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view */ \"./src/app/view/view.ts\");\n\nconst DEFAULT_HEADER_CLASS = {\n    MAIN: 'main',\n};\nconst defaultMainParameters = {\n    tag: 'main',\n    classNames: [DEFAULT_HEADER_CLASS.MAIN],\n};\nclass MainView extends _view__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor(parameters = defaultMainParameters) {\n        super(parameters);\n    }\n    setContent(content) {\n        const htmlElement = this.viewElementCreator.getElement();\n        while (htmlElement.firstElementChild) {\n            htmlElement.firstElementChild.remove();\n        }\n        this.viewElementCreator.addInnerElement(content.getHtmlElement());\n    }\n}\n\n\n//# sourceURL=webpack:///./src/app/view/main/main-view.ts?");

/***/ }),

/***/ "./src/app/view/view.ts":
/*!******************************!*\
  !*** ./src/app/view/view.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ View)\n/* harmony export */ });\n/* harmony import */ var _until_element_creator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../until/element-creator */ \"./src/app/until/element-creator.ts\");\n\nclass View {\n    constructor(parameters) {\n        this.viewElementCreator = this.createView(parameters);\n    }\n    getHtmlElement() {\n        return this.viewElementCreator.getElement();\n    }\n    createView(parameters) {\n        this.viewElementCreator = new _until_element_creator__WEBPACK_IMPORTED_MODULE_0__.ElementCreator(parameters);\n        return this.viewElementCreator;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/app/view/view.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ \"./src/style.scss\");\n/* harmony import */ var _app_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/app */ \"./src/app/app.ts\");\n\n\nnew _app_app__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack:///./src/style.scss?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".index.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		// data-webpack is not used as build has no uniqueName
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 		
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app/app.ts":
/*!************************!*\
  !*** ./src/app/app.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var _view_header_header_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view/header/header-view */ "./src/app/view/header/header-view.ts");
/* harmony import */ var _view_main_main_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view/main/main-view */ "./src/app/view/main/main-view.ts");
/* harmony import */ var _router_pages__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./router/pages */ "./src/app/router/pages.ts");
/* harmony import */ var _router_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./router/router */ "./src/app/router/router.ts");
/* harmony import */ var _components_sound__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/sound */ "./src/app/components/sound.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





class App {
    constructor() {
        const routes = this.createRoutes();
        this.router = new _router_router__WEBPACK_IMPORTED_MODULE_3__["default"](routes);
        this.sounds = new _components_sound__WEBPACK_IMPORTED_MODULE_4__.Sounds();
        this.headerView = new _view_header_header_view__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.main = new _view_main_main_view__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this.createView();
    }
    createView() {
        document.body.append(this.headerView.getHtmlElement(), this.main.getHtmlElement());
        //getOptionsData();
    }
    createRoutes() {
        return [
            {
                path: ``,
                callback: () => __awaiter(this, void 0, void 0, function* () {
                    const { default: IndexView } = yield __webpack_require__.e(/*! import() */ "src_app_view_main_index_index-view_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./view/main/index/index-view */ "./src/app/view/main/index/index-view.ts"));
                    this.setContent(new IndexView(this.router, this.sounds));
                }),
            },
            {
                path: `${_router_pages__WEBPACK_IMPORTED_MODULE_2__.Pages.INDEX}`,
                callback: () => __awaiter(this, void 0, void 0, function* () {
                    const { default: IndexView } = yield __webpack_require__.e(/*! import() */ "src_app_view_main_index_index-view_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./view/main/index/index-view */ "./src/app/view/main/index/index-view.ts"));
                    this.setContent(new IndexView(this.router, this.sounds));
                }),
            },
            {
                path: `${_router_pages__WEBPACK_IMPORTED_MODULE_2__.Pages.DECISION_PICKER}`,
                callback: () => __awaiter(this, void 0, void 0, function* () {
                    const { default: DecisionPickerView } = yield __webpack_require__.e(/*! import() */ "src_app_view_main_decision-picker_decision-picker-view_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./view/main/decision-picker/decision-picker-view */ "./src/app/view/main/decision-picker/decision-picker-view.ts"));
                    this.setContent(new DecisionPickerView(this.router, this.sounds));
                }),
            },
            {
                path: `${_router_pages__WEBPACK_IMPORTED_MODULE_2__.Pages.NOT_FOUND}`,
                callback: () => __awaiter(this, void 0, void 0, function* () {
                    const { default: NotFoundView } = yield __webpack_require__.e(/*! import() */ "src_app_view_main_not-found_not-found-view_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./view/main/not-found/not-found-view */ "./src/app/view/main/not-found/not-found-view.ts"));
                    this.setContent(new NotFoundView(this.router));
                }),
            },
        ];
    }
    setContent(view) {
        this.main.setContent(view);
    }
}


/***/ }),

/***/ "./src/app/components/sound.ts":
/*!*************************************!*\
  !*** ./src/app/components/sound.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Sounds: () => (/* binding */ Sounds)
/* harmony export */ });
class Sounds {
    constructor() {
        this.winSound = new Audio('./sounds/winSound.mp3');
        const savedSoundState = localStorage.getItem('soundEnabled');
        this.enabled = savedSoundState ? JSON.parse(savedSoundState) : false;
    }
    toggleAudio() {
        this.enabled = !this.enabled;
        localStorage.setItem('soundEnabled', JSON.stringify(this.enabled));
        console.log(this.enabled);
    }
    playWinSound() {
        if (this.enabled) {
            this.winSound.play();
        }
    }
}


/***/ }),

/***/ "./src/app/router/handler/hash/hash-router-handler.ts":
/*!************************************************************!*\
  !*** ./src/app/router/handler/hash/hash-router-handler.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HashRouterHandler)
/* harmony export */ });
/* harmony import */ var _history_router_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../history-router-handler */ "./src/app/router/handler/history-router-handler.ts");

class HashRouterHandler extends _history_router_handler__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(callbackRouter) {
        super(callbackRouter);
        this.params = {
            nameEvent: 'hashchange',
            locationField: 'hash',
        };
        globalThis.addEventListener(this.params.nameEvent, this.handler);
    }
    static setHistory(url) {
        const normalizedUrl = url.replace(/\/$/, '');
        globalThis.location.href = `${globalThis.location.href.replace(/#(.*)$/, '')}#${normalizedUrl}`;
    }
}


/***/ }),

/***/ "./src/app/router/handler/history-router-handler.ts":
/*!**********************************************************!*\
  !*** ./src/app/router/handler/history-router-handler.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HistoryRouterHandler)
/* harmony export */ });
class HistoryRouterHandler {
    constructor(callback) {
        this.params = {
            nameEvent: 'popstate',
            locationField: 'pathname',
        };
        this.callback = callback;
        this.handler = this.navigate.bind(this);
        globalThis.addEventListener(this.params.nameEvent, this.handler);
    }
    static setHistory(url) {
        globalThis.history.pushState(`undefined`, '', `/${url}`);
    }
    navigate(url) {
        if (typeof url === 'string') {
            url = url.replace(/\/$/, '');
            HistoryRouterHandler.setHistory(url);
        }
        const urlString = globalThis.location.pathname.replace(/\/$/, '').slice(1);
        console.log('urlString', urlString);
        const result = {
            path: urlString,
        };
        this.callback(result);
    }
    disable() {
        globalThis.removeEventListener(this.params.nameEvent, this.handler);
    }
}


/***/ }),

/***/ "./src/app/router/pages.ts":
/*!*********************************!*\
  !*** ./src/app/router/pages.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Pages: () => (/* binding */ Pages)
/* harmony export */ });
const Pages = {
    INDEX: 'index',
    DECISION_PICKER: 'decision-picker',
    NOT_FOUND: 'not-found',
};



/***/ }),

/***/ "./src/app/router/router.ts":
/*!**********************************!*\
  !*** ./src/app/router/router.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Router)
/* harmony export */ });
/* harmony import */ var _handler_hash_hash_router_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./handler/hash/hash-router-handler */ "./src/app/router/handler/hash/hash-router-handler.ts");
/* harmony import */ var _handler_history_router_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./handler/history-router-handler */ "./src/app/router/handler/history-router-handler.ts");
/* harmony import */ var _pages__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages */ "./src/app/router/pages.ts");



class Router {
    constructor(routes) {
        this.routes = routes;
        this.handler = new _handler_history_router_handler__WEBPACK_IMPORTED_MODULE_1__["default"](this.urlChangedHandler.bind(this));
        document.addEventListener('DOMContentLoaded', () => {
            this.handler.navigate();
        });
    }
    setHashHandler() {
        this.handler.disable();
        this.handler = new _handler_hash_hash_router_handler__WEBPACK_IMPORTED_MODULE_0__["default"](this.urlChangedHandler.bind(this));
    }
    navigate(url) {
        this.handler.navigate(url);
    }
    urlChangedHandler(requestParameters) {
        console.log('requestParameters', requestParameters);
        const pathForFind = requestParameters.path.replace(/\/$/, '');
        console.log('pathForFind:', pathForFind);
        const route = this.routes.find((item) => item.path === pathForFind);
        if (!route) {
            this.redirectToNotFoundPage();
            return;
        }
        route.callback();
    }
    redirectToNotFoundPage() {
        const notFoundPage = this.routes.find((item) => item.path === _pages__WEBPACK_IMPORTED_MODULE_2__.Pages.NOT_FOUND);
        if (notFoundPage) {
            this.navigate(notFoundPage.path);
        }
    }
}


/***/ }),

/***/ "./src/app/until/element-creator.ts":
/*!******************************************!*\
  !*** ./src/app/until/element-creator.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ElementCreator: () => (/* binding */ ElementCreator)
/* harmony export */ });
const DEFAULT_TEXT_CONTENT = '';
const DEFAULT_CSS_CLASSES = [];
class ElementCreator {
    constructor(parameters) {
        this.element = document.createElement(parameters.tag);
        this.createElement(parameters);
    }
    getElement() {
        return this.element;
    }
    addInnerElement(element) {
        if (element instanceof ElementCreator) {
            this.element.append(element.getElement());
        }
        else {
            this.element.append(element);
        }
    }
    removeElement() {
        this.element.remove();
    }
    getContext() {
        if (!(this.element instanceof HTMLCanvasElement)) {
            throw new TypeError('Element is not a canvas.');
        }
        const context = this.element.getContext('2d');
        if (!context) {
            throw new Error('Failed to get 2D context from canvas.');
        }
        return context;
    }
    getCanvasElement() {
        /*const convas= this.element;*/
        if (!(this.element instanceof HTMLCanvasElement)) {
            throw new TypeError('Element is not a canvas.');
        }
        // convas instanceof HTMLCanvasElement
        return this.element;
    }
    createElement(parameters) {
        this.setCssClasses(parameters.classNames);
        this.setTextContent(parameters.textContent);
        this.setCallback(parameters.callback);
        this.setAttributes(parameters.attributes);
    }
    setTextContent(text = DEFAULT_TEXT_CONTENT) {
        this.element.textContent = text;
    }
    setCallback(callback) {
        if (this.element instanceof HTMLInputElement &&
            typeof callback === 'function') {
            this.element.addEventListener('input', (event) => {
                callback(event);
            });
        }
        if (typeof callback === 'function') {
            this.element.addEventListener('click', (event) => {
                callback(event);
            });
        }
    }
    setCssClasses(cssClasses = DEFAULT_CSS_CLASSES) {
        this.element.classList.add(...cssClasses);
    }
    setAttributes(attributes) {
        if (attributes) {
            for (const [key, value] of Object.entries(attributes)) {
                this.element.setAttribute(key, value);
            }
        }
    }
}


/***/ }),

/***/ "./src/app/view/header/header-view.ts":
/*!********************************************!*\
  !*** ./src/app/view/header/header-view.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HeaderView)
/* harmony export */ });
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view */ "./src/app/view/view.ts");

const DEFAULT_HEADER_CLASS = {
    HEADER: 'header',
};
const DEFAULT_HEADER_TEXT = 'Decision Making Tool';
const defaultHeaderParameters = {
    tag: 'header',
    textContent: DEFAULT_HEADER_TEXT,
    classNames: [DEFAULT_HEADER_CLASS.HEADER],
};
class HeaderView extends _view__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(parameters = defaultHeaderParameters) {
        super(parameters);
    }
}


/***/ }),

/***/ "./src/app/view/main/main-view.ts":
/*!****************************************!*\
  !*** ./src/app/view/main/main-view.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MainView)
/* harmony export */ });
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view */ "./src/app/view/view.ts");

const DEFAULT_HEADER_CLASS = {
    MAIN: 'main',
};
const defaultMainParameters = {
    tag: 'main',
    classNames: [DEFAULT_HEADER_CLASS.MAIN],
};
class MainView extends _view__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(parameters = defaultMainParameters) {
        super(parameters);
    }
    setContent(content) {
        const htmlElement = this.viewElementCreator.getElement();
        while (htmlElement.firstElementChild) {
            htmlElement.firstElementChild.remove();
        }
        this.viewElementCreator.addInnerElement(content.getHtmlElement());
    }
}


/***/ }),

/***/ "./src/app/view/view.ts":
/*!******************************!*\
  !*** ./src/app/view/view.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ View)
/* harmony export */ });
/* harmony import */ var _until_element_creator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../until/element-creator */ "./src/app/until/element-creator.ts");

class View {
    constructor(parameters) {
        this.viewElementCreator = this.createView(parameters);
    }
    getHtmlElement() {
        return this.viewElementCreator.getElement();
    }
    createView(parameters) {
        this.viewElementCreator = new _until_element_creator__WEBPACK_IMPORTED_MODULE_0__.ElementCreator(parameters);
        return this.viewElementCreator;
    }
}


/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _app_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/app */ "./src/app/app.ts");


new _app_app__WEBPACK_IMPORTED_MODULE_1__["default"]();

})();

/******/ })()
;
//# sourceMappingURL=index.js.map
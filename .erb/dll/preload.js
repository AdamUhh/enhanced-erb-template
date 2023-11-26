(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main/bridges/ipc.ts":
/*!*********************************!*\
  !*** ./src/main/bridges/ipc.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ipcApi: () => (/* binding */ ipcApi)
/* harmony export */ });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var shared_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! shared/types */ "./src/shared/types/index.ts");
/* harmony import */ var _shared_utils_ipc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/utils/ipc */ "./src/shared/utils/ipc.ts");



const baseValidChannels = [
    shared_types__WEBPACK_IMPORTED_MODULE_1__.IpcChannels.clearStore,
    shared_types__WEBPACK_IMPORTED_MODULE_1__.IpcChannels.exportStoreData,
    shared_types__WEBPACK_IMPORTED_MODULE_1__.IpcChannels.importStoreData,
    shared_types__WEBPACK_IMPORTED_MODULE_1__.IpcChannels.loadStoreData,
    shared_types__WEBPACK_IMPORTED_MODULE_1__.IpcChannels.restartApp,
    shared_types__WEBPACK_IMPORTED_MODULE_1__.IpcChannels.setStoreValue,
    shared_types__WEBPACK_IMPORTED_MODULE_1__.IpcChannels.getStoreValue,
];
const failValidChannels = baseValidChannels.map(_shared_utils_ipc__WEBPACK_IMPORTED_MODULE_2__.getFailChannel);
const successValidChannels = baseValidChannels.map(_shared_utils_ipc__WEBPACK_IMPORTED_MODULE_2__.getSuccessChannel);
const validChannels = [
    ...baseValidChannels,
    ...failValidChannels,
    ...successValidChannels,
];
const on = (channel, func) => {
    if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.on(channel, (_, ...args) => func(...args));
    }
};
const removeListener = (channel, func) => {
    if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.removeListener(channel, (_, ...args) => func(...args));
    }
};
const send = (channel, payload) => {
    if (validChannels.includes(channel)) {
        electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.send(channel, payload);
    }
};
const ipcApi = {
    on,
    removeListener,
    send,
};


/***/ }),

/***/ "./src/shared/types/index.ts":
/*!***********************************!*\
  !*** ./src/shared/types/index.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IpcChannels: () => (/* reexport safe */ _ipc__WEBPACK_IMPORTED_MODULE_0__.IpcChannels)
/* harmony export */ });
/* harmony import */ var _ipc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ipc */ "./src/shared/types/ipc.ts");




/***/ }),

/***/ "./src/shared/types/ipc.ts":
/*!*********************************!*\
  !*** ./src/shared/types/ipc.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IpcChannels: () => (/* binding */ IpcChannels)
/* harmony export */ });
var IpcChannels;
(function (IpcChannels) {
    IpcChannels["clearStore"] = "clear-store";
    IpcChannels["exportStoreData"] = "export-store-data";
    IpcChannels["importStoreData"] = "import-store-data";
    IpcChannels["loadStoreData"] = "load-store-data";
    IpcChannels["restartApp"] = "restart-app";
    IpcChannels["setStoreValue"] = "set-store-value";
    IpcChannels["getStoreValue"] = "get-store-value";
})(IpcChannels || (IpcChannels = {}));



/***/ }),

/***/ "./src/shared/utils/ipc.ts":
/*!*********************************!*\
  !*** ./src/shared/utils/ipc.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getFailChannel: () => (/* binding */ getFailChannel),
/* harmony export */   getSuccessChannel: () => (/* binding */ getSuccessChannel)
/* harmony export */ });
const getFailChannel = (channel) => `${channel}-fail`;
const getSuccessChannel = (channel) => `${channel}-success`;


/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

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
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./src/main/preload.ts ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bridges_ipc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bridges/ipc */ "./src/main/bridges/ipc.ts");


const electronApi = {
    ipc: _bridges_ipc__WEBPACK_IMPORTED_MODULE_1__.ipcApi,
};
electron__WEBPACK_IMPORTED_MODULE_0__.contextBridge.exposeInMainWorld('electron', electronApi);

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOeUM7QUFHRjtBQUV2QyxNQUFNLFdBQVcsR0FBZ0I7SUFDL0IsR0FBRyxFQUFFLGdEQUFNO0NBQ1osQ0FBQztBQUVGLG1EQUFhLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi9icmlkZ2VzL2lwYy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL3R5cGVzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvdHlwZXMvaXBjLnRzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvdXRpbHMvaXBjLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiZWxlY3Ryb25cIiIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4vcHJlbG9hZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gZmFjdG9yeSgpO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkoZ2xvYmFsLCAoKSA9PiB7XG5yZXR1cm4gIiwiaW1wb3J0IHsgaXBjUmVuZGVyZXIgfSBmcm9tICdlbGVjdHJvbic7XG5cbmltcG9ydCB7IElwY0FwaSwgSXBjQ2hhbm5lbHMgfSBmcm9tICdzaGFyZWQvdHlwZXMnO1xuaW1wb3J0IHsgZ2V0RmFpbENoYW5uZWwsIGdldFN1Y2Nlc3NDaGFubmVsIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3V0aWxzL2lwYyc7XG5cbmNvbnN0IGJhc2VWYWxpZENoYW5uZWxzID0gW1xuICBJcGNDaGFubmVscy5jbGVhclN0b3JlLFxuICBJcGNDaGFubmVscy5leHBvcnRTdG9yZURhdGEsXG4gIElwY0NoYW5uZWxzLmltcG9ydFN0b3JlRGF0YSxcbiAgSXBjQ2hhbm5lbHMubG9hZFN0b3JlRGF0YSxcbiAgSXBjQ2hhbm5lbHMucmVzdGFydEFwcCxcbiAgSXBjQ2hhbm5lbHMuc2V0U3RvcmVWYWx1ZSxcbiAgSXBjQ2hhbm5lbHMuZ2V0U3RvcmVWYWx1ZSxcbl07XG5jb25zdCBmYWlsVmFsaWRDaGFubmVscyA9IGJhc2VWYWxpZENoYW5uZWxzLm1hcChnZXRGYWlsQ2hhbm5lbCk7XG5jb25zdCBzdWNjZXNzVmFsaWRDaGFubmVscyA9IGJhc2VWYWxpZENoYW5uZWxzLm1hcChnZXRTdWNjZXNzQ2hhbm5lbCk7XG5jb25zdCB2YWxpZENoYW5uZWxzID0gW1xuICAuLi5iYXNlVmFsaWRDaGFubmVscyxcbiAgLi4uZmFpbFZhbGlkQ2hhbm5lbHMsXG4gIC4uLnN1Y2Nlc3NWYWxpZENoYW5uZWxzLFxuXTtcblxuY29uc3Qgb24gPSAoY2hhbm5lbDogc3RyaW5nLCBmdW5jOiBhbnkpID0+IHtcbiAgaWYgKHZhbGlkQ2hhbm5lbHMuaW5jbHVkZXMoY2hhbm5lbCkpIHtcbiAgICAvLyBEZWxpYmVyYXRlbHkgc3RyaXAgZXZlbnQgYXMgaXQgaW5jbHVkZXMgYHNlbmRlcmBcbiAgICBpcGNSZW5kZXJlci5vbihjaGFubmVsLCAoXywgLi4uYXJncykgPT4gZnVuYyguLi5hcmdzKSk7XG4gIH1cbn07XG5cbmNvbnN0IHJlbW92ZUxpc3RlbmVyID0gKGNoYW5uZWw6IHN0cmluZywgZnVuYzogYW55KSA9PiB7XG4gIGlmICh2YWxpZENoYW5uZWxzLmluY2x1ZGVzKGNoYW5uZWwpKSB7XG4gICAgLy8gRGVsaWJlcmF0ZWx5IHN0cmlwIGV2ZW50IGFzIGl0IGluY2x1ZGVzIGBzZW5kZXJgXG4gICAgaXBjUmVuZGVyZXIucmVtb3ZlTGlzdGVuZXIoY2hhbm5lbCwgKF8sIC4uLmFyZ3MpID0+IGZ1bmMoLi4uYXJncykpO1xuICB9XG59O1xuXG5jb25zdCBzZW5kID0gKGNoYW5uZWw6IHN0cmluZywgcGF5bG9hZDogYW55KSA9PiB7XG4gIGlmICh2YWxpZENoYW5uZWxzLmluY2x1ZGVzKGNoYW5uZWwpKSB7XG4gICAgaXBjUmVuZGVyZXIuc2VuZChjaGFubmVsLCBwYXlsb2FkKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGlwY0FwaTogSXBjQXBpID0ge1xuICBvbixcbiAgcmVtb3ZlTGlzdGVuZXIsXG4gIHNlbmQsXG59O1xuIiwiaW1wb3J0IHsgQm91bmRzIH0gZnJvbSAnLi9ib3VuZHMnO1xuaW1wb3J0IHsgR2VuZXJpY0Z1bmN0aW9uLCBHZW5lcmljVm9pZEZ1bmN0aW9uIH0gZnJvbSAnLi9nZW5lcmljJztcbmltcG9ydCB7IElwY0FwaSwgSXBjQ2hhbm5lbHMsIFNldFN0b3JlVmFsdWVQYXlsb2FkIH0gZnJvbSAnLi9pcGMnO1xuaW1wb3J0IHsgTG9jYWxFbGVjdHJvblN0b3JlIH0gZnJvbSAnLi9sb2NhbEVsZWN0cm9uU3RvcmUnO1xuaW1wb3J0IHsgRWxlY3Ryb25BcGkgfSBmcm9tICcuL3dpbmRvdyc7XG5cbmV4cG9ydCB0eXBlIHtcbiAgQm91bmRzLFxuICBFbGVjdHJvbkFwaSxcbiAgR2VuZXJpY0Z1bmN0aW9uLFxuICBHZW5lcmljVm9pZEZ1bmN0aW9uLFxuICBJcGNBcGksXG4gIExvY2FsRWxlY3Ryb25TdG9yZSxcbiAgU2V0U3RvcmVWYWx1ZVBheWxvYWQsXG59O1xuXG5leHBvcnQgeyBJcGNDaGFubmVscyB9O1xuIiwiaW1wb3J0IHsgR2VuZXJpY0Z1bmN0aW9uIH0gZnJvbSAnLi9nZW5lcmljJztcbmltcG9ydCB7IExvY2FsRWxlY3Ryb25TdG9yZSB9IGZyb20gJy4vbG9jYWxFbGVjdHJvblN0b3JlJztcblxudHlwZSBTZXRTdG9yZVZhbHVlUGF5bG9hZCA9IHtcbiAga2V5OiBrZXlvZiBMb2NhbEVsZWN0cm9uU3RvcmU7XG4gIHN0YXRlOiBMb2NhbEVsZWN0cm9uU3RvcmVba2V5b2YgTG9jYWxFbGVjdHJvblN0b3JlXTtcbn07XG5cbnR5cGUgSXBjUGF5bG9hZCA9IHtcbiAgJ2NsZWFyLXN0b3JlJzogYW55O1xuICAnZXhwb3J0LXN0b3JlLWRhdGEnOiBhbnk7XG4gICdpbXBvcnQtc3RvcmUtZGF0YSc6IGFueTtcbiAgJ2xvYWQtc3RvcmUtZGF0YSc6IGFueTtcbiAgJ3Jlc3RhcnQtYXBwJzogYW55O1xuICAnc2V0LXN0b3JlLXZhbHVlJzogU2V0U3RvcmVWYWx1ZVBheWxvYWQ7XG4gICdnZXQtc3RvcmUtdmFsdWUnOiBhbnk7XG59O1xuXG5pbnRlcmZhY2UgSXBjQXBpIHtcbiAgb24oY2hhbm5lbDogc3RyaW5nLCBjYWxsYmFjazogR2VuZXJpY0Z1bmN0aW9uKTogdm9pZDtcbiAgcmVtb3ZlTGlzdGVuZXIoY2hhbm5lbDogc3RyaW5nLCBjYWxsYmFjazogR2VuZXJpY0Z1bmN0aW9uKTogdm9pZDtcbiAgc2VuZDxUIGV4dGVuZHMga2V5b2YgSXBjUGF5bG9hZD4oXG4gICAgY2hhbm5lbDogVCxcbiAgICBwYXlsb2FkPzogVCBleHRlbmRzICdzZXQtc3RvcmUtdmFsdWUnID8gU2V0U3RvcmVWYWx1ZVBheWxvYWQgOiBhbnksXG4gICk6IHZvaWQ7XG59XG5cbmVudW0gSXBjQ2hhbm5lbHMge1xuICBjbGVhclN0b3JlID0gJ2NsZWFyLXN0b3JlJyxcbiAgZXhwb3J0U3RvcmVEYXRhID0gJ2V4cG9ydC1zdG9yZS1kYXRhJyxcbiAgaW1wb3J0U3RvcmVEYXRhID0gJ2ltcG9ydC1zdG9yZS1kYXRhJyxcbiAgbG9hZFN0b3JlRGF0YSA9ICdsb2FkLXN0b3JlLWRhdGEnLFxuICByZXN0YXJ0QXBwID0gJ3Jlc3RhcnQtYXBwJyxcbiAgc2V0U3RvcmVWYWx1ZSA9ICdzZXQtc3RvcmUtdmFsdWUnLFxuICBnZXRTdG9yZVZhbHVlID0gJ2dldC1zdG9yZS12YWx1ZScsXG59XG5cbmV4cG9ydCB7IElwY0NoYW5uZWxzIH07XG5cbmV4cG9ydCB0eXBlIHsgSXBjQXBpLCBJcGNQYXlsb2FkLCBTZXRTdG9yZVZhbHVlUGF5bG9hZCB9O1xuIiwiaW1wb3J0IHsgSXBjQ2hhbm5lbHMgfSBmcm9tICdzaGFyZWQvdHlwZXMnO1xuXG5leHBvcnQgY29uc3QgZ2V0RmFpbENoYW5uZWwgPSAoY2hhbm5lbDogSXBjQ2hhbm5lbHMpID0+IGAke2NoYW5uZWx9LWZhaWxgO1xuXG5leHBvcnQgY29uc3QgZ2V0U3VjY2Vzc0NoYW5uZWwgPSAoY2hhbm5lbDogSXBjQ2hhbm5lbHMpID0+IGAke2NoYW5uZWx9LXN1Y2Nlc3NgO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZWxlY3Ryb25cIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGNvbnRleHRCcmlkZ2UgfSBmcm9tICdlbGVjdHJvbic7XG5cbmltcG9ydCB7IEVsZWN0cm9uQXBpIH0gZnJvbSAnLi4vc2hhcmVkL3R5cGVzJztcbmltcG9ydCB7IGlwY0FwaSB9IGZyb20gJy4vYnJpZGdlcy9pcGMnO1xuXG5jb25zdCBlbGVjdHJvbkFwaTogRWxlY3Ryb25BcGkgPSB7XG4gIGlwYzogaXBjQXBpLFxufTtcblxuY29udGV4dEJyaWRnZS5leHBvc2VJbk1haW5Xb3JsZCgnZWxlY3Ryb24nLCBlbGVjdHJvbkFwaSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
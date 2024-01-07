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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlbG9hZC5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVnVDO0FBRVk7QUFDd0I7QUFFM0UsTUFBTSxpQkFBaUIsR0FBRztJQUN4QixxREFBVyxDQUFDLFVBQVU7SUFDdEIscURBQVcsQ0FBQyxlQUFlO0lBQzNCLHFEQUFXLENBQUMsZUFBZTtJQUMzQixxREFBVyxDQUFDLGFBQWE7SUFDekIscURBQVcsQ0FBQyxVQUFVO0lBQ3RCLHFEQUFXLENBQUMsYUFBYTtJQUN6QixxREFBVyxDQUFDLGFBQWE7Q0FDMUIsQ0FBQztBQUNGLE1BQU0saUJBQWlCLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDLDZEQUFjLENBQUMsQ0FBQztBQUNoRSxNQUFNLG9CQUFvQixHQUFHLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxnRUFBaUIsQ0FBQyxDQUFDO0FBQ3RFLE1BQU0sYUFBYSxHQUFHO0lBQ3BCLEdBQUcsaUJBQWlCO0lBQ3BCLEdBQUcsaUJBQWlCO0lBQ3BCLEdBQUcsb0JBQW9CO0NBQ3hCLENBQUM7QUFFRixNQUFNLEVBQUUsR0FBRyxDQUFDLE9BQWUsRUFBRSxJQUFTLEVBQUUsRUFBRTtJQUN4QyxJQUFJLGFBQWEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUNwQyxtREFBbUQ7UUFDbkQsaURBQVcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7QUFDSCxDQUFDLENBQUM7QUFFRixNQUFNLGNBQWMsR0FBRyxDQUFDLE9BQWUsRUFBRSxJQUFTLEVBQUUsRUFBRTtJQUNwRCxJQUFJLGFBQWEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUNwQyxtREFBbUQ7UUFDbkQsaURBQVcsQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7QUFDSCxDQUFDLENBQUM7QUFFRixNQUFNLElBQUksR0FBRyxDQUFDLE9BQWUsRUFBRSxPQUFZLEVBQUUsRUFBRTtJQUM3QyxJQUFJLGFBQWEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUNwQyxpREFBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDckMsQ0FBQztBQUNILENBQUMsQ0FBQztBQUVLLE1BQU0sTUFBTSxHQUFXO0lBQzVCLEVBQUU7SUFDRixjQUFjO0lBQ2QsSUFBSTtDQUNMLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1Q2dFO0FBYzNDOzs7Ozs7Ozs7Ozs7Ozs7QUNXdkIsSUFBSyxXQVFKO0FBUkQsV0FBSyxXQUFXO0lBQ2QseUNBQTBCO0lBQzFCLG9EQUFxQztJQUNyQyxvREFBcUM7SUFDckMsZ0RBQWlDO0lBQ2pDLHlDQUEwQjtJQUMxQixnREFBaUM7SUFDakMsZ0RBQWlDO0FBQ25DLENBQUMsRUFSSSxXQUFXLEtBQVgsV0FBVyxRQVFmO0FBRXNCOzs7Ozs7Ozs7Ozs7Ozs7O0FDbkNoQixNQUFNLGNBQWMsR0FBRyxDQUFDLE9BQW9CLEVBQUUsRUFBRSxDQUFDLEdBQUcsT0FBTyxPQUFPLENBQUM7QUFFbkUsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLE9BQW9CLEVBQUUsRUFBRSxDQUFDLEdBQUcsT0FBTyxVQUFVLENBQUM7Ozs7Ozs7Ozs7O0FDSmhGOzs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOeUM7QUFHRjtBQUV2QyxNQUFNLFdBQVcsR0FBZ0I7SUFDL0IsR0FBRyxFQUFFLGdEQUFNO0NBQ1osQ0FBQztBQUVGLG1EQUFhLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi9icmlkZ2VzL2lwYy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL3R5cGVzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvdHlwZXMvaXBjLnRzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvdXRpbHMvaXBjLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiZWxlY3Ryb25cIiIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4vcHJlbG9hZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gZmFjdG9yeSgpO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkoZ2xvYmFsLCAoKSA9PiB7XG5yZXR1cm4gIiwiaW1wb3J0IHsgaXBjUmVuZGVyZXIgfSBmcm9tICdlbGVjdHJvbic7XHJcblxyXG5pbXBvcnQgeyBJcGNBcGksIElwY0NoYW5uZWxzIH0gZnJvbSAnc2hhcmVkL3R5cGVzJztcclxuaW1wb3J0IHsgZ2V0RmFpbENoYW5uZWwsIGdldFN1Y2Nlc3NDaGFubmVsIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3V0aWxzL2lwYyc7XHJcblxyXG5jb25zdCBiYXNlVmFsaWRDaGFubmVscyA9IFtcclxuICBJcGNDaGFubmVscy5jbGVhclN0b3JlLFxyXG4gIElwY0NoYW5uZWxzLmV4cG9ydFN0b3JlRGF0YSxcclxuICBJcGNDaGFubmVscy5pbXBvcnRTdG9yZURhdGEsXHJcbiAgSXBjQ2hhbm5lbHMubG9hZFN0b3JlRGF0YSxcclxuICBJcGNDaGFubmVscy5yZXN0YXJ0QXBwLFxyXG4gIElwY0NoYW5uZWxzLnNldFN0b3JlVmFsdWUsXHJcbiAgSXBjQ2hhbm5lbHMuZ2V0U3RvcmVWYWx1ZSxcclxuXTtcclxuY29uc3QgZmFpbFZhbGlkQ2hhbm5lbHMgPSBiYXNlVmFsaWRDaGFubmVscy5tYXAoZ2V0RmFpbENoYW5uZWwpO1xyXG5jb25zdCBzdWNjZXNzVmFsaWRDaGFubmVscyA9IGJhc2VWYWxpZENoYW5uZWxzLm1hcChnZXRTdWNjZXNzQ2hhbm5lbCk7XHJcbmNvbnN0IHZhbGlkQ2hhbm5lbHMgPSBbXHJcbiAgLi4uYmFzZVZhbGlkQ2hhbm5lbHMsXHJcbiAgLi4uZmFpbFZhbGlkQ2hhbm5lbHMsXHJcbiAgLi4uc3VjY2Vzc1ZhbGlkQ2hhbm5lbHMsXHJcbl07XHJcblxyXG5jb25zdCBvbiA9IChjaGFubmVsOiBzdHJpbmcsIGZ1bmM6IGFueSkgPT4ge1xyXG4gIGlmICh2YWxpZENoYW5uZWxzLmluY2x1ZGVzKGNoYW5uZWwpKSB7XHJcbiAgICAvLyBEZWxpYmVyYXRlbHkgc3RyaXAgZXZlbnQgYXMgaXQgaW5jbHVkZXMgYHNlbmRlcmBcclxuICAgIGlwY1JlbmRlcmVyLm9uKGNoYW5uZWwsIChfLCAuLi5hcmdzKSA9PiBmdW5jKC4uLmFyZ3MpKTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCByZW1vdmVMaXN0ZW5lciA9IChjaGFubmVsOiBzdHJpbmcsIGZ1bmM6IGFueSkgPT4ge1xyXG4gIGlmICh2YWxpZENoYW5uZWxzLmluY2x1ZGVzKGNoYW5uZWwpKSB7XHJcbiAgICAvLyBEZWxpYmVyYXRlbHkgc3RyaXAgZXZlbnQgYXMgaXQgaW5jbHVkZXMgYHNlbmRlcmBcclxuICAgIGlwY1JlbmRlcmVyLnJlbW92ZUxpc3RlbmVyKGNoYW5uZWwsIChfLCAuLi5hcmdzKSA9PiBmdW5jKC4uLmFyZ3MpKTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBzZW5kID0gKGNoYW5uZWw6IHN0cmluZywgcGF5bG9hZDogYW55KSA9PiB7XHJcbiAgaWYgKHZhbGlkQ2hhbm5lbHMuaW5jbHVkZXMoY2hhbm5lbCkpIHtcclxuICAgIGlwY1JlbmRlcmVyLnNlbmQoY2hhbm5lbCwgcGF5bG9hZCk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGlwY0FwaTogSXBjQXBpID0ge1xyXG4gIG9uLFxyXG4gIHJlbW92ZUxpc3RlbmVyLFxyXG4gIHNlbmQsXHJcbn07XHJcbiIsImltcG9ydCB7IEJvdW5kcyB9IGZyb20gJy4vYm91bmRzJztcclxuaW1wb3J0IHsgR2VuZXJpY0Z1bmN0aW9uLCBHZW5lcmljVm9pZEZ1bmN0aW9uIH0gZnJvbSAnLi9nZW5lcmljJztcclxuaW1wb3J0IHsgSXBjQXBpLCBJcGNDaGFubmVscywgU2V0U3RvcmVWYWx1ZVBheWxvYWQgfSBmcm9tICcuL2lwYyc7XHJcbmltcG9ydCB7IExvY2FsRWxlY3Ryb25TdG9yZSB9IGZyb20gJy4vbG9jYWxFbGVjdHJvblN0b3JlJztcclxuaW1wb3J0IHsgRWxlY3Ryb25BcGkgfSBmcm9tICcuL3dpbmRvdyc7XHJcblxyXG5leHBvcnQgdHlwZSB7XHJcbiAgQm91bmRzLFxyXG4gIEVsZWN0cm9uQXBpLFxyXG4gIEdlbmVyaWNGdW5jdGlvbixcclxuICBHZW5lcmljVm9pZEZ1bmN0aW9uLFxyXG4gIElwY0FwaSxcclxuICBMb2NhbEVsZWN0cm9uU3RvcmUsXHJcbiAgU2V0U3RvcmVWYWx1ZVBheWxvYWQsXHJcbn07XHJcblxyXG5leHBvcnQgeyBJcGNDaGFubmVscyB9O1xyXG4iLCJpbXBvcnQgeyBHZW5lcmljRnVuY3Rpb24gfSBmcm9tICcuL2dlbmVyaWMnO1xyXG5pbXBvcnQgeyBMb2NhbEVsZWN0cm9uU3RvcmUgfSBmcm9tICcuL2xvY2FsRWxlY3Ryb25TdG9yZSc7XHJcblxyXG50eXBlIFNldFN0b3JlVmFsdWVQYXlsb2FkID0ge1xyXG4gIGtleToga2V5b2YgTG9jYWxFbGVjdHJvblN0b3JlO1xyXG4gIHN0YXRlOiBMb2NhbEVsZWN0cm9uU3RvcmVba2V5b2YgTG9jYWxFbGVjdHJvblN0b3JlXTtcclxufTtcclxuXHJcbnR5cGUgSXBjUGF5bG9hZCA9IHtcclxuICAnY2xlYXItc3RvcmUnOiBhbnk7XHJcbiAgJ2V4cG9ydC1zdG9yZS1kYXRhJzogYW55O1xyXG4gICdpbXBvcnQtc3RvcmUtZGF0YSc6IGFueTtcclxuICAnbG9hZC1zdG9yZS1kYXRhJzogYW55O1xyXG4gICdyZXN0YXJ0LWFwcCc6IGFueTtcclxuICAnc2V0LXN0b3JlLXZhbHVlJzogU2V0U3RvcmVWYWx1ZVBheWxvYWQ7XHJcbiAgJ2dldC1zdG9yZS12YWx1ZSc6IGFueTtcclxufTtcclxuXHJcbmludGVyZmFjZSBJcGNBcGkge1xyXG4gIG9uKGNoYW5uZWw6IHN0cmluZywgY2FsbGJhY2s6IEdlbmVyaWNGdW5jdGlvbik6IHZvaWQ7XHJcbiAgcmVtb3ZlTGlzdGVuZXIoY2hhbm5lbDogc3RyaW5nLCBjYWxsYmFjazogR2VuZXJpY0Z1bmN0aW9uKTogdm9pZDtcclxuICBzZW5kPFQgZXh0ZW5kcyBrZXlvZiBJcGNQYXlsb2FkPihcclxuICAgIGNoYW5uZWw6IFQsXHJcbiAgICBwYXlsb2FkPzogVCBleHRlbmRzICdzZXQtc3RvcmUtdmFsdWUnID8gU2V0U3RvcmVWYWx1ZVBheWxvYWQgOiBhbnksXHJcbiAgKTogdm9pZDtcclxufVxyXG5cclxuZW51bSBJcGNDaGFubmVscyB7XHJcbiAgY2xlYXJTdG9yZSA9ICdjbGVhci1zdG9yZScsXHJcbiAgZXhwb3J0U3RvcmVEYXRhID0gJ2V4cG9ydC1zdG9yZS1kYXRhJyxcclxuICBpbXBvcnRTdG9yZURhdGEgPSAnaW1wb3J0LXN0b3JlLWRhdGEnLFxyXG4gIGxvYWRTdG9yZURhdGEgPSAnbG9hZC1zdG9yZS1kYXRhJyxcclxuICByZXN0YXJ0QXBwID0gJ3Jlc3RhcnQtYXBwJyxcclxuICBzZXRTdG9yZVZhbHVlID0gJ3NldC1zdG9yZS12YWx1ZScsXHJcbiAgZ2V0U3RvcmVWYWx1ZSA9ICdnZXQtc3RvcmUtdmFsdWUnLFxyXG59XHJcblxyXG5leHBvcnQgeyBJcGNDaGFubmVscyB9O1xyXG5cclxuZXhwb3J0IHR5cGUgeyBJcGNBcGksIElwY1BheWxvYWQsIFNldFN0b3JlVmFsdWVQYXlsb2FkIH07XHJcbiIsImltcG9ydCB7IElwY0NoYW5uZWxzIH0gZnJvbSAnc2hhcmVkL3R5cGVzJztcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRGYWlsQ2hhbm5lbCA9IChjaGFubmVsOiBJcGNDaGFubmVscykgPT4gYCR7Y2hhbm5lbH0tZmFpbGA7XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0U3VjY2Vzc0NoYW5uZWwgPSAoY2hhbm5lbDogSXBjQ2hhbm5lbHMpID0+IGAke2NoYW5uZWx9LXN1Y2Nlc3NgO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJlbGVjdHJvblwiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgY29udGV4dEJyaWRnZSB9IGZyb20gJ2VsZWN0cm9uJztcclxuXHJcbmltcG9ydCB7IEVsZWN0cm9uQXBpIH0gZnJvbSAnLi4vc2hhcmVkL3R5cGVzJztcclxuaW1wb3J0IHsgaXBjQXBpIH0gZnJvbSAnLi9icmlkZ2VzL2lwYyc7XHJcblxyXG5jb25zdCBlbGVjdHJvbkFwaTogRWxlY3Ryb25BcGkgPSB7XHJcbiAgaXBjOiBpcGNBcGksXHJcbn07XHJcblxyXG5jb250ZXh0QnJpZGdlLmV4cG9zZUluTWFpbldvcmxkKCdlbGVjdHJvbicsIGVsZWN0cm9uQXBpKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
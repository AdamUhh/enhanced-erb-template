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



const baseValidChannels = Object.values(shared_types__WEBPACK_IMPORTED_MODULE_1__.IpcChannels);
// [
// IpcChannels.closeApp,
// IpcChannels.restartApp,
// IpcChannels.clearStore,
// IpcChannels.exportStoreData,
// IpcChannels.importStoreData,
// IpcChannels.loadStoreData,
// IpcChannels.setStoreValue,
// IpcChannels.getStoreValue,
// ];
// const failValidChannels = baseValidChannels.map(getFailChannel);
// const successValidChannels = baseValidChannels.map(getSuccessChannel);
// const validChannels = [
//   ...baseValidChannels,
//   ...failValidChannels,
//   ...successValidChannels,
// ];
const replyValidChannels = baseValidChannels.map(_shared_utils_ipc__WEBPACK_IMPORTED_MODULE_2__.getReplyChannel);
const validChannels = [...baseValidChannels, ...replyValidChannels];
/**
 * Attaches an event listener to the specified IPC channel.
 * @param {string} channel - The IPC channel to listen on.
 * @param {function} func - The function to be executed when the event occurs.
 */
const on = (channel, func) => {
    if (validChannels.includes(channel)) {
        electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.on(channel, (_, ...args) => func(_, ...args));
    }
};
/**
 * Removes an event listener from the specified IPC channel.
 * @param {string} channel - The IPC channel to remove the listener from.
 * @param {function} func - The function to be removed from the listeners.
 */
const removeListener = (channel, func) => {
    if (validChannels.includes(channel)) {
        electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.removeListener(channel, (_, ...args) => func(_, ...args));
    }
};
/**
 * Removes all event listeners from the specified IPC channel.
 * @param {string} channel - The IPC channel to remove the listener from.
 */
const removeAllListeners = (channel) => {
    if (validChannels.includes(channel)) {
        electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.removeAllListeners(channel);
    }
};
/**
 * Sends a message to the specified IPC channel.
 * @param {string} channel - The IPC channel to send the message to.
 * @param {any} payload - The data to be sent with the message.
 */
const send = (channel, ...payload) => {
    if (validChannels.includes(channel)) {
        electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.send(channel, ...payload);
    }
};
/**
 * Sends a message to the specified IPC channel and back to renderer
 * @param {string} channel - The IPC channel to send the message to.
 * @param {any} payload - The data to be sent with the message.
 */
const invoke = (channel, payload) => new Promise((resolve, reject) => {
    if (validChannels.includes(channel)) {
        electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer
            .invoke(channel, payload)
            .then((result) => resolve(result))
            .catch((error) => 
        // ? This will basically never get called due to how the system works
        // ? But ill keep it just in case :P
        reject({ success: false, errorMsg: 'Error', payload: error }));
    }
    else {
        // Handle the case when the channel is not valid, e.g., throw an error
        reject({
            success: false,
            msg: 'Invalid Channel',
            payload: channel,
        });
    }
});
const ipcApi = {
    on,
    removeListener,
    removeAllListeners,
    send,
    invoke,
};


/***/ }),

/***/ "./src/shared/types/index.ts":
/*!***********************************!*\
  !*** ./src/shared/types/index.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IpcChannels: () => (/* reexport safe */ _ipc__WEBPACK_IMPORTED_MODULE_0__.IpcChannels),
/* harmony export */   ShortcutKeybindings: () => (/* reexport safe */ _keybindings__WEBPACK_IMPORTED_MODULE_1__.ShortcutKeybindings),
/* harmony export */   ShortcutKeybindingsAliases: () => (/* reexport safe */ _keybindings__WEBPACK_IMPORTED_MODULE_1__.ShortcutKeybindingsAliases)
/* harmony export */ });
/* harmony import */ var _ipc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ipc */ "./src/shared/types/ipc.ts");
/* harmony import */ var _keybindings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./keybindings */ "./src/shared/types/keybindings.ts");





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
    IpcChannels["closeApp"] = "close-app";
    IpcChannels["minimizeApp"] = "minimize-app";
    IpcChannels["maximizeApp"] = "maximize-app";
    IpcChannels["restartApp"] = "restart-app";
    IpcChannels["clearStore"] = "clear-store";
    IpcChannels["toggleDevTools"] = "toggle-dev-tools";
    IpcChannels["exportStoreData"] = "export-store-data";
    IpcChannels["importStoreData"] = "import-store-data";
    IpcChannels["loadStoreData"] = "load-store-data";
    IpcChannels["setStoreValue"] = "set-store-value";
    IpcChannels["getStoreValue"] = "get-store-value";
})(IpcChannels || (IpcChannels = {}));



/***/ }),

/***/ "./src/shared/types/keybindings.ts":
/*!*****************************************!*\
  !*** ./src/shared/types/keybindings.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShortcutKeybindings: () => (/* binding */ ShortcutKeybindings),
/* harmony export */   ShortcutKeybindingsAliases: () => (/* binding */ ShortcutKeybindingsAliases)
/* harmony export */ });
// ? TODO: add title, description, order, groupby?, to shortcuts
// ? TODO: save shortcuts (to system). either use Store, or edit a JSON
var ShortcutKeybindingsAliases;
(function (ShortcutKeybindingsAliases) {
    ShortcutKeybindingsAliases["toggleExample"] = "toggleExample";
    ShortcutKeybindingsAliases["toggleWithNotification"] = "toggleWithNotification";
    ShortcutKeybindingsAliases["toggleWithByeNotification"] = "toggleWithByeNotification";
})(ShortcutKeybindingsAliases || (ShortcutKeybindingsAliases = {}));
const ShortcutKeybindings = {
    [ShortcutKeybindingsAliases.toggleExample]: 'Ctrl+Shift+A',
    [ShortcutKeybindingsAliases.toggleWithNotification]: 'Ctrl+Shift+S',
    [ShortcutKeybindingsAliases.toggleWithByeNotification]: 'Ctrl+Shift+D',
};



/***/ }),

/***/ "./src/shared/utils/ipc.ts":
/*!*********************************!*\
  !*** ./src/shared/utils/ipc.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getFailChannel: () => (/* binding */ getFailChannel),
/* harmony export */   getReplyChannel: () => (/* binding */ getReplyChannel),
/* harmony export */   getSuccessChannel: () => (/* binding */ getSuccessChannel),
/* harmony export */   replyFailure: () => (/* binding */ replyFailure),
/* harmony export */   replyInvokeFailure: () => (/* binding */ replyInvokeFailure),
/* harmony export */   replyInvokeSuccess: () => (/* binding */ replyInvokeSuccess),
/* harmony export */   replySuccess: () => (/* binding */ replySuccess),
/* harmony export */   returnIpcInvokeError: () => (/* binding */ returnIpcInvokeError)
/* harmony export */ });
const getFailChannel = (channel) => `${channel}-fail`;
const getSuccessChannel = (channel) => `${channel}-success`;
const getReplyChannel = (channel) => `${channel}-reply`;
const replySuccess = (event, channel, payload) => {
    event.reply(getReplyChannel(channel), {
        success: true,
        ...(payload && { payload }),
    });
};
const replyFailure = (event, channel, payload) => {
    event.reply(getReplyChannel(channel), {
        success: false,
        ...(payload && { payload }),
    });
};
const replyInvokeSuccess = (event, channel, payload) => {
    event.sender.send(getReplyChannel(channel), {
        success: true,
        ...(payload && { payload }),
    });
};
const replyInvokeFailure = (event, channel, payload) => {
    event.sender.send(getReplyChannel(channel), {
        success: false,
        ...(payload && { payload }),
    });
};
const returnIpcInvokeError = (error, msg = 'Failed to update store') => {
    let errorStr = '';
    if (typeof error === 'string') {
        errorStr = error;
    }
    else if (error?.response?.data) {
        errorStr = JSON.stringify(error.response.data);
    }
    else if (error?.message || error instanceof Error) {
        errorStr = error.message;
    }
    else {
        errorStr = JSON.stringify(error);
    }
    return {
        success: false,
        msg,
        ...(errorStr && { payload: errorStr }),
    };
};



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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOeUM7QUFHRjtBQUV2QyxNQUFNLFdBQVcsR0FBa0I7SUFDakMsR0FBRyxFQUFFLGdEQUFNO0NBQ1osQ0FBQztBQUVGLG1EQUFhLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi9icmlkZ2VzL2lwYy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL3R5cGVzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvdHlwZXMvaXBjLnRzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvdHlwZXMva2V5YmluZGluZ3MudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC91dGlscy9pcGMudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJlbGVjdHJvblwiIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi9wcmVsb2FkLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KShnbG9iYWwsICgpID0+IHtcbnJldHVybiAiLCJpbXBvcnQgeyBpcGNSZW5kZXJlciwgSXBjUmVuZGVyZXJFdmVudCB9IGZyb20gJ2VsZWN0cm9uJztcclxuaW1wb3J0IHsgSV9JcGNBcGksIElwY0NoYW5uZWxzIH0gZnJvbSAnc2hhcmVkL3R5cGVzJztcclxuaW1wb3J0IHsgSXBjSW52b2tlUmV0dXJuLCBJcGNQYXlsb2FkIH0gZnJvbSAnc2hhcmVkL3R5cGVzL2lwYyc7XHJcbmltcG9ydCB7IGdldFJlcGx5Q2hhbm5lbCB9IGZyb20gJy4uLy4uL3NoYXJlZC91dGlscy9pcGMnO1xyXG5cclxuY29uc3QgYmFzZVZhbGlkQ2hhbm5lbHM6IElwY0NoYW5uZWxzW10gPSBPYmplY3QudmFsdWVzKElwY0NoYW5uZWxzKTtcclxuLy8gW1xyXG4vLyBJcGNDaGFubmVscy5jbG9zZUFwcCxcclxuLy8gSXBjQ2hhbm5lbHMucmVzdGFydEFwcCxcclxuLy8gSXBjQ2hhbm5lbHMuY2xlYXJTdG9yZSxcclxuLy8gSXBjQ2hhbm5lbHMuZXhwb3J0U3RvcmVEYXRhLFxyXG4vLyBJcGNDaGFubmVscy5pbXBvcnRTdG9yZURhdGEsXHJcbi8vIElwY0NoYW5uZWxzLmxvYWRTdG9yZURhdGEsXHJcbi8vIElwY0NoYW5uZWxzLnNldFN0b3JlVmFsdWUsXHJcbi8vIElwY0NoYW5uZWxzLmdldFN0b3JlVmFsdWUsXHJcbi8vIF07XHJcbi8vIGNvbnN0IGZhaWxWYWxpZENoYW5uZWxzID0gYmFzZVZhbGlkQ2hhbm5lbHMubWFwKGdldEZhaWxDaGFubmVsKTtcclxuLy8gY29uc3Qgc3VjY2Vzc1ZhbGlkQ2hhbm5lbHMgPSBiYXNlVmFsaWRDaGFubmVscy5tYXAoZ2V0U3VjY2Vzc0NoYW5uZWwpO1xyXG4vLyBjb25zdCB2YWxpZENoYW5uZWxzID0gW1xyXG4vLyAgIC4uLmJhc2VWYWxpZENoYW5uZWxzLFxyXG4vLyAgIC4uLmZhaWxWYWxpZENoYW5uZWxzLFxyXG4vLyAgIC4uLnN1Y2Nlc3NWYWxpZENoYW5uZWxzLFxyXG4vLyBdO1xyXG5jb25zdCByZXBseVZhbGlkQ2hhbm5lbHMgPSBiYXNlVmFsaWRDaGFubmVscy5tYXAoZ2V0UmVwbHlDaGFubmVsKTtcclxuY29uc3QgdmFsaWRDaGFubmVscyA9IFsuLi5iYXNlVmFsaWRDaGFubmVscywgLi4ucmVwbHlWYWxpZENoYW5uZWxzXTtcclxuXHJcbi8qKlxyXG4gKiBBdHRhY2hlcyBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgc3BlY2lmaWVkIElQQyBjaGFubmVsLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gY2hhbm5lbCAtIFRoZSBJUEMgY2hhbm5lbCB0byBsaXN0ZW4gb24uXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMgLSBUaGUgZnVuY3Rpb24gdG8gYmUgZXhlY3V0ZWQgd2hlbiB0aGUgZXZlbnQgb2NjdXJzLlxyXG4gKi9cclxuY29uc3Qgb24gPSAoXHJcbiAgY2hhbm5lbDogc3RyaW5nLFxyXG4gIGZ1bmM6IChldmVudDogSXBjUmVuZGVyZXJFdmVudCwgLi4uYXJnczogYW55W10pID0+IHZvaWQsXHJcbik6IHZvaWQgPT4ge1xyXG4gIGlmICh2YWxpZENoYW5uZWxzLmluY2x1ZGVzKGNoYW5uZWwgYXMgSXBjQ2hhbm5lbHMpKSB7XHJcbiAgICBpcGNSZW5kZXJlci5vbihjaGFubmVsLCAoXywgLi4uYXJncykgPT4gZnVuYyhfLCAuLi5hcmdzKSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgYW4gZXZlbnQgbGlzdGVuZXIgZnJvbSB0aGUgc3BlY2lmaWVkIElQQyBjaGFubmVsLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gY2hhbm5lbCAtIFRoZSBJUEMgY2hhbm5lbCB0byByZW1vdmUgdGhlIGxpc3RlbmVyIGZyb20uXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMgLSBUaGUgZnVuY3Rpb24gdG8gYmUgcmVtb3ZlZCBmcm9tIHRoZSBsaXN0ZW5lcnMuXHJcbiAqL1xyXG5jb25zdCByZW1vdmVMaXN0ZW5lciA9IChcclxuICBjaGFubmVsOiBzdHJpbmcsXHJcbiAgZnVuYzogKGV2ZW50OiBJcGNSZW5kZXJlckV2ZW50LCAuLi5hcmdzOiBhbnlbXSkgPT4gdm9pZCxcclxuKTogdm9pZCA9PiB7XHJcbiAgaWYgKHZhbGlkQ2hhbm5lbHMuaW5jbHVkZXMoY2hhbm5lbCBhcyBJcGNDaGFubmVscykpIHtcclxuICAgIGlwY1JlbmRlcmVyLnJlbW92ZUxpc3RlbmVyKGNoYW5uZWwsIChfLCAuLi5hcmdzKSA9PiBmdW5jKF8sIC4uLmFyZ3MpKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlcyBhbGwgZXZlbnQgbGlzdGVuZXJzIGZyb20gdGhlIHNwZWNpZmllZCBJUEMgY2hhbm5lbC5cclxuICogQHBhcmFtIHtzdHJpbmd9IGNoYW5uZWwgLSBUaGUgSVBDIGNoYW5uZWwgdG8gcmVtb3ZlIHRoZSBsaXN0ZW5lciBmcm9tLlxyXG4gKi9cclxuY29uc3QgcmVtb3ZlQWxsTGlzdGVuZXJzID0gKGNoYW5uZWw6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gIGlmICh2YWxpZENoYW5uZWxzLmluY2x1ZGVzKGNoYW5uZWwgYXMgSXBjQ2hhbm5lbHMpKSB7XHJcbiAgICBpcGNSZW5kZXJlci5yZW1vdmVBbGxMaXN0ZW5lcnMoY2hhbm5lbCk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNlbmRzIGEgbWVzc2FnZSB0byB0aGUgc3BlY2lmaWVkIElQQyBjaGFubmVsLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gY2hhbm5lbCAtIFRoZSBJUEMgY2hhbm5lbCB0byBzZW5kIHRoZSBtZXNzYWdlIHRvLlxyXG4gKiBAcGFyYW0ge2FueX0gcGF5bG9hZCAtIFRoZSBkYXRhIHRvIGJlIHNlbnQgd2l0aCB0aGUgbWVzc2FnZS5cclxuICovXHJcbmNvbnN0IHNlbmQgPSA8UCBleHRlbmRzIGFueVtdPihjaGFubmVsOiBzdHJpbmcsIC4uLnBheWxvYWQ6IFApOiB2b2lkID0+IHtcclxuICBpZiAodmFsaWRDaGFubmVscy5pbmNsdWRlcyhjaGFubmVsIGFzIElwY0NoYW5uZWxzKSkge1xyXG4gICAgaXBjUmVuZGVyZXIuc2VuZChjaGFubmVsLCAuLi5wYXlsb2FkKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogU2VuZHMgYSBtZXNzYWdlIHRvIHRoZSBzcGVjaWZpZWQgSVBDIGNoYW5uZWwgYW5kIGJhY2sgdG8gcmVuZGVyZXJcclxuICogQHBhcmFtIHtzdHJpbmd9IGNoYW5uZWwgLSBUaGUgSVBDIGNoYW5uZWwgdG8gc2VuZCB0aGUgbWVzc2FnZSB0by5cclxuICogQHBhcmFtIHthbnl9IHBheWxvYWQgLSBUaGUgZGF0YSB0byBiZSBzZW50IHdpdGggdGhlIG1lc3NhZ2UuXHJcbiAqL1xyXG5jb25zdCBpbnZva2UgPSA8XHJcbiAgUCBleHRlbmRzIGFueSB8IGFueVtdLFxyXG4gIFQgZXh0ZW5kcyBrZXlvZiBJcGNQYXlsb2FkID0ga2V5b2YgSXBjUGF5bG9hZCxcclxuPihcclxuICBjaGFubmVsOiBULFxyXG4gIHBheWxvYWQ/OiBULFxyXG4pOiBQcm9taXNlPElwY0ludm9rZVJldHVybjxQPj4gPT5cclxuICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICBpZiAodmFsaWRDaGFubmVscy5pbmNsdWRlcyhjaGFubmVsIGFzIElwY0NoYW5uZWxzKSkge1xyXG4gICAgICBpcGNSZW5kZXJlclxyXG4gICAgICAgIC5pbnZva2UoY2hhbm5lbCwgcGF5bG9hZClcclxuICAgICAgICAudGhlbigocmVzdWx0OiBJcGNJbnZva2VSZXR1cm48UD4pID0+IHJlc29sdmUocmVzdWx0KSlcclxuICAgICAgICAuY2F0Y2goKGVycm9yOiB1bmtub3duKSA9PlxyXG4gICAgICAgICAgLy8gPyBUaGlzIHdpbGwgYmFzaWNhbGx5IG5ldmVyIGdldCBjYWxsZWQgZHVlIHRvIGhvdyB0aGUgc3lzdGVtIHdvcmtzXHJcbiAgICAgICAgICAvLyA/IEJ1dCBpbGwga2VlcCBpdCBqdXN0IGluIGNhc2UgOlBcclxuICAgICAgICAgIHJlamVjdCh7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvck1zZzogJ0Vycm9yJywgcGF5bG9hZDogZXJyb3IgfSksXHJcbiAgICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIEhhbmRsZSB0aGUgY2FzZSB3aGVuIHRoZSBjaGFubmVsIGlzIG5vdCB2YWxpZCwgZS5nLiwgdGhyb3cgYW4gZXJyb3JcclxuICAgICAgcmVqZWN0KHtcclxuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcclxuICAgICAgICBtc2c6ICdJbnZhbGlkIENoYW5uZWwnLFxyXG4gICAgICAgIHBheWxvYWQ6IGNoYW5uZWwsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IGlwY0FwaTogSV9JcGNBcGkgPSB7XHJcbiAgb24sXHJcbiAgcmVtb3ZlTGlzdGVuZXIsXHJcbiAgcmVtb3ZlQWxsTGlzdGVuZXJzLFxyXG4gIHNlbmQsXHJcbiAgaW52b2tlLFxyXG59O1xyXG4iLCJpbXBvcnQgeyBCb3VuZHMgfSBmcm9tICcuL2JvdW5kcyc7XHJcbmltcG9ydCB7IENvcmVFbGVjdHJvblN0b3JlIH0gZnJvbSAnLi9jb3JlRWxlY3Ryb25TdG9yZSc7XHJcbmltcG9ydCB7IEdlbmVyaWNGdW5jdGlvbiwgR2VuZXJpY1ZvaWRGdW5jdGlvbiB9IGZyb20gJy4vZ2VuZXJpYyc7XHJcbmltcG9ydCB7XHJcbiAgSV9JcGNBcGksXHJcbiAgSXBjQ2hhbm5lbHMsXHJcbiAgSXBjSW52b2tlUmV0dXJuLFxyXG4gIElwY1BheWxvYWQsXHJcbiAgU2V0U3RvcmVWYWx1ZVBheWxvYWQsXHJcbn0gZnJvbSAnLi9pcGMnO1xyXG5pbXBvcnQge1xyXG4gIFNob3J0Y3V0LFxyXG4gIFNob3J0Y3V0RXZlbnRMaXN0ZW5lcixcclxuICBTaG9ydGN1dEtleWJpbmRpbmdzLFxyXG4gIFNob3J0Y3V0S2V5YmluZGluZ3NBbGlhc2VzLFxyXG59IGZyb20gJy4va2V5YmluZGluZ3MnO1xyXG5pbXBvcnQgeyBJX0VsZWN0cm9uQXBpIH0gZnJvbSAnLi93aW5kb3cnO1xyXG5cclxuZXhwb3J0IHR5cGUge1xyXG4gIEJvdW5kcyxcclxuICBHZW5lcmljRnVuY3Rpb24sXHJcbiAgR2VuZXJpY1ZvaWRGdW5jdGlvbixcclxuICBJX0VsZWN0cm9uQXBpLFxyXG4gIElfSXBjQXBpLFxyXG4gIElwY0ludm9rZVJldHVybixcclxuICBJcGNQYXlsb2FkLFxyXG4gIENvcmVFbGVjdHJvblN0b3JlIGFzIExvY2FsRWxlY3Ryb25TdG9yZSxcclxuICBTZXRTdG9yZVZhbHVlUGF5bG9hZCxcclxuICBTaG9ydGN1dCxcclxuICBTaG9ydGN1dEV2ZW50TGlzdGVuZXIsXHJcbn07XHJcblxyXG5leHBvcnQgeyBJcGNDaGFubmVscywgU2hvcnRjdXRLZXliaW5kaW5ncywgU2hvcnRjdXRLZXliaW5kaW5nc0FsaWFzZXMgfTtcclxuIiwiaW1wb3J0IHsgR2VuZXJpY0Z1bmN0aW9uIH0gZnJvbSAnLi9nZW5lcmljJztcclxuaW1wb3J0IHsgQ29yZUVsZWN0cm9uU3RvcmUgfSBmcm9tICcuL2NvcmVFbGVjdHJvblN0b3JlJztcclxuXHJcbnR5cGUgU2V0U3RvcmVWYWx1ZVBheWxvYWQgPSB7XHJcbiAga2V5OiBrZXlvZiBDb3JlRWxlY3Ryb25TdG9yZTtcclxuICBzdGF0ZTogQ29yZUVsZWN0cm9uU3RvcmVba2V5b2YgQ29yZUVsZWN0cm9uU3RvcmVdO1xyXG59O1xyXG5cclxuZW51bSBJcGNDaGFubmVscyB7XHJcbiAgY2xvc2VBcHAgPSAnY2xvc2UtYXBwJyxcclxuICBtaW5pbWl6ZUFwcCA9ICdtaW5pbWl6ZS1hcHAnLFxyXG4gIG1heGltaXplQXBwID0gJ21heGltaXplLWFwcCcsXHJcbiAgcmVzdGFydEFwcCA9ICdyZXN0YXJ0LWFwcCcsXHJcbiAgY2xlYXJTdG9yZSA9ICdjbGVhci1zdG9yZScsXHJcbiAgdG9nZ2xlRGV2VG9vbHMgPSAndG9nZ2xlLWRldi10b29scycsXHJcbiAgZXhwb3J0U3RvcmVEYXRhID0gJ2V4cG9ydC1zdG9yZS1kYXRhJyxcclxuICBpbXBvcnRTdG9yZURhdGEgPSAnaW1wb3J0LXN0b3JlLWRhdGEnLFxyXG4gIGxvYWRTdG9yZURhdGEgPSAnbG9hZC1zdG9yZS1kYXRhJyxcclxuICBzZXRTdG9yZVZhbHVlID0gJ3NldC1zdG9yZS12YWx1ZScsXHJcbiAgZ2V0U3RvcmVWYWx1ZSA9ICdnZXQtc3RvcmUtdmFsdWUnLFxyXG59XHJcblxyXG50eXBlIElwY0ludm9rZVJldHVybjxQIGV4dGVuZHMgYW55ID0gYW55PiA9IHtcclxuICBzdWNjZXNzOiBib29sZWFuO1xyXG4gIG1zZzogc3RyaW5nO1xyXG4gIHBheWxvYWQ/OiBQO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFR5cGVzYWZldHk6IEV4cGVjdGVkIHBheWxvYWQgaW5wdXQgZm9yIGlwY0NoYW5uZWxzXHJcbiAqL1xyXG50eXBlIElwY1BheWxvYWQgPSB7XHJcbiAgW2tleSBpbiBJcGNDaGFubmVsc106IGtleSBleHRlbmRzICdzZXQtc3RvcmUtdmFsdWUnXHJcbiAgICA/IFNldFN0b3JlVmFsdWVQYXlsb2FkXHJcbiAgICA6IGFueTtcclxufTtcclxuXHJcbmludGVyZmFjZSBJX0lwY0FwaSB7XHJcbiAgb24oY2hhbm5lbDogc3RyaW5nLCBjYWxsYmFjazogR2VuZXJpY0Z1bmN0aW9uKTogdm9pZDtcclxuICByZW1vdmVMaXN0ZW5lcihjaGFubmVsOiBzdHJpbmcsIGNhbGxiYWNrOiBHZW5lcmljRnVuY3Rpb24pOiB2b2lkO1xyXG4gIHJlbW92ZUFsbExpc3RlbmVycyhjaGFubmVsOiBzdHJpbmcpOiB2b2lkO1xyXG4gIHNlbmQ8VCBleHRlbmRzIGtleW9mIElwY1BheWxvYWQ+KFxyXG4gICAgY2hhbm5lbDogVCxcclxuICAgIHBheWxvYWQ/OiBUIGV4dGVuZHMgJ3NldC1zdG9yZS12YWx1ZScgPyBTZXRTdG9yZVZhbHVlUGF5bG9hZCA6IGFueSxcclxuICApOiB2b2lkO1xyXG4gIGludm9rZTxQIGV4dGVuZHMgYW55IHwgYW55W10sIFQgZXh0ZW5kcyBrZXlvZiBJcGNQYXlsb2FkID0ga2V5b2YgSXBjUGF5bG9hZD4oXHJcbiAgICBjaGFubmVsOiBULFxyXG4gICAgcGF5bG9hZD86IFQgZXh0ZW5kcyAnc2V0LXN0b3JlLXZhbHVlJyA/IFNldFN0b3JlVmFsdWVQYXlsb2FkIDogYW55LFxyXG4gICk6IFByb21pc2U8SXBjSW52b2tlUmV0dXJuPFA+PjtcclxufVxyXG5cclxuZXhwb3J0IHsgSXBjQ2hhbm5lbHMgfTtcclxuXHJcbmV4cG9ydCB0eXBlIHsgSV9JcGNBcGksIElwY1BheWxvYWQsIFNldFN0b3JlVmFsdWVQYXlsb2FkLCBJcGNJbnZva2VSZXR1cm4gfTtcclxuIiwiLy8gPyBUT0RPOiBhZGQgdGl0bGUsIGRlc2NyaXB0aW9uLCBvcmRlciwgZ3JvdXBieT8sIHRvIHNob3J0Y3V0c1xyXG4vLyA/IFRPRE86IHNhdmUgc2hvcnRjdXRzICh0byBzeXN0ZW0pLiBlaXRoZXIgdXNlIFN0b3JlLCBvciBlZGl0IGEgSlNPTlxyXG5cclxuZW51bSBTaG9ydGN1dEtleWJpbmRpbmdzQWxpYXNlcyB7XHJcbiAgdG9nZ2xlRXhhbXBsZSA9ICd0b2dnbGVFeGFtcGxlJyxcclxuICB0b2dnbGVXaXRoTm90aWZpY2F0aW9uID0gJ3RvZ2dsZVdpdGhOb3RpZmljYXRpb24nLFxyXG4gIHRvZ2dsZVdpdGhCeWVOb3RpZmljYXRpb24gPSAndG9nZ2xlV2l0aEJ5ZU5vdGlmaWNhdGlvbicsXHJcbn1cclxuXHJcbmNvbnN0IFNob3J0Y3V0S2V5YmluZGluZ3M6IFJlY29yZDxTaG9ydGN1dEtleWJpbmRpbmdzQWxpYXNlcywgc3RyaW5nPiA9IHtcclxuICBbU2hvcnRjdXRLZXliaW5kaW5nc0FsaWFzZXMudG9nZ2xlRXhhbXBsZV06ICdDdHJsK1NoaWZ0K0EnLFxyXG4gIFtTaG9ydGN1dEtleWJpbmRpbmdzQWxpYXNlcy50b2dnbGVXaXRoTm90aWZpY2F0aW9uXTogJ0N0cmwrU2hpZnQrUycsXHJcbiAgW1Nob3J0Y3V0S2V5YmluZGluZ3NBbGlhc2VzLnRvZ2dsZVdpdGhCeWVOb3RpZmljYXRpb25dOiAnQ3RybCtTaGlmdCtEJyxcclxufTtcclxuXHJcbmludGVyZmFjZSBTaG9ydGN1dCB7XHJcbiAgaWQ6IFNob3J0Y3V0S2V5YmluZGluZ3NBbGlhc2VzO1xyXG4gIGtleTogc3RyaW5nO1xyXG4gIGFjdGlvbjogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnk7XHJcbn1cclxuXHJcbnR5cGUgU2hvcnRjdXRFdmVudExpc3RlbmVyID0gKC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkO1xyXG5cclxuZXhwb3J0IHsgU2hvcnRjdXRLZXliaW5kaW5nc0FsaWFzZXMsIFNob3J0Y3V0S2V5YmluZGluZ3MgfTtcclxuXHJcbmV4cG9ydCB0eXBlIHsgU2hvcnRjdXQsIFNob3J0Y3V0RXZlbnRMaXN0ZW5lciB9O1xyXG4iLCJpbXBvcnQgeyBJcGNNYWluRXZlbnQsIElwY01haW5JbnZva2VFdmVudCB9IGZyb20gJ2VsZWN0cm9uJztcclxuaW1wb3J0IHsgSXBjQ2hhbm5lbHMgfSBmcm9tICdzaGFyZWQvdHlwZXMnO1xyXG5pbXBvcnQgeyBJcGNJbnZva2VSZXR1cm4gfSBmcm9tICdzaGFyZWQvdHlwZXMvaXBjJztcclxuXHJcbmNvbnN0IGdldEZhaWxDaGFubmVsID0gKGNoYW5uZWw6IElwY0NoYW5uZWxzKSA9PiBgJHtjaGFubmVsfS1mYWlsYDtcclxuXHJcbmNvbnN0IGdldFN1Y2Nlc3NDaGFubmVsID0gKGNoYW5uZWw6IElwY0NoYW5uZWxzKSA9PiBgJHtjaGFubmVsfS1zdWNjZXNzYDtcclxuXHJcbmNvbnN0IGdldFJlcGx5Q2hhbm5lbCA9IChjaGFubmVsOiBJcGNDaGFubmVscykgPT4gYCR7Y2hhbm5lbH0tcmVwbHlgO1xyXG5cclxuY29uc3QgcmVwbHlTdWNjZXNzID0gKFxyXG4gIGV2ZW50OiBJcGNNYWluRXZlbnQsXHJcbiAgY2hhbm5lbDogSXBjQ2hhbm5lbHMsXHJcbiAgcGF5bG9hZD86IGFueSxcclxuKSA9PiB7XHJcbiAgZXZlbnQucmVwbHkoZ2V0UmVwbHlDaGFubmVsKGNoYW5uZWwpLCB7XHJcbiAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgLi4uKHBheWxvYWQgJiYgeyBwYXlsb2FkIH0pLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3QgcmVwbHlGYWlsdXJlID0gKFxyXG4gIGV2ZW50OiBJcGNNYWluRXZlbnQsXHJcbiAgY2hhbm5lbDogSXBjQ2hhbm5lbHMsXHJcbiAgcGF5bG9hZD86IGFueSxcclxuKSA9PiB7XHJcbiAgZXZlbnQucmVwbHkoZ2V0UmVwbHlDaGFubmVsKGNoYW5uZWwpLCB7XHJcbiAgICBzdWNjZXNzOiBmYWxzZSxcclxuICAgIC4uLihwYXlsb2FkICYmIHsgcGF5bG9hZCB9KSxcclxuICB9KTtcclxufTtcclxuXHJcbmNvbnN0IHJlcGx5SW52b2tlU3VjY2VzcyA9IChcclxuICBldmVudDogSXBjTWFpbkludm9rZUV2ZW50LFxyXG4gIGNoYW5uZWw6IElwY0NoYW5uZWxzLFxyXG4gIHBheWxvYWQ/OiBhbnksXHJcbikgPT4ge1xyXG4gIGV2ZW50LnNlbmRlci5zZW5kKGdldFJlcGx5Q2hhbm5lbChjaGFubmVsKSwge1xyXG4gICAgc3VjY2VzczogdHJ1ZSxcclxuICAgIC4uLihwYXlsb2FkICYmIHsgcGF5bG9hZCB9KSxcclxuICB9KTtcclxufTtcclxuXHJcbmNvbnN0IHJlcGx5SW52b2tlRmFpbHVyZSA9IChcclxuICBldmVudDogSXBjTWFpbkludm9rZUV2ZW50LFxyXG4gIGNoYW5uZWw6IElwY0NoYW5uZWxzLFxyXG4gIHBheWxvYWQ/OiBhbnksXHJcbikgPT4ge1xyXG4gIGV2ZW50LnNlbmRlci5zZW5kKGdldFJlcGx5Q2hhbm5lbChjaGFubmVsKSwge1xyXG4gICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAuLi4ocGF5bG9hZCAmJiB7IHBheWxvYWQgfSksXHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCByZXR1cm5JcGNJbnZva2VFcnJvciA9IChcclxuICBlcnJvcjogYW55LFxyXG4gIG1zZzogc3RyaW5nID0gJ0ZhaWxlZCB0byB1cGRhdGUgc3RvcmUnLFxyXG4pOiBJcGNJbnZva2VSZXR1cm4gPT4ge1xyXG4gIGxldCBlcnJvclN0cjogc3RyaW5nID0gJyc7XHJcblxyXG4gIGlmICh0eXBlb2YgZXJyb3IgPT09ICdzdHJpbmcnKSB7XHJcbiAgICBlcnJvclN0ciA9IGVycm9yO1xyXG4gIH0gZWxzZSBpZiAoZXJyb3I/LnJlc3BvbnNlPy5kYXRhKSB7XHJcbiAgICBlcnJvclN0ciA9IEpTT04uc3RyaW5naWZ5KGVycm9yLnJlc3BvbnNlLmRhdGEpO1xyXG4gIH0gZWxzZSBpZiAoZXJyb3I/Lm1lc3NhZ2UgfHwgZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xyXG4gICAgZXJyb3JTdHIgPSBlcnJvci5tZXNzYWdlO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBlcnJvclN0ciA9IEpTT04uc3RyaW5naWZ5KGVycm9yKTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBzdWNjZXNzOiBmYWxzZSxcclxuICAgIG1zZyxcclxuICAgIC4uLihlcnJvclN0ciAmJiB7IHBheWxvYWQ6IGVycm9yU3RyIH0pLFxyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQge1xyXG4gIGdldEZhaWxDaGFubmVsLFxyXG4gIGdldFN1Y2Nlc3NDaGFubmVsLFxyXG4gIGdldFJlcGx5Q2hhbm5lbCxcclxuICByZXBseVN1Y2Nlc3MsXHJcbiAgcmVwbHlGYWlsdXJlLFxyXG4gIHJlcGx5SW52b2tlU3VjY2VzcyxcclxuICByZXBseUludm9rZUZhaWx1cmUsXHJcbiAgcmV0dXJuSXBjSW52b2tlRXJyb3IsXHJcbn07XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVsZWN0cm9uXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBjb250ZXh0QnJpZGdlIH0gZnJvbSAnZWxlY3Ryb24nO1xyXG5cclxuaW1wb3J0IHsgSV9FbGVjdHJvbkFwaSB9IGZyb20gJ3NoYXJlZC90eXBlcyc7XHJcbmltcG9ydCB7IGlwY0FwaSB9IGZyb20gJy4vYnJpZGdlcy9pcGMnO1xyXG5cclxuY29uc3QgZWxlY3Ryb25BcGk6IElfRWxlY3Ryb25BcGkgPSB7XHJcbiAgaXBjOiBpcGNBcGksXHJcbn07XHJcblxyXG5jb250ZXh0QnJpZGdlLmV4cG9zZUluTWFpbldvcmxkKCdlbGVjdHJvbicsIGVsZWN0cm9uQXBpKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
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
/* harmony import */ var _shared_types_ipc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/types/ipc */ "./src/shared/types/ipc.ts");
/* harmony import */ var _util_ipc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/ipc */ "./src/main/util/ipc.ts");



const baseValidChannels = Object.values(_shared_types_ipc__WEBPACK_IMPORTED_MODULE_1__.IpcChannels);
const replyValidChannels = baseValidChannels.map(_util_ipc__WEBPACK_IMPORTED_MODULE_2__.getReplyChannel);
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

/***/ "./src/main/util/ipc.ts":
/*!******************************!*\
  !*** ./src/main/util/ipc.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getReplyChannel: () => (/* binding */ getReplyChannel),
/* harmony export */   replyFailure: () => (/* binding */ replyFailure),
/* harmony export */   replyInvokeFailure: () => (/* binding */ replyInvokeFailure),
/* harmony export */   replyInvokeSuccess: () => (/* binding */ replyInvokeSuccess),
/* harmony export */   replySuccess: () => (/* binding */ replySuccess),
/* harmony export */   returnIpcInvokeError: () => (/* binding */ returnIpcInvokeError)
/* harmony export */ });
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
    IpcChannels["checkForUpdates"] = "check-for-updates";
    IpcChannels["toggleDevTools"] = "toggle-dev-tools";
    IpcChannels["exportStoreData"] = "export-store-data";
    IpcChannels["importStoreData"] = "import-store-data";
    IpcChannels["loadStoreData"] = "load-store-data";
    IpcChannels["setStoreValue"] = "set-store-value";
    IpcChannels["getStoreValue"] = "get-store-value";
})(IpcChannels || (IpcChannels = {}));


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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UUFhdEI7Ozs7Ozs7Ozs7O0FDckJEOzs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOeUM7QUFHRjtBQUV2QyxNQUFNLFdBQVcsR0FBa0I7SUFDakMsR0FBRyxFQUFFLGdEQUFNO0NBQ1osQ0FBQztBQUVGLG1EQUFhLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi9icmlkZ2VzL2lwYy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi91dGlsL2lwYy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL3R5cGVzL2lwYy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImVsZWN0cm9uXCIiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3NyYy9tYWluL3ByZWxvYWQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IGZhY3RvcnkoKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKGdsb2JhbCwgKCkgPT4ge1xucmV0dXJuICIsImltcG9ydCB7IGlwY1JlbmRlcmVyLCBJcGNSZW5kZXJlckV2ZW50IH0gZnJvbSAnZWxlY3Ryb24nO1xyXG5pbXBvcnQge1xyXG4gIElfSXBjQXBpLFxyXG4gIElwY0NoYW5uZWxzLFxyXG4gIElwY0ludm9rZVJldHVybixcclxuICBJcGNQYXlsb2FkLFxyXG59IGZyb20gJy4uLy4uL3NoYXJlZC90eXBlcy9pcGMnO1xyXG5pbXBvcnQgeyBnZXRSZXBseUNoYW5uZWwgfSBmcm9tICcuLi91dGlsL2lwYyc7XHJcblxyXG5jb25zdCBiYXNlVmFsaWRDaGFubmVsczogSXBjQ2hhbm5lbHNbXSA9IE9iamVjdC52YWx1ZXMoSXBjQ2hhbm5lbHMpO1xyXG5jb25zdCByZXBseVZhbGlkQ2hhbm5lbHMgPSBiYXNlVmFsaWRDaGFubmVscy5tYXAoZ2V0UmVwbHlDaGFubmVsKTtcclxuY29uc3QgdmFsaWRDaGFubmVscyA9IFsuLi5iYXNlVmFsaWRDaGFubmVscywgLi4ucmVwbHlWYWxpZENoYW5uZWxzXTtcclxuXHJcbi8qKlxyXG4gKiBBdHRhY2hlcyBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgc3BlY2lmaWVkIElQQyBjaGFubmVsLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gY2hhbm5lbCAtIFRoZSBJUEMgY2hhbm5lbCB0byBsaXN0ZW4gb24uXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMgLSBUaGUgZnVuY3Rpb24gdG8gYmUgZXhlY3V0ZWQgd2hlbiB0aGUgZXZlbnQgb2NjdXJzLlxyXG4gKi9cclxuY29uc3Qgb24gPSAoXHJcbiAgY2hhbm5lbDogc3RyaW5nLFxyXG4gIGZ1bmM6IChldmVudDogSXBjUmVuZGVyZXJFdmVudCwgLi4uYXJnczogYW55W10pID0+IHZvaWQsXHJcbik6IHZvaWQgPT4ge1xyXG4gIGlmICh2YWxpZENoYW5uZWxzLmluY2x1ZGVzKGNoYW5uZWwgYXMgSXBjQ2hhbm5lbHMpKSB7XHJcbiAgICBpcGNSZW5kZXJlci5vbihjaGFubmVsLCAoXywgLi4uYXJncykgPT4gZnVuYyhfLCAuLi5hcmdzKSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgYW4gZXZlbnQgbGlzdGVuZXIgZnJvbSB0aGUgc3BlY2lmaWVkIElQQyBjaGFubmVsLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gY2hhbm5lbCAtIFRoZSBJUEMgY2hhbm5lbCB0byByZW1vdmUgdGhlIGxpc3RlbmVyIGZyb20uXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMgLSBUaGUgZnVuY3Rpb24gdG8gYmUgcmVtb3ZlZCBmcm9tIHRoZSBsaXN0ZW5lcnMuXHJcbiAqL1xyXG5jb25zdCByZW1vdmVMaXN0ZW5lciA9IChcclxuICBjaGFubmVsOiBzdHJpbmcsXHJcbiAgZnVuYzogKGV2ZW50OiBJcGNSZW5kZXJlckV2ZW50LCAuLi5hcmdzOiBhbnlbXSkgPT4gdm9pZCxcclxuKTogdm9pZCA9PiB7XHJcbiAgaWYgKHZhbGlkQ2hhbm5lbHMuaW5jbHVkZXMoY2hhbm5lbCBhcyBJcGNDaGFubmVscykpIHtcclxuICAgIGlwY1JlbmRlcmVyLnJlbW92ZUxpc3RlbmVyKGNoYW5uZWwsIChfLCAuLi5hcmdzKSA9PiBmdW5jKF8sIC4uLmFyZ3MpKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlcyBhbGwgZXZlbnQgbGlzdGVuZXJzIGZyb20gdGhlIHNwZWNpZmllZCBJUEMgY2hhbm5lbC5cclxuICogQHBhcmFtIHtzdHJpbmd9IGNoYW5uZWwgLSBUaGUgSVBDIGNoYW5uZWwgdG8gcmVtb3ZlIHRoZSBsaXN0ZW5lciBmcm9tLlxyXG4gKi9cclxuY29uc3QgcmVtb3ZlQWxsTGlzdGVuZXJzID0gKGNoYW5uZWw6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gIGlmICh2YWxpZENoYW5uZWxzLmluY2x1ZGVzKGNoYW5uZWwgYXMgSXBjQ2hhbm5lbHMpKSB7XHJcbiAgICBpcGNSZW5kZXJlci5yZW1vdmVBbGxMaXN0ZW5lcnMoY2hhbm5lbCk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNlbmRzIGEgbWVzc2FnZSB0byB0aGUgc3BlY2lmaWVkIElQQyBjaGFubmVsLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gY2hhbm5lbCAtIFRoZSBJUEMgY2hhbm5lbCB0byBzZW5kIHRoZSBtZXNzYWdlIHRvLlxyXG4gKiBAcGFyYW0ge2FueX0gcGF5bG9hZCAtIFRoZSBkYXRhIHRvIGJlIHNlbnQgd2l0aCB0aGUgbWVzc2FnZS5cclxuICovXHJcbmNvbnN0IHNlbmQgPSA8UCBleHRlbmRzIGFueVtdPihjaGFubmVsOiBzdHJpbmcsIC4uLnBheWxvYWQ6IFApOiB2b2lkID0+IHtcclxuICBpZiAodmFsaWRDaGFubmVscy5pbmNsdWRlcyhjaGFubmVsIGFzIElwY0NoYW5uZWxzKSkge1xyXG4gICAgaXBjUmVuZGVyZXIuc2VuZChjaGFubmVsLCAuLi5wYXlsb2FkKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogU2VuZHMgYSBtZXNzYWdlIHRvIHRoZSBzcGVjaWZpZWQgSVBDIGNoYW5uZWwgYW5kIGJhY2sgdG8gcmVuZGVyZXJcclxuICogQHBhcmFtIHtzdHJpbmd9IGNoYW5uZWwgLSBUaGUgSVBDIGNoYW5uZWwgdG8gc2VuZCB0aGUgbWVzc2FnZSB0by5cclxuICogQHBhcmFtIHthbnl9IHBheWxvYWQgLSBUaGUgZGF0YSB0byBiZSBzZW50IHdpdGggdGhlIG1lc3NhZ2UuXHJcbiAqL1xyXG5jb25zdCBpbnZva2UgPSA8XHJcbiAgUCBleHRlbmRzIGFueSB8IGFueVtdLFxyXG4gIFQgZXh0ZW5kcyBrZXlvZiBJcGNQYXlsb2FkID0ga2V5b2YgSXBjUGF5bG9hZCxcclxuPihcclxuICBjaGFubmVsOiBULFxyXG4gIHBheWxvYWQ/OiBULFxyXG4pOiBQcm9taXNlPElwY0ludm9rZVJldHVybjxQPj4gPT5cclxuICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICBpZiAodmFsaWRDaGFubmVscy5pbmNsdWRlcyhjaGFubmVsIGFzIElwY0NoYW5uZWxzKSkge1xyXG4gICAgICBpcGNSZW5kZXJlclxyXG4gICAgICAgIC5pbnZva2UoY2hhbm5lbCwgcGF5bG9hZClcclxuICAgICAgICAudGhlbigocmVzdWx0OiBJcGNJbnZva2VSZXR1cm48UD4pID0+IHJlc29sdmUocmVzdWx0KSlcclxuICAgICAgICAuY2F0Y2goKGVycm9yOiB1bmtub3duKSA9PlxyXG4gICAgICAgICAgLy8gPyBUaGlzIHdpbGwgYmFzaWNhbGx5IG5ldmVyIGdldCBjYWxsZWQgZHVlIHRvIGhvdyB0aGUgc3lzdGVtIHdvcmtzXHJcbiAgICAgICAgICAvLyA/IEJ1dCBpbGwga2VlcCBpdCBqdXN0IGluIGNhc2UgOlBcclxuICAgICAgICAgIHJlamVjdCh7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvck1zZzogJ0Vycm9yJywgcGF5bG9hZDogZXJyb3IgfSksXHJcbiAgICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIEhhbmRsZSB0aGUgY2FzZSB3aGVuIHRoZSBjaGFubmVsIGlzIG5vdCB2YWxpZCwgZS5nLiwgdGhyb3cgYW4gZXJyb3JcclxuICAgICAgcmVqZWN0KHtcclxuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcclxuICAgICAgICBtc2c6ICdJbnZhbGlkIENoYW5uZWwnLFxyXG4gICAgICAgIHBheWxvYWQ6IGNoYW5uZWwsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IGlwY0FwaTogSV9JcGNBcGkgPSB7XHJcbiAgb24sXHJcbiAgcmVtb3ZlTGlzdGVuZXIsXHJcbiAgcmVtb3ZlQWxsTGlzdGVuZXJzLFxyXG4gIHNlbmQsXHJcbiAgaW52b2tlLFxyXG59O1xyXG4iLCJpbXBvcnQgeyBJcGNNYWluRXZlbnQsIElwY01haW5JbnZva2VFdmVudCB9IGZyb20gJ2VsZWN0cm9uJztcclxuaW1wb3J0IHsgSXBjQ2hhbm5lbHMsIElwY0ludm9rZVJldHVybiB9IGZyb20gJy4uLy4uL3NoYXJlZC90eXBlcy9pcGMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldFJlcGx5Q2hhbm5lbCA9IChjaGFubmVsOiBJcGNDaGFubmVscykgPT4gYCR7Y2hhbm5lbH0tcmVwbHlgO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlcGx5U3VjY2VzcyA9IChcclxuICBldmVudDogSXBjTWFpbkV2ZW50LFxyXG4gIGNoYW5uZWw6IElwY0NoYW5uZWxzLFxyXG4gIHBheWxvYWQ/OiBhbnksXHJcbikgPT4ge1xyXG4gIGV2ZW50LnJlcGx5KGdldFJlcGx5Q2hhbm5lbChjaGFubmVsKSwge1xyXG4gICAgc3VjY2VzczogdHJ1ZSxcclxuICAgIC4uLihwYXlsb2FkICYmIHsgcGF5bG9hZCB9KSxcclxuICB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCByZXBseUZhaWx1cmUgPSAoXHJcbiAgZXZlbnQ6IElwY01haW5FdmVudCxcclxuICBjaGFubmVsOiBJcGNDaGFubmVscyxcclxuICBwYXlsb2FkPzogYW55LFxyXG4pID0+IHtcclxuICBldmVudC5yZXBseShnZXRSZXBseUNoYW5uZWwoY2hhbm5lbCksIHtcclxuICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgLi4uKHBheWxvYWQgJiYgeyBwYXlsb2FkIH0pLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlcGx5SW52b2tlU3VjY2VzcyA9IChcclxuICBldmVudDogSXBjTWFpbkludm9rZUV2ZW50LFxyXG4gIGNoYW5uZWw6IElwY0NoYW5uZWxzLFxyXG4gIHBheWxvYWQ/OiBhbnksXHJcbikgPT4ge1xyXG4gIGV2ZW50LnNlbmRlci5zZW5kKGdldFJlcGx5Q2hhbm5lbChjaGFubmVsKSwge1xyXG4gICAgc3VjY2VzczogdHJ1ZSxcclxuICAgIC4uLihwYXlsb2FkICYmIHsgcGF5bG9hZCB9KSxcclxuICB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCByZXBseUludm9rZUZhaWx1cmUgPSAoXHJcbiAgZXZlbnQ6IElwY01haW5JbnZva2VFdmVudCxcclxuICBjaGFubmVsOiBJcGNDaGFubmVscyxcclxuICBwYXlsb2FkPzogYW55LFxyXG4pID0+IHtcclxuICBldmVudC5zZW5kZXIuc2VuZChnZXRSZXBseUNoYW5uZWwoY2hhbm5lbCksIHtcclxuICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgLi4uKHBheWxvYWQgJiYgeyBwYXlsb2FkIH0pLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHJldHVybklwY0ludm9rZUVycm9yID0gKFxyXG4gIGVycm9yOiBhbnksXHJcbiAgbXNnOiBzdHJpbmcgPSAnRmFpbGVkIHRvIHVwZGF0ZSBzdG9yZScsXHJcbik6IElwY0ludm9rZVJldHVybiA9PiB7XHJcbiAgbGV0IGVycm9yU3RyOiBzdHJpbmcgPSAnJztcclxuXHJcbiAgaWYgKHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycpIHtcclxuICAgIGVycm9yU3RyID0gZXJyb3I7XHJcbiAgfSBlbHNlIGlmIChlcnJvcj8ucmVzcG9uc2U/LmRhdGEpIHtcclxuICAgIGVycm9yU3RyID0gSlNPTi5zdHJpbmdpZnkoZXJyb3IucmVzcG9uc2UuZGF0YSk7XHJcbiAgfSBlbHNlIGlmIChlcnJvcj8ubWVzc2FnZSB8fCBlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XHJcbiAgICBlcnJvclN0ciA9IGVycm9yLm1lc3NhZ2U7XHJcbiAgfSBlbHNlIHtcclxuICAgIGVycm9yU3RyID0gSlNPTi5zdHJpbmdpZnkoZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgbXNnLFxyXG4gICAgLi4uKGVycm9yU3RyICYmIHsgcGF5bG9hZDogZXJyb3JTdHIgfSksXHJcbiAgfTtcclxufTtcclxuIiwiaW1wb3J0IHsgR2VuZXJpY0Z1bmN0aW9uIH0gZnJvbSAnLi9nZW5lcmljJztcclxuaW1wb3J0IHsgQ29yZUVsZWN0cm9uU3RvcmUgfSBmcm9tICcuL2NvcmVFbGVjdHJvblN0b3JlJztcclxuXHJcbmV4cG9ydCB0eXBlIFNldFN0b3JlVmFsdWVQYXlsb2FkID0ge1xyXG4gIGtleToga2V5b2YgQ29yZUVsZWN0cm9uU3RvcmU7XHJcbiAgc3RhdGU6IENvcmVFbGVjdHJvblN0b3JlW2tleW9mIENvcmVFbGVjdHJvblN0b3JlXTtcclxufTtcclxuXHJcbmV4cG9ydCBlbnVtIElwY0NoYW5uZWxzIHtcclxuICBjbG9zZUFwcCA9ICdjbG9zZS1hcHAnLFxyXG4gIG1pbmltaXplQXBwID0gJ21pbmltaXplLWFwcCcsXHJcbiAgbWF4aW1pemVBcHAgPSAnbWF4aW1pemUtYXBwJyxcclxuICByZXN0YXJ0QXBwID0gJ3Jlc3RhcnQtYXBwJyxcclxuICBjbGVhclN0b3JlID0gJ2NsZWFyLXN0b3JlJyxcclxuICBjaGVja0ZvclVwZGF0ZXMgPSAnY2hlY2stZm9yLXVwZGF0ZXMnLFxyXG4gIHRvZ2dsZURldlRvb2xzID0gJ3RvZ2dsZS1kZXYtdG9vbHMnLFxyXG4gIGV4cG9ydFN0b3JlRGF0YSA9ICdleHBvcnQtc3RvcmUtZGF0YScsXHJcbiAgaW1wb3J0U3RvcmVEYXRhID0gJ2ltcG9ydC1zdG9yZS1kYXRhJyxcclxuICBsb2FkU3RvcmVEYXRhID0gJ2xvYWQtc3RvcmUtZGF0YScsXHJcbiAgc2V0U3RvcmVWYWx1ZSA9ICdzZXQtc3RvcmUtdmFsdWUnLFxyXG4gIGdldFN0b3JlVmFsdWUgPSAnZ2V0LXN0b3JlLXZhbHVlJyxcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgSXBjSW52b2tlUmV0dXJuPFAgZXh0ZW5kcyBhbnkgPSBhbnk+ID0ge1xyXG4gIHN1Y2Nlc3M6IGJvb2xlYW47XHJcbiAgbXNnOiBzdHJpbmc7XHJcbiAgcGF5bG9hZD86IFA7XHJcbn07XHJcblxyXG4vKipcclxuICogVHlwZXNhZmV0eTogRXhwZWN0ZWQgcGF5bG9hZCBpbnB1dCBmb3IgaXBjQ2hhbm5lbHNcclxuICovXHJcbmV4cG9ydCB0eXBlIElwY1BheWxvYWQgPSB7XHJcbiAgW2tleSBpbiBJcGNDaGFubmVsc106IGtleSBleHRlbmRzICdzZXQtc3RvcmUtdmFsdWUnXHJcbiAgICA/IFNldFN0b3JlVmFsdWVQYXlsb2FkXHJcbiAgICA6IGFueTtcclxufTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSV9JcGNBcGkge1xyXG4gIG9uKGNoYW5uZWw6IHN0cmluZywgY2FsbGJhY2s6IEdlbmVyaWNGdW5jdGlvbik6IHZvaWQ7XHJcbiAgcmVtb3ZlTGlzdGVuZXIoY2hhbm5lbDogc3RyaW5nLCBjYWxsYmFjazogR2VuZXJpY0Z1bmN0aW9uKTogdm9pZDtcclxuICByZW1vdmVBbGxMaXN0ZW5lcnMoY2hhbm5lbDogc3RyaW5nKTogdm9pZDtcclxuICBzZW5kPFQgZXh0ZW5kcyBrZXlvZiBJcGNQYXlsb2FkPihcclxuICAgIGNoYW5uZWw6IFQsXHJcbiAgICBwYXlsb2FkPzogVCBleHRlbmRzICdzZXQtc3RvcmUtdmFsdWUnID8gU2V0U3RvcmVWYWx1ZVBheWxvYWQgOiBhbnksXHJcbiAgKTogdm9pZDtcclxuICBpbnZva2U8UCBleHRlbmRzIGFueSB8IGFueVtdLCBUIGV4dGVuZHMga2V5b2YgSXBjUGF5bG9hZCA9IGtleW9mIElwY1BheWxvYWQ+KFxyXG4gICAgY2hhbm5lbDogVCxcclxuICAgIHBheWxvYWQ/OiBUIGV4dGVuZHMgJ3NldC1zdG9yZS12YWx1ZScgPyBTZXRTdG9yZVZhbHVlUGF5bG9hZCA6IGFueSxcclxuICApOiBQcm9taXNlPElwY0ludm9rZVJldHVybjxQPj47XHJcbn1cclxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZWxlY3Ryb25cIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGNvbnRleHRCcmlkZ2UgfSBmcm9tICdlbGVjdHJvbic7XHJcblxyXG5pbXBvcnQgeyBJX0VsZWN0cm9uQXBpIH0gZnJvbSAnc2hhcmVkL3R5cGVzL3dpbmRvdyc7XHJcbmltcG9ydCB7IGlwY0FwaSB9IGZyb20gJy4vYnJpZGdlcy9pcGMnO1xyXG5cclxuY29uc3QgZWxlY3Ryb25BcGk6IElfRWxlY3Ryb25BcGkgPSB7XHJcbiAgaXBjOiBpcGNBcGksXHJcbn07XHJcblxyXG5jb250ZXh0QnJpZGdlLmV4cG9zZUluTWFpbldvcmxkKCdlbGVjdHJvbicsIGVsZWN0cm9uQXBpKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
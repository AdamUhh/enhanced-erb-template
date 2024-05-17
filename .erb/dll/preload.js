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

/***/ "./src/main/bridges/ipcRenderer.ts":
/*!*****************************************!*\
  !*** ./src/main/bridges/ipcRenderer.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ipcApi: () => (/* binding */ ipcApi)
/* harmony export */ });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shared_utils_channels__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/utils/channels */ "./src/shared/utils/channels.ts");
/* harmony import */ var _listeners_util_ipcReplies__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../listeners/util/ipcReplies */ "./src/main/listeners/util/ipcReplies.ts");
/**
 *
 * This file contains the typesafe ipcRenderer logic that is used on client/renderer side to be sent to main
 *
 */



/**
 * Attaches an event listener to the specified IPC channel.
 * @param channel - The IPC channel to listen on.
 * @param callback - The function to be executed when the event occurs.
 */
const on = (channel, callback) => {
    if (_shared_utils_channels__WEBPACK_IMPORTED_MODULE_1__.validChannels.includes(channel))
        electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.on(channel, (_, ...args) => callback(_, ...args));
};
/**
 * Removes an event listener from the specified IPC channel.
 * @param channel - The IPC channel to remove the listener from.
 * @param callback - The function to be removed from the listeners.
 */
const removeListener = (channel, callback) => {
    if (_shared_utils_channels__WEBPACK_IMPORTED_MODULE_1__.validChannels.includes(channel))
        electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.removeListener(channel, (_, ...args) => callback(_, ...args));
};
/**
 * Removes all event listeners from the specified IPC channel.
 * @param channel - The IPC channel to remove the listener from.
 */
const removeAllListeners = (channel) => {
    if (_shared_utils_channels__WEBPACK_IMPORTED_MODULE_1__.validChannels.includes(channel))
        electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.removeAllListeners(channel);
};
/**
 * Typesafe IPC method that sends a `send` message to the specified IPC channel.
 * @param channel - The IPC channel to send the message to.
 * @param payload - The data to be sent with the message.
 */
const send = (channel, payload) => {
    if (_shared_utils_channels__WEBPACK_IMPORTED_MODULE_1__.validChannels.includes(channel))
        electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.send(channel, payload);
};
/**
 * Typesafe IPC method that sends an `invoke` message to the specified IPC channel and returns a response back (to the renderer)
 * @param channel - The IPC channel to send the message to.
 * @param payload - The data to be sent with the message.
 */
const invoke = (...args) => new Promise((resolve, reject) => {
    const [channel, payload] = args;
    if (_shared_utils_channels__WEBPACK_IMPORTED_MODULE_1__.validChannels.includes(channel)) {
        electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer
            .invoke(channel, payload)
            .then((result) => resolve(result))
            .catch((error) => reject((0,_listeners_util_ipcReplies__WEBPACK_IMPORTED_MODULE_2__.returnIpcInvokeError)(error, 'Error in invoke')));
    }
    else {
        reject((0,_listeners_util_ipcReplies__WEBPACK_IMPORTED_MODULE_2__.returnIpcInvokeError)(channel, 'Invalid Channel'));
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

/***/ "./src/main/listeners/util/ipcReplies.ts":
/*!***********************************************!*\
  !*** ./src/main/listeners/util/ipcReplies.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   replyFailure: () => (/* binding */ replyFailure),
/* harmony export */   replySuccess: () => (/* binding */ replySuccess),
/* harmony export */   returnIpcInvokeError: () => (/* binding */ returnIpcInvokeError)
/* harmony export */ });
/* harmony import */ var _shared_utils_getReplyChannel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../shared/utils/getReplyChannel */ "./src/shared/utils/getReplyChannel.ts");
/* harmony import */ var _utils_stringifyError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/stringifyError */ "./src/main/utils/stringifyError.ts");


/** Sends a success object to the same renderer frame that sent the original request
 *
 * Requires a `*-reply` channel that is listening
 *
 * Provided channel is automatically converted into a `*-reply` channel
 *
 * Used in ipcMain.on() listeners
 *
 * Useful if you want some component to run code after a success for a specific channel
 */
const replySuccess = (event, channel, payload) => {
    event.reply((0,_shared_utils_getReplyChannel__WEBPACK_IMPORTED_MODULE_0__.getReplyChannel)(channel), {
        success: true,
        msg: payload?.msg ?? '',
        payload: payload?.payload ?? undefined,
    });
};
/** Sends a failure object to the same renderer frame that sent the original request
 *
 * Requires a `*-reply` channel that is listening,
 *
 * Provided channel is automatically converted into a `*-reply` channel
 *
 * Used in ipcMain.on() listeners
 *
 * Useful if you want some component to run code after a failure for a specific channel
 *
 */
const replyFailure = (event, channel, payload) => {
    console.log(`Oops, there was an error on channel: ${channel}${payload?.msg && `\n->Message:\n${payload.msg}`} ${payload?.payload && `\n-> Payload:\n ${payload.payload}`}\n`);
    event.reply((0,_shared_utils_getReplyChannel__WEBPACK_IMPORTED_MODULE_0__.getReplyChannel)(channel), {
        success: false,
        msg: payload?.msg ?? '',
        payload: payload?.payload ?? undefined,
    });
};
/** Returns a failure object to the ipc that called the invoke
 *
 * Suited for ipcMain.handle() listeners
 *
 * @param error Stringified Error object (most likely from catch statement)
 * @param msg Custom error message
 * @returns Standard invoke return object; {success: boolean, msg: string, payload: string}
 */
const returnIpcInvokeError = (error, msg = 'Error') => {
    const errorStr = (0,_utils_stringifyError__WEBPACK_IMPORTED_MODULE_1__.stringifyError)(error);
    return {
        success: false,
        msg,
        payload: errorStr ?? '',
    };
};


/***/ }),

/***/ "./src/main/utils/stringifyError.ts":
/*!******************************************!*\
  !*** ./src/main/utils/stringifyError.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   stringifyError: () => (/* binding */ stringifyError)
/* harmony export */ });
function stringifyError(error) {
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
    return errorStr;
}


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
    IpcChannels["isAppMaximized"] = "is-app-maximized";
    IpcChannels["restartApp"] = "restart-app";
    IpcChannels["clearStore"] = "clear-store";
    IpcChannels["checkForUpdates"] = "check-for-updates";
    IpcChannels["toggleDevTools"] = "toggle-dev-tools";
    IpcChannels["toggleRendererErrorDialog"] = "toggle-renderer-error-dialog";
    IpcChannels["exportStoreData"] = "export-store-data";
    IpcChannels["importStoreData"] = "import-store-data";
    IpcChannels["loadStoreData"] = "load-store-data";
    IpcChannels["setStoreValue"] = "set-store-value";
    IpcChannels["getStoreValue"] = "get-store-value";
    IpcChannels["toggleExampleVisibility"] = "toggle-example-visibility";
})(IpcChannels || (IpcChannels = {}));


/***/ }),

/***/ "./src/shared/utils/channels.ts":
/*!**************************************!*\
  !*** ./src/shared/utils/channels.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   baseValidChannels: () => (/* binding */ baseValidChannels),
/* harmony export */   replyValidChannels: () => (/* binding */ replyValidChannels),
/* harmony export */   validChannels: () => (/* binding */ validChannels)
/* harmony export */ });
/* harmony import */ var _types_ipc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types/ipc */ "./src/shared/types/ipc.ts");
/* harmony import */ var _getReplyChannel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getReplyChannel */ "./src/shared/utils/getReplyChannel.ts");


const baseValidChannels = Object.values(_types_ipc__WEBPACK_IMPORTED_MODULE_0__.IpcChannels);
const replyValidChannels = baseValidChannels.map(_getReplyChannel__WEBPACK_IMPORTED_MODULE_1__.getReplyChannel);
const validChannels = [...baseValidChannels, ...replyValidChannels];


/***/ }),

/***/ "./src/shared/utils/getReplyChannel.ts":
/*!*********************************************!*\
  !*** ./src/shared/utils/getReplyChannel.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getReplyChannel: () => (/* binding */ getReplyChannel)
/* harmony export */ });
/** Converts base channels to a `*-reply` channel */
const getReplyChannel = (channel) => `${channel}-reply`;


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
/* harmony import */ var _bridges_ipcRenderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bridges/ipcRenderer */ "./src/main/bridges/ipcRenderer.ts");


const electronApi = {
    ipc: _bridges_ipcRenderer__WEBPACK_IMPORTED_MODULE_1__.ipcApi,
};
electron__WEBPACK_IMPORTED_MODULE_0__.contextBridge.exposeInMainWorld('electron', electronApi);

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RyxPQUFPLFFBQVEsQ0FBQzs7Ozs7Ozs7Ozs7QUNINUU7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ055QztBQUVNO0FBRy9DLE1BQU0sV0FBVyxHQUFrQjtJQUNqQyxHQUFHLEVBQUUsd0RBQU07Q0FDWixDQUFDO0FBRUYsbURBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy8uL3NyYy9tYWluL2JyaWRnZXMvaXBjUmVuZGVyZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4vbGlzdGVuZXJzL3V0aWwvaXBjUmVwbGllcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi91dGlscy9zdHJpbmdpZnlFcnJvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL3R5cGVzL2lwYy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL3V0aWxzL2NoYW5uZWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvdXRpbHMvZ2V0UmVwbHlDaGFubmVsLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiZWxlY3Ryb25cIiIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4vcHJlbG9hZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gZmFjdG9yeSgpO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkoZ2xvYmFsLCAoKSA9PiB7XG5yZXR1cm4gIiwiLyoqXG4gKlxuICogVGhpcyBmaWxlIGNvbnRhaW5zIHRoZSB0eXBlc2FmZSBpcGNSZW5kZXJlciBsb2dpYyB0aGF0IGlzIHVzZWQgb24gY2xpZW50L3JlbmRlcmVyIHNpZGUgdG8gYmUgc2VudCB0byBtYWluXG4gKlxuICovXG5cbmltcG9ydCB7IGlwY1JlbmRlcmVyLCBJcGNSZW5kZXJlckV2ZW50IH0gZnJvbSAnZWxlY3Ryb24nO1xuaW1wb3J0IHtcbiAgSV9JcGNBcGksXG4gIElwY0NoYW5uZWxzLFxuICBJcGNQYXlsb2FkSW5wdXRMb29rdXAsXG4gIElwY0V4cGVjdGVkUGF5bG9hZFJldHVybixcbiAgSXBjSW5wdXRDb25kaXRpb25hbCxcbiAgSXBjSW52b2tlUmV0dXJuLFxuICBJcGNSZXR1cm4sXG59IGZyb20gJy4uLy4uL3NoYXJlZC90eXBlcy9pcGMnO1xuaW1wb3J0IHsgdmFsaWRDaGFubmVscyB9IGZyb20gJy4uLy4uL3NoYXJlZC91dGlscy9jaGFubmVscyc7XG5pbXBvcnQgeyByZXR1cm5JcGNJbnZva2VFcnJvciB9IGZyb20gJy4uL2xpc3RlbmVycy91dGlsL2lwY1JlcGxpZXMnO1xuXG4vKipcbiAqIEF0dGFjaGVzIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBzcGVjaWZpZWQgSVBDIGNoYW5uZWwuXG4gKiBAcGFyYW0gY2hhbm5lbCAtIFRoZSBJUEMgY2hhbm5lbCB0byBsaXN0ZW4gb24uXG4gKiBAcGFyYW0gY2FsbGJhY2sgLSBUaGUgZnVuY3Rpb24gdG8gYmUgZXhlY3V0ZWQgd2hlbiB0aGUgZXZlbnQgb2NjdXJzLlxuICovXG5jb25zdCBvbiA9IChcbiAgY2hhbm5lbDogSXBjQ2hhbm5lbHMsXG4gIGNhbGxiYWNrOiAoZXZlbnQ6IElwY1JlbmRlcmVyRXZlbnQsIC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkLFxuKTogdm9pZCA9PiB7XG4gIGlmICh2YWxpZENoYW5uZWxzLmluY2x1ZGVzKGNoYW5uZWwpKVxuICAgIGlwY1JlbmRlcmVyLm9uKGNoYW5uZWwsIChfLCAuLi5hcmdzKSA9PiBjYWxsYmFjayhfLCAuLi5hcmdzKSk7XG59O1xuXG4vKipcbiAqIFJlbW92ZXMgYW4gZXZlbnQgbGlzdGVuZXIgZnJvbSB0aGUgc3BlY2lmaWVkIElQQyBjaGFubmVsLlxuICogQHBhcmFtIGNoYW5uZWwgLSBUaGUgSVBDIGNoYW5uZWwgdG8gcmVtb3ZlIHRoZSBsaXN0ZW5lciBmcm9tLlxuICogQHBhcmFtIGNhbGxiYWNrIC0gVGhlIGZ1bmN0aW9uIHRvIGJlIHJlbW92ZWQgZnJvbSB0aGUgbGlzdGVuZXJzLlxuICovXG5jb25zdCByZW1vdmVMaXN0ZW5lciA9IChcbiAgY2hhbm5lbDogSXBjQ2hhbm5lbHMsXG4gIGNhbGxiYWNrOiAoZXZlbnQ6IElwY1JlbmRlcmVyRXZlbnQsIC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkLFxuKTogdm9pZCA9PiB7XG4gIGlmICh2YWxpZENoYW5uZWxzLmluY2x1ZGVzKGNoYW5uZWwpKVxuICAgIGlwY1JlbmRlcmVyLnJlbW92ZUxpc3RlbmVyKGNoYW5uZWwsIChfLCAuLi5hcmdzKSA9PiBjYWxsYmFjayhfLCAuLi5hcmdzKSk7XG59O1xuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGV2ZW50IGxpc3RlbmVycyBmcm9tIHRoZSBzcGVjaWZpZWQgSVBDIGNoYW5uZWwuXG4gKiBAcGFyYW0gY2hhbm5lbCAtIFRoZSBJUEMgY2hhbm5lbCB0byByZW1vdmUgdGhlIGxpc3RlbmVyIGZyb20uXG4gKi9cbmNvbnN0IHJlbW92ZUFsbExpc3RlbmVycyA9IChjaGFubmVsOiBJcGNDaGFubmVscyk6IHZvaWQgPT4ge1xuICBpZiAodmFsaWRDaGFubmVscy5pbmNsdWRlcyhjaGFubmVsKSkgaXBjUmVuZGVyZXIucmVtb3ZlQWxsTGlzdGVuZXJzKGNoYW5uZWwpO1xufTtcblxuLyoqXG4gKiBUeXBlc2FmZSBJUEMgbWV0aG9kIHRoYXQgc2VuZHMgYSBgc2VuZGAgbWVzc2FnZSB0byB0aGUgc3BlY2lmaWVkIElQQyBjaGFubmVsLlxuICogQHBhcmFtIGNoYW5uZWwgLSBUaGUgSVBDIGNoYW5uZWwgdG8gc2VuZCB0aGUgbWVzc2FnZSB0by5cbiAqIEBwYXJhbSBwYXlsb2FkIC0gVGhlIGRhdGEgdG8gYmUgc2VudCB3aXRoIHRoZSBtZXNzYWdlLlxuICovXG5jb25zdCBzZW5kID0gPFQgZXh0ZW5kcyBJcGNDaGFubmVscz4oXG4gIGNoYW5uZWw6IFQsXG4gIHBheWxvYWQ/OiBJcGNJbnB1dENvbmRpdGlvbmFsPFQ+LFxuKTogdm9pZCA9PiB7XG4gIGlmICh2YWxpZENoYW5uZWxzLmluY2x1ZGVzKGNoYW5uZWwpKSBpcGNSZW5kZXJlci5zZW5kKGNoYW5uZWwsIHBheWxvYWQpO1xufTtcblxuLyoqXG4gKiBUeXBlc2FmZSBJUEMgbWV0aG9kIHRoYXQgc2VuZHMgYW4gYGludm9rZWAgbWVzc2FnZSB0byB0aGUgc3BlY2lmaWVkIElQQyBjaGFubmVsIGFuZCByZXR1cm5zIGEgcmVzcG9uc2UgYmFjayAodG8gdGhlIHJlbmRlcmVyKVxuICogQHBhcmFtIGNoYW5uZWwgLSBUaGUgSVBDIGNoYW5uZWwgdG8gc2VuZCB0aGUgbWVzc2FnZSB0by5cbiAqIEBwYXJhbSBwYXlsb2FkIC0gVGhlIGRhdGEgdG8gYmUgc2VudCB3aXRoIHRoZSBtZXNzYWdlLlxuICovXG5jb25zdCBpbnZva2UgPSA8VCBleHRlbmRzIElwY0NoYW5uZWxzPihcbiAgLi4uYXJnczogVCBleHRlbmRzIGtleW9mIElwY1BheWxvYWRJbnB1dExvb2t1cFxuICAgID8gW2NoYW5uZWw6IFQsIHBheWxvYWQ/OiBJcGNJbnB1dENvbmRpdGlvbmFsPFQ+XVxuICAgIDogW2NoYW5uZWw6IFRdXG4pOiBQcm9taXNlPElwY1JldHVybjxUPj4gPT5cbiAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IFtjaGFubmVsLCBwYXlsb2FkXSA9IGFyZ3M7XG4gICAgaWYgKHZhbGlkQ2hhbm5lbHMuaW5jbHVkZXMoY2hhbm5lbCkpIHtcbiAgICAgIGlwY1JlbmRlcmVyXG4gICAgICAgIC5pbnZva2UoY2hhbm5lbCwgcGF5bG9hZClcbiAgICAgICAgLnRoZW4oKHJlc3VsdDogSXBjSW52b2tlUmV0dXJuPElwY0V4cGVjdGVkUGF5bG9hZFJldHVybjxUPj4pID0+XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpLFxuICAgICAgICApXG4gICAgICAgIC5jYXRjaCgoZXJyb3I6IHVua25vd24pID0+XG4gICAgICAgICAgcmVqZWN0KHJldHVybklwY0ludm9rZUVycm9yKGVycm9yLCAnRXJyb3IgaW4gaW52b2tlJykpLFxuICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZWplY3QocmV0dXJuSXBjSW52b2tlRXJyb3IoY2hhbm5lbCwgJ0ludmFsaWQgQ2hhbm5lbCcpKTtcbiAgICB9XG4gIH0pO1xuXG5leHBvcnQgY29uc3QgaXBjQXBpOiBJX0lwY0FwaSA9IHtcbiAgb24sXG4gIHJlbW92ZUxpc3RlbmVyLFxuICByZW1vdmVBbGxMaXN0ZW5lcnMsXG4gIHNlbmQsXG4gIGludm9rZSxcbn07XG4iLCJpbXBvcnQgeyBJcGNNYWluRXZlbnQgfSBmcm9tICdlbGVjdHJvbic7XG5pbXBvcnQge1xuICBJcGNDaGFubmVscyxcbiAgSXBjSW52b2tlRXJyb3JSZXR1cm4sXG4gIElwY0ludm9rZVJldHVybixcbn0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3R5cGVzL2lwYyc7XG5pbXBvcnQgeyBnZXRSZXBseUNoYW5uZWwgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvdXRpbHMvZ2V0UmVwbHlDaGFubmVsJztcbmltcG9ydCB7IHN0cmluZ2lmeUVycm9yIH0gZnJvbSAnLi4vLi4vdXRpbHMvc3RyaW5naWZ5RXJyb3InO1xuXG4vKiogU2VuZHMgYSBzdWNjZXNzIG9iamVjdCB0byB0aGUgc2FtZSByZW5kZXJlciBmcmFtZSB0aGF0IHNlbnQgdGhlIG9yaWdpbmFsIHJlcXVlc3RcbiAqXG4gKiBSZXF1aXJlcyBhIGAqLXJlcGx5YCBjaGFubmVsIHRoYXQgaXMgbGlzdGVuaW5nXG4gKlxuICogUHJvdmlkZWQgY2hhbm5lbCBpcyBhdXRvbWF0aWNhbGx5IGNvbnZlcnRlZCBpbnRvIGEgYCotcmVwbHlgIGNoYW5uZWxcbiAqXG4gKiBVc2VkIGluIGlwY01haW4ub24oKSBsaXN0ZW5lcnNcbiAqXG4gKiBVc2VmdWwgaWYgeW91IHdhbnQgc29tZSBjb21wb25lbnQgdG8gcnVuIGNvZGUgYWZ0ZXIgYSBzdWNjZXNzIGZvciBhIHNwZWNpZmljIGNoYW5uZWxcbiAqL1xuZXhwb3J0IGNvbnN0IHJlcGx5U3VjY2VzcyA9IChcbiAgZXZlbnQ6IElwY01haW5FdmVudCxcbiAgY2hhbm5lbDogSXBjQ2hhbm5lbHMsXG4gIHBheWxvYWQ/OiB7IG1zZz86IHN0cmluZzsgcGF5bG9hZD86IGFueSB9LFxuKSA9PiB7XG4gIGV2ZW50LnJlcGx5KGdldFJlcGx5Q2hhbm5lbChjaGFubmVsKSwge1xuICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgbXNnOiBwYXlsb2FkPy5tc2cgPz8gJycsXG4gICAgcGF5bG9hZDogcGF5bG9hZD8ucGF5bG9hZCA/PyB1bmRlZmluZWQsXG4gIH0gYXMgSXBjSW52b2tlUmV0dXJuKTtcbn07XG5cbi8qKiBTZW5kcyBhIGZhaWx1cmUgb2JqZWN0IHRvIHRoZSBzYW1lIHJlbmRlcmVyIGZyYW1lIHRoYXQgc2VudCB0aGUgb3JpZ2luYWwgcmVxdWVzdFxuICpcbiAqIFJlcXVpcmVzIGEgYCotcmVwbHlgIGNoYW5uZWwgdGhhdCBpcyBsaXN0ZW5pbmcsXG4gKlxuICogUHJvdmlkZWQgY2hhbm5lbCBpcyBhdXRvbWF0aWNhbGx5IGNvbnZlcnRlZCBpbnRvIGEgYCotcmVwbHlgIGNoYW5uZWxcbiAqXG4gKiBVc2VkIGluIGlwY01haW4ub24oKSBsaXN0ZW5lcnNcbiAqXG4gKiBVc2VmdWwgaWYgeW91IHdhbnQgc29tZSBjb21wb25lbnQgdG8gcnVuIGNvZGUgYWZ0ZXIgYSBmYWlsdXJlIGZvciBhIHNwZWNpZmljIGNoYW5uZWxcbiAqXG4gKi9cbmV4cG9ydCBjb25zdCByZXBseUZhaWx1cmUgPSAoXG4gIGV2ZW50OiBJcGNNYWluRXZlbnQsXG4gIGNoYW5uZWw6IElwY0NoYW5uZWxzLFxuICBwYXlsb2FkPzogeyBtc2c/OiBzdHJpbmc7IHBheWxvYWQ/OiBhbnkgfSxcbikgPT4ge1xuICBjb25zb2xlLmxvZyhcbiAgICBgT29wcywgdGhlcmUgd2FzIGFuIGVycm9yIG9uIGNoYW5uZWw6ICR7Y2hhbm5lbH0ke1xuICAgICAgcGF5bG9hZD8ubXNnICYmIGBcXG4tPk1lc3NhZ2U6XFxuJHtwYXlsb2FkLm1zZ31gXG4gICAgfSAke3BheWxvYWQ/LnBheWxvYWQgJiYgYFxcbi0+IFBheWxvYWQ6XFxuICR7cGF5bG9hZC5wYXlsb2FkfWB9XFxuYCxcbiAgKTtcbiAgZXZlbnQucmVwbHkoZ2V0UmVwbHlDaGFubmVsKGNoYW5uZWwpLCB7XG4gICAgc3VjY2VzczogZmFsc2UsXG4gICAgbXNnOiBwYXlsb2FkPy5tc2cgPz8gJycsXG4gICAgcGF5bG9hZDogcGF5bG9hZD8ucGF5bG9hZCA/PyB1bmRlZmluZWQsXG4gIH0gYXMgSXBjSW52b2tlRXJyb3JSZXR1cm4pO1xufTtcblxuLyoqIFJldHVybnMgYSBmYWlsdXJlIG9iamVjdCB0byB0aGUgaXBjIHRoYXQgY2FsbGVkIHRoZSBpbnZva2VcbiAqXG4gKiBTdWl0ZWQgZm9yIGlwY01haW4uaGFuZGxlKCkgbGlzdGVuZXJzXG4gKlxuICogQHBhcmFtIGVycm9yIFN0cmluZ2lmaWVkIEVycm9yIG9iamVjdCAobW9zdCBsaWtlbHkgZnJvbSBjYXRjaCBzdGF0ZW1lbnQpXG4gKiBAcGFyYW0gbXNnIEN1c3RvbSBlcnJvciBtZXNzYWdlXG4gKiBAcmV0dXJucyBTdGFuZGFyZCBpbnZva2UgcmV0dXJuIG9iamVjdDsge3N1Y2Nlc3M6IGJvb2xlYW4sIG1zZzogc3RyaW5nLCBwYXlsb2FkOiBzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCByZXR1cm5JcGNJbnZva2VFcnJvciA9IChcbiAgZXJyb3I6IGFueSxcbiAgbXNnOiBzdHJpbmcgPSAnRXJyb3InLFxuKTogSXBjSW52b2tlRXJyb3JSZXR1cm4gPT4ge1xuICBjb25zdCBlcnJvclN0ciA9IHN0cmluZ2lmeUVycm9yKGVycm9yKTtcbiAgcmV0dXJuIHtcbiAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICBtc2csXG4gICAgcGF5bG9hZDogZXJyb3JTdHIgPz8gJycsXG4gIH07XG59O1xuIiwiZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ2lmeUVycm9yKGVycm9yOiBhbnkpOiBzdHJpbmcge1xuICBsZXQgZXJyb3JTdHI6IHN0cmluZyA9ICcnO1xuXG4gIGlmICh0eXBlb2YgZXJyb3IgPT09ICdzdHJpbmcnKSB7XG4gICAgZXJyb3JTdHIgPSBlcnJvcjtcbiAgfSBlbHNlIGlmIChlcnJvcj8ucmVzcG9uc2U/LmRhdGEpIHtcbiAgICBlcnJvclN0ciA9IEpTT04uc3RyaW5naWZ5KGVycm9yLnJlc3BvbnNlLmRhdGEpO1xuICB9IGVsc2UgaWYgKGVycm9yPy5tZXNzYWdlIHx8IGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICBlcnJvclN0ciA9IGVycm9yLm1lc3NhZ2U7XG4gIH0gZWxzZSB7XG4gICAgZXJyb3JTdHIgPSBKU09OLnN0cmluZ2lmeShlcnJvcik7XG4gIH1cblxuICByZXR1cm4gZXJyb3JTdHI7XG59XG4iLCJpbXBvcnQgeyBDb3JlRWxlY3Ryb25TdG9yZSB9IGZyb20gJy4vY29yZUVsZWN0cm9uU3RvcmUnO1xuaW1wb3J0IHsgR2VuZXJpY0Z1bmN0aW9uIH0gZnJvbSAnLi9nZW5lcmljJztcblxuZXhwb3J0IHR5cGUgU2V0U3RvcmVWYWx1ZVBheWxvYWQgPSB7XG4gIGtleToga2V5b2YgQ29yZUVsZWN0cm9uU3RvcmU7XG4gIHN0YXRlOiBDb3JlRWxlY3Ryb25TdG9yZVtrZXlvZiBDb3JlRWxlY3Ryb25TdG9yZV07XG59O1xuXG5leHBvcnQgZW51bSBJcGNDaGFubmVscyB7XG4gIGNsb3NlQXBwID0gJ2Nsb3NlLWFwcCcsXG4gIG1pbmltaXplQXBwID0gJ21pbmltaXplLWFwcCcsXG4gIG1heGltaXplQXBwID0gJ21heGltaXplLWFwcCcsXG4gIGlzQXBwTWF4aW1pemVkID0gJ2lzLWFwcC1tYXhpbWl6ZWQnLFxuICByZXN0YXJ0QXBwID0gJ3Jlc3RhcnQtYXBwJyxcbiAgY2xlYXJTdG9yZSA9ICdjbGVhci1zdG9yZScsXG4gIGNoZWNrRm9yVXBkYXRlcyA9ICdjaGVjay1mb3ItdXBkYXRlcycsXG4gIHRvZ2dsZURldlRvb2xzID0gJ3RvZ2dsZS1kZXYtdG9vbHMnLFxuXG4gIHRvZ2dsZVJlbmRlcmVyRXJyb3JEaWFsb2cgPSAndG9nZ2xlLXJlbmRlcmVyLWVycm9yLWRpYWxvZycsXG5cbiAgZXhwb3J0U3RvcmVEYXRhID0gJ2V4cG9ydC1zdG9yZS1kYXRhJyxcbiAgaW1wb3J0U3RvcmVEYXRhID0gJ2ltcG9ydC1zdG9yZS1kYXRhJyxcbiAgbG9hZFN0b3JlRGF0YSA9ICdsb2FkLXN0b3JlLWRhdGEnLFxuXG4gIHNldFN0b3JlVmFsdWUgPSAnc2V0LXN0b3JlLXZhbHVlJyxcbiAgZ2V0U3RvcmVWYWx1ZSA9ICdnZXQtc3RvcmUtdmFsdWUnLFxuXG4gIHRvZ2dsZUV4YW1wbGVWaXNpYmlsaXR5ID0gJ3RvZ2dsZS1leGFtcGxlLXZpc2liaWxpdHknLFxufVxuXG4vKiogVHlwZXNhZmU6IEV4cGVjdGVkIHBheWxvYWQgSU5QVVQgZm9yIGlwY0NoYW5uZWxzICovXG5leHBvcnQgdHlwZSBJcGNQYXlsb2FkSW5wdXRMb29rdXAgPSB7XG4gIFtJcGNDaGFubmVscy5zZXRTdG9yZVZhbHVlXTogU2V0U3RvcmVWYWx1ZVBheWxvYWQ7XG4gIFtJcGNDaGFubmVscy5nZXRTdG9yZVZhbHVlXToga2V5b2YgQ29yZUVsZWN0cm9uU3RvcmU7XG4gIFtJcGNDaGFubmVscy50b2dnbGVFeGFtcGxlVmlzaWJpbGl0eV06IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG59O1xuXG4vKiogVHlwZXNhZmU6IEV4cGVjdGVkIHBheWxvYWQgUkVUVVJOIGZvciBpcGNDaGFubmVscyAqL1xuZXhwb3J0IHR5cGUgSXBjUGF5bG9hZE91dHB1dExvb2t1cCA9IHtcbiAgW0lwY0NoYW5uZWxzLmlzQXBwTWF4aW1pemVkXTogYm9vbGVhbjtcbiAgW0lwY0NoYW5uZWxzLmdldFN0b3JlVmFsdWVdOiBDb3JlRWxlY3Ryb25TdG9yZVtrZXlvZiBDb3JlRWxlY3Ryb25TdG9yZV07XG4gIFtJcGNDaGFubmVscy50b2dnbGVFeGFtcGxlVmlzaWJpbGl0eV06IGJvb2xlYW47XG59O1xuXG4vKiogVHlwZXNhZmU6IFNwZWNpYWwgZXhwZWN0ZWQgcGF5bG9hZCBSRVRVUk4sIHNwZWNpZmljYWxseSBmb3IgaXBjTWFpbi5oYW5kbGUgaXBjQ2hhbm5lbHNcbiAqXG4gKiBUaGlzIG92ZXJyaWRlcyByZXR1cm4gZnJvbSBJcGNFeHBlY3RlZFJldHVybkxvb2t1cFxuICovXG5leHBvcnQgdHlwZSBJcGNNYWluUGF5bG9hZE91dHB1dExvb2t1cCA9IHtcbiAgW0lwY0NoYW5uZWxzLnNldFN0b3JlVmFsdWVdOiBDb3JlRWxlY3Ryb25TdG9yZVtrZXlvZiBDb3JlRWxlY3Ryb25TdG9yZV07XG59O1xuXG5leHBvcnQgdHlwZSBJcGNSZXR1cm5Gb3JtYXQ8UCA9IGFueT4gPSB7XG4gIHN1Y2Nlc3M6IGJvb2xlYW47XG4gIG1zZz86IHN0cmluZztcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gIHBheWxvYWQ6IFA7XG59O1xuXG5leHBvcnQgdHlwZSBJcGNFcnJvclJldHVybkZvcm1hdDxQID0gYW55PiA9IHtcbiAgc3VjY2VzczogZmFsc2U7XG4gIG1zZzogc3RyaW5nO1xuICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgcGF5bG9hZD86IFA7XG59O1xuXG5leHBvcnQgdHlwZSBJcGNTZW5kUGF5bG9hZE91dHB1dDxcbiAgVCBleHRlbmRzIElwY0NoYW5uZWxzLFxuICBQID0gdW5kZWZpbmVkLFxuPiA9IFQgZXh0ZW5kcyBrZXlvZiBJcGNQYXlsb2FkT3V0cHV0TG9va3VwID8gSXBjUGF5bG9hZE91dHB1dExvb2t1cFtUXSA6IFA7XG5cbmV4cG9ydCB0eXBlIElwY01haW5QYXlsb2FkT3V0cHV0PFxuICBUIGV4dGVuZHMgSXBjQ2hhbm5lbHMsXG4gIFAgPSB1bmRlZmluZWQsXG4+ID0gVCBleHRlbmRzIGtleW9mIElwY01haW5QYXlsb2FkT3V0cHV0TG9va3VwXG4gID8gSXBjTWFpblBheWxvYWRPdXRwdXRMb29rdXBbVF1cbiAgOiBQO1xuXG5leHBvcnQgdHlwZSBJcGNQYXlsb2FkT3V0cHV0PFxuICBUIGV4dGVuZHMgSXBjQ2hhbm5lbHMsXG4gIFAgPSB1bmRlZmluZWQsXG4+ID0gVCBleHRlbmRzIGtleW9mIElwY01haW5QYXlsb2FkT3V0cHV0TG9va3VwXG4gID8gSXBjTWFpblBheWxvYWRPdXRwdXRMb29rdXBbVF1cbiAgOiBJcGNTZW5kUGF5bG9hZE91dHB1dDxULCBQPjtcblxuZXhwb3J0IHR5cGUgSXBjSW52b2tlUmV0dXJuPFQgZXh0ZW5kcyBJcGNDaGFubmVscz4gPVxuICB8IElwY1JldHVybkZvcm1hdDxJcGNQYXlsb2FkT3V0cHV0PFQ+PlxuICB8IElwY0Vycm9yUmV0dXJuRm9ybWF0O1xuXG5leHBvcnQgdHlwZSBJcGNSZXR1cm48VCBleHRlbmRzIElwY0NoYW5uZWxzPiA9IElwY1JldHVybkZvcm1hdDxcbiAgSXBjUGF5bG9hZE91dHB1dDxUPlxuPjtcblxuZXhwb3J0IHR5cGUgSXBjU2VuZFJldHVybjxUIGV4dGVuZHMgSXBjQ2hhbm5lbHM+ID0gSXBjUmV0dXJuRm9ybWF0PFxuICBJcGNTZW5kUGF5bG9hZE91dHB1dDxUPlxuPjtcblxuZXhwb3J0IHR5cGUgSXBjRXhwZWN0ZWRJbnB1dDxUIGV4dGVuZHMgSXBjQ2hhbm5lbHM+ID1cbiAgVCBleHRlbmRzIGtleW9mIElwY1BheWxvYWRJbnB1dExvb2t1cCA/IElwY1BheWxvYWRJbnB1dExvb2t1cFtUXSA6IHVuZGVmaW5lZDtcblxuZXhwb3J0IGludGVyZmFjZSBJX0lwY0FwaSB7XG4gIC8qKlxuICAgKiBBdHRhY2hlcyBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgc3BlY2lmaWVkIElQQyBjaGFubmVsLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2hhbm5lbCAtIFRoZSBJUEMgY2hhbm5lbCB0byBsaXN0ZW4gb24uXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMgLSBUaGUgZnVuY3Rpb24gdG8gYmUgZXhlY3V0ZWQgd2hlbiB0aGUgZXZlbnQgb2NjdXJzLlxuICAgKi9cbiAgb24oY2hhbm5lbDogc3RyaW5nLCBjYWxsYmFjazogR2VuZXJpY0Z1bmN0aW9uKTogdm9pZDtcbiAgLyoqXG4gICAqIFJlbW92ZXMgYW4gZXZlbnQgbGlzdGVuZXIgZnJvbSB0aGUgc3BlY2lmaWVkIElQQyBjaGFubmVsLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2hhbm5lbCAtIFRoZSBJUEMgY2hhbm5lbCB0byByZW1vdmUgdGhlIGxpc3RlbmVyIGZyb20uXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMgLSBUaGUgZnVuY3Rpb24gdG8gYmUgcmVtb3ZlZCBmcm9tIHRoZSBsaXN0ZW5lcnMuXG4gICAqL1xuICByZW1vdmVMaXN0ZW5lcihjaGFubmVsOiBzdHJpbmcsIGNhbGxiYWNrOiBHZW5lcmljRnVuY3Rpb24pOiB2b2lkO1xuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgZXZlbnQgbGlzdGVuZXJzIGZyb20gdGhlIHNwZWNpZmllZCBJUEMgY2hhbm5lbC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNoYW5uZWwgLSBUaGUgSVBDIGNoYW5uZWwgdG8gcmVtb3ZlIHRoZSBsaXN0ZW5lciBmcm9tLlxuICAgKi9cbiAgcmVtb3ZlQWxsTGlzdGVuZXJzKGNoYW5uZWw6IHN0cmluZyk6IHZvaWQ7XG4gIC8qKlxuICAgKiBTZW5kcyBhIG1lc3NhZ2UgdG8gdGhlIHNwZWNpZmllZCBJUEMgY2hhbm5lbC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNoYW5uZWwgLSBUaGUgSVBDIGNoYW5uZWwgdG8gc2VuZCB0aGUgbWVzc2FnZSB0by5cbiAgICogQHBhcmFtIHthbnl9IHBheWxvYWQgLSBUaGUgZGF0YSB0byBiZSBzZW50IHdpdGggdGhlIG1lc3NhZ2UuXG4gICAqL1xuICBzZW5kPFQgZXh0ZW5kcyBJcGNDaGFubmVscz4oXG4gICAgLi4uYXJnczogVCBleHRlbmRzIGtleW9mIElwY1BheWxvYWRJbnB1dExvb2t1cFxuICAgICAgPyBbY2hhbm5lbDogVCwgcGF5bG9hZDogSXBjRXhwZWN0ZWRJbnB1dDxUPl1cbiAgICAgIDogW2NoYW5uZWw6IFRdXG4gICk6IHZvaWQ7XG4gIC8qKlxuICAgKiBTZW5kcyBhIG1lc3NhZ2UgdG8gdGhlIHNwZWNpZmllZCBJUEMgY2hhbm5lbCBhbmQgYmFjayB0byByZW5kZXJlclxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2hhbm5lbCAtIFRoZSBJUEMgY2hhbm5lbCB0byBzZW5kIHRoZSBtZXNzYWdlIHRvLlxuICAgKiBAcGFyYW0ge2FueX0gcGF5bG9hZCAtIFRoZSBkYXRhIHRvIGJlIHNlbnQgd2l0aCB0aGUgbWVzc2FnZS5cbiAgICovXG4gIGludm9rZTxUIGV4dGVuZHMgSXBjQ2hhbm5lbHM+KFxuICAgIC4uLmFyZ3M6IFQgZXh0ZW5kcyBrZXlvZiBJcGNQYXlsb2FkSW5wdXRMb29rdXBcbiAgICAgID8gW2NoYW5uZWw6IFQsIHBheWxvYWQ6IElwY0V4cGVjdGVkSW5wdXQ8VD5dXG4gICAgICA6IFtjaGFubmVsOiBUXVxuICApOiBQcm9taXNlPElwY0ludm9rZVJldHVybjxUPj47XG59XG4iLCJpbXBvcnQgeyBJcGNDaGFubmVscyB9IGZyb20gJy4uL3R5cGVzL2lwYyc7XG5pbXBvcnQgeyBnZXRSZXBseUNoYW5uZWwgfSBmcm9tICcuL2dldFJlcGx5Q2hhbm5lbCc7XG5cbmV4cG9ydCBjb25zdCBiYXNlVmFsaWRDaGFubmVsczogSXBjQ2hhbm5lbHNbXSA9IE9iamVjdC52YWx1ZXMoSXBjQ2hhbm5lbHMpO1xuZXhwb3J0IGNvbnN0IHJlcGx5VmFsaWRDaGFubmVscyA9IGJhc2VWYWxpZENoYW5uZWxzLm1hcChnZXRSZXBseUNoYW5uZWwpO1xuZXhwb3J0IGNvbnN0IHZhbGlkQ2hhbm5lbHMgPSBbLi4uYmFzZVZhbGlkQ2hhbm5lbHMsIC4uLnJlcGx5VmFsaWRDaGFubmVsc107XG4iLCJpbXBvcnQgeyBJcGNDaGFubmVscyB9IGZyb20gJ3NoYXJlZC90eXBlcy9pcGMnO1xuXG4vKiogQ29udmVydHMgYmFzZSBjaGFubmVscyB0byBhIGAqLXJlcGx5YCBjaGFubmVsICovXG5leHBvcnQgY29uc3QgZ2V0UmVwbHlDaGFubmVsID0gKGNoYW5uZWw6IElwY0NoYW5uZWxzKSA9PiBgJHtjaGFubmVsfS1yZXBseWA7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJlbGVjdHJvblwiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgY29udGV4dEJyaWRnZSB9IGZyb20gJ2VsZWN0cm9uJztcblxuaW1wb3J0IHsgaXBjQXBpIH0gZnJvbSAnLi9icmlkZ2VzL2lwY1JlbmRlcmVyJztcbmltcG9ydCB7IElfRWxlY3Ryb25BcGkgfSBmcm9tICcuLi9zaGFyZWQvdHlwZXMvd2luZG93JztcblxuY29uc3QgZWxlY3Ryb25BcGk6IElfRWxlY3Ryb25BcGkgPSB7XG4gIGlwYzogaXBjQXBpLFxufTtcblxuY29udGV4dEJyaWRnZS5leHBvc2VJbk1haW5Xb3JsZCgnZWxlY3Ryb24nLCBlbGVjdHJvbkFwaSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
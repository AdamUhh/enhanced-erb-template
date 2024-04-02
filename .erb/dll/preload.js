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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ055QztBQUVNO0FBRy9DLE1BQU0sV0FBVyxHQUFrQjtJQUNqQyxHQUFHLEVBQUUsd0RBQU07Q0FDWixDQUFDO0FBRUYsbURBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy8uL3NyYy9tYWluL2JyaWRnZXMvaXBjUmVuZGVyZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4vbGlzdGVuZXJzL3V0aWwvaXBjUmVwbGllcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi91dGlscy9zdHJpbmdpZnlFcnJvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL3R5cGVzL2lwYy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL3V0aWxzL2NoYW5uZWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvdXRpbHMvZ2V0UmVwbHlDaGFubmVsLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiZWxlY3Ryb25cIiIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4vcHJlbG9hZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gZmFjdG9yeSgpO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkoZ2xvYmFsLCAoKSA9PiB7XG5yZXR1cm4gIiwiLyoqXHJcbiAqXHJcbiAqIFRoaXMgZmlsZSBjb250YWlucyB0aGUgdHlwZXNhZmUgaXBjUmVuZGVyZXIgbG9naWMgdGhhdCBpcyB1c2VkIG9uIGNsaWVudC9yZW5kZXJlciBzaWRlIHRvIGJlIHNlbnQgdG8gbWFpblxyXG4gKlxyXG4gKi9cclxuXHJcbmltcG9ydCB7IGlwY1JlbmRlcmVyLCBJcGNSZW5kZXJlckV2ZW50IH0gZnJvbSAnZWxlY3Ryb24nO1xyXG5pbXBvcnQge1xyXG4gIElfSXBjQXBpLFxyXG4gIElwY0NoYW5uZWxzLFxyXG4gIElwY0V4cGVjdGVkUGF5bG9hZExvb2t1cCxcclxuICBJcGNFeHBlY3RlZFBheWxvYWRSZXR1cm4sXHJcbiAgSXBjSW5wdXRDb25kaXRpb25hbCxcclxuICBJcGNJbnZva2VSZXR1cm4sXHJcbiAgSXBjUmV0dXJuLFxyXG59IGZyb20gJy4uLy4uL3NoYXJlZC90eXBlcy9pcGMnO1xyXG5pbXBvcnQgeyB2YWxpZENoYW5uZWxzIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3V0aWxzL2NoYW5uZWxzJztcclxuaW1wb3J0IHsgcmV0dXJuSXBjSW52b2tlRXJyb3IgfSBmcm9tICcuLi9saXN0ZW5lcnMvdXRpbC9pcGNSZXBsaWVzJztcclxuXHJcbi8qKlxyXG4gKiBBdHRhY2hlcyBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgc3BlY2lmaWVkIElQQyBjaGFubmVsLlxyXG4gKiBAcGFyYW0gY2hhbm5lbCAtIFRoZSBJUEMgY2hhbm5lbCB0byBsaXN0ZW4gb24uXHJcbiAqIEBwYXJhbSBjYWxsYmFjayAtIFRoZSBmdW5jdGlvbiB0byBiZSBleGVjdXRlZCB3aGVuIHRoZSBldmVudCBvY2N1cnMuXHJcbiAqL1xyXG5jb25zdCBvbiA9IChcclxuICBjaGFubmVsOiBJcGNDaGFubmVscyxcclxuICBjYWxsYmFjazogKGV2ZW50OiBJcGNSZW5kZXJlckV2ZW50LCAuLi5hcmdzOiBhbnlbXSkgPT4gdm9pZCxcclxuKTogdm9pZCA9PiB7XHJcbiAgaWYgKHZhbGlkQ2hhbm5lbHMuaW5jbHVkZXMoY2hhbm5lbCkpXHJcbiAgICBpcGNSZW5kZXJlci5vbihjaGFubmVsLCAoXywgLi4uYXJncykgPT4gY2FsbGJhY2soXywgLi4uYXJncykpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgYW4gZXZlbnQgbGlzdGVuZXIgZnJvbSB0aGUgc3BlY2lmaWVkIElQQyBjaGFubmVsLlxyXG4gKiBAcGFyYW0gY2hhbm5lbCAtIFRoZSBJUEMgY2hhbm5lbCB0byByZW1vdmUgdGhlIGxpc3RlbmVyIGZyb20uXHJcbiAqIEBwYXJhbSBjYWxsYmFjayAtIFRoZSBmdW5jdGlvbiB0byBiZSByZW1vdmVkIGZyb20gdGhlIGxpc3RlbmVycy5cclxuICovXHJcbmNvbnN0IHJlbW92ZUxpc3RlbmVyID0gKFxyXG4gIGNoYW5uZWw6IElwY0NoYW5uZWxzLFxyXG4gIGNhbGxiYWNrOiAoZXZlbnQ6IElwY1JlbmRlcmVyRXZlbnQsIC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkLFxyXG4pOiB2b2lkID0+IHtcclxuICBpZiAodmFsaWRDaGFubmVscy5pbmNsdWRlcyhjaGFubmVsKSlcclxuICAgIGlwY1JlbmRlcmVyLnJlbW92ZUxpc3RlbmVyKGNoYW5uZWwsIChfLCAuLi5hcmdzKSA9PiBjYWxsYmFjayhfLCAuLi5hcmdzKSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlcyBhbGwgZXZlbnQgbGlzdGVuZXJzIGZyb20gdGhlIHNwZWNpZmllZCBJUEMgY2hhbm5lbC5cclxuICogQHBhcmFtIGNoYW5uZWwgLSBUaGUgSVBDIGNoYW5uZWwgdG8gcmVtb3ZlIHRoZSBsaXN0ZW5lciBmcm9tLlxyXG4gKi9cclxuY29uc3QgcmVtb3ZlQWxsTGlzdGVuZXJzID0gKGNoYW5uZWw6IElwY0NoYW5uZWxzKTogdm9pZCA9PiB7XHJcbiAgaWYgKHZhbGlkQ2hhbm5lbHMuaW5jbHVkZXMoY2hhbm5lbCkpIGlwY1JlbmRlcmVyLnJlbW92ZUFsbExpc3RlbmVycyhjaGFubmVsKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUeXBlc2FmZSBJUEMgbWV0aG9kIHRoYXQgc2VuZHMgYSBgc2VuZGAgbWVzc2FnZSB0byB0aGUgc3BlY2lmaWVkIElQQyBjaGFubmVsLlxyXG4gKiBAcGFyYW0gY2hhbm5lbCAtIFRoZSBJUEMgY2hhbm5lbCB0byBzZW5kIHRoZSBtZXNzYWdlIHRvLlxyXG4gKiBAcGFyYW0gcGF5bG9hZCAtIFRoZSBkYXRhIHRvIGJlIHNlbnQgd2l0aCB0aGUgbWVzc2FnZS5cclxuICovXHJcbmNvbnN0IHNlbmQgPSA8VCBleHRlbmRzIElwY0NoYW5uZWxzPihcclxuICBjaGFubmVsOiBULFxyXG4gIHBheWxvYWQ/OiBJcGNJbnB1dENvbmRpdGlvbmFsPFQ+LFxyXG4pOiB2b2lkID0+IHtcclxuICBpZiAodmFsaWRDaGFubmVscy5pbmNsdWRlcyhjaGFubmVsKSkgaXBjUmVuZGVyZXIuc2VuZChjaGFubmVsLCBwYXlsb2FkKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUeXBlc2FmZSBJUEMgbWV0aG9kIHRoYXQgc2VuZHMgYW4gYGludm9rZWAgbWVzc2FnZSB0byB0aGUgc3BlY2lmaWVkIElQQyBjaGFubmVsIGFuZCByZXR1cm5zIGEgcmVzcG9uc2UgYmFjayAodG8gdGhlIHJlbmRlcmVyKVxyXG4gKiBAcGFyYW0gY2hhbm5lbCAtIFRoZSBJUEMgY2hhbm5lbCB0byBzZW5kIHRoZSBtZXNzYWdlIHRvLlxyXG4gKiBAcGFyYW0gcGF5bG9hZCAtIFRoZSBkYXRhIHRvIGJlIHNlbnQgd2l0aCB0aGUgbWVzc2FnZS5cclxuICovXHJcbmNvbnN0IGludm9rZSA9IDxUIGV4dGVuZHMgSXBjQ2hhbm5lbHM+KFxyXG4gIC4uLmFyZ3M6IFQgZXh0ZW5kcyBrZXlvZiBJcGNFeHBlY3RlZFBheWxvYWRMb29rdXBcclxuICAgID8gW2NoYW5uZWw6IFQsIHBheWxvYWQ/OiBJcGNJbnB1dENvbmRpdGlvbmFsPFQ+XVxyXG4gICAgOiBbY2hhbm5lbDogVF1cclxuKTogUHJvbWlzZTxJcGNSZXR1cm48VD4+ID0+XHJcbiAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgY29uc3QgW2NoYW5uZWwsIHBheWxvYWRdID0gYXJncztcclxuICAgIGlmICh2YWxpZENoYW5uZWxzLmluY2x1ZGVzKGNoYW5uZWwpKSB7XHJcbiAgICAgIGlwY1JlbmRlcmVyXHJcbiAgICAgICAgLmludm9rZShjaGFubmVsLCBwYXlsb2FkKVxyXG4gICAgICAgIC50aGVuKChyZXN1bHQ6IElwY0ludm9rZVJldHVybjxJcGNFeHBlY3RlZFBheWxvYWRSZXR1cm48VD4+KSA9PlxyXG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpLFxyXG4gICAgICAgIClcclxuICAgICAgICAuY2F0Y2goKGVycm9yOiB1bmtub3duKSA9PlxyXG4gICAgICAgICAgcmVqZWN0KHJldHVybklwY0ludm9rZUVycm9yKGVycm9yLCAnRXJyb3IgaW4gaW52b2tlJykpLFxyXG4gICAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZWplY3QocmV0dXJuSXBjSW52b2tlRXJyb3IoY2hhbm5lbCwgJ0ludmFsaWQgQ2hhbm5lbCcpKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbmV4cG9ydCBjb25zdCBpcGNBcGk6IElfSXBjQXBpID0ge1xyXG4gIG9uLFxyXG4gIHJlbW92ZUxpc3RlbmVyLFxyXG4gIHJlbW92ZUFsbExpc3RlbmVycyxcclxuICBzZW5kLFxyXG4gIGludm9rZSxcclxufTtcclxuIiwiaW1wb3J0IHsgSXBjTWFpbkV2ZW50IH0gZnJvbSAnZWxlY3Ryb24nO1xyXG5pbXBvcnQge1xyXG4gIElwY0NoYW5uZWxzLFxyXG4gIElwY0ludm9rZUVycm9yUmV0dXJuLFxyXG4gIElwY0ludm9rZVJldHVybixcclxufSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvdHlwZXMvaXBjJztcclxuaW1wb3J0IHsgZ2V0UmVwbHlDaGFubmVsIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3V0aWxzL2dldFJlcGx5Q2hhbm5lbCc7XHJcbmltcG9ydCB7IHN0cmluZ2lmeUVycm9yIH0gZnJvbSAnLi4vLi4vdXRpbHMvc3RyaW5naWZ5RXJyb3InO1xyXG5cclxuLyoqIFNlbmRzIGEgc3VjY2VzcyBvYmplY3QgdG8gdGhlIHNhbWUgcmVuZGVyZXIgZnJhbWUgdGhhdCBzZW50IHRoZSBvcmlnaW5hbCByZXF1ZXN0XHJcbiAqXHJcbiAqIFJlcXVpcmVzIGEgYCotcmVwbHlgIGNoYW5uZWwgdGhhdCBpcyBsaXN0ZW5pbmdcclxuICpcclxuICogUHJvdmlkZWQgY2hhbm5lbCBpcyBhdXRvbWF0aWNhbGx5IGNvbnZlcnRlZCBpbnRvIGEgYCotcmVwbHlgIGNoYW5uZWxcclxuICpcclxuICogVXNlZCBpbiBpcGNNYWluLm9uKCkgbGlzdGVuZXJzXHJcbiAqXHJcbiAqIFVzZWZ1bCBpZiB5b3Ugd2FudCBzb21lIGNvbXBvbmVudCB0byBydW4gY29kZSBhZnRlciBhIHN1Y2Nlc3MgZm9yIGEgc3BlY2lmaWMgY2hhbm5lbFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHJlcGx5U3VjY2VzcyA9IChcclxuICBldmVudDogSXBjTWFpbkV2ZW50LFxyXG4gIGNoYW5uZWw6IElwY0NoYW5uZWxzLFxyXG4gIHBheWxvYWQ/OiB7IG1zZz86IHN0cmluZzsgcGF5bG9hZD86IGFueSB9LFxyXG4pID0+IHtcclxuICBldmVudC5yZXBseShnZXRSZXBseUNoYW5uZWwoY2hhbm5lbCksIHtcclxuICAgIHN1Y2Nlc3M6IHRydWUsXHJcbiAgICBtc2c6IHBheWxvYWQ/Lm1zZyA/PyAnJyxcclxuICAgIHBheWxvYWQ6IHBheWxvYWQ/LnBheWxvYWQgPz8gdW5kZWZpbmVkLFxyXG4gIH0gYXMgSXBjSW52b2tlUmV0dXJuKTtcclxufTtcclxuXHJcbi8qKiBTZW5kcyBhIGZhaWx1cmUgb2JqZWN0IHRvIHRoZSBzYW1lIHJlbmRlcmVyIGZyYW1lIHRoYXQgc2VudCB0aGUgb3JpZ2luYWwgcmVxdWVzdFxyXG4gKlxyXG4gKiBSZXF1aXJlcyBhIGAqLXJlcGx5YCBjaGFubmVsIHRoYXQgaXMgbGlzdGVuaW5nLFxyXG4gKlxyXG4gKiBQcm92aWRlZCBjaGFubmVsIGlzIGF1dG9tYXRpY2FsbHkgY29udmVydGVkIGludG8gYSBgKi1yZXBseWAgY2hhbm5lbFxyXG4gKlxyXG4gKiBVc2VkIGluIGlwY01haW4ub24oKSBsaXN0ZW5lcnNcclxuICpcclxuICogVXNlZnVsIGlmIHlvdSB3YW50IHNvbWUgY29tcG9uZW50IHRvIHJ1biBjb2RlIGFmdGVyIGEgZmFpbHVyZSBmb3IgYSBzcGVjaWZpYyBjaGFubmVsXHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgcmVwbHlGYWlsdXJlID0gKFxyXG4gIGV2ZW50OiBJcGNNYWluRXZlbnQsXHJcbiAgY2hhbm5lbDogSXBjQ2hhbm5lbHMsXHJcbiAgcGF5bG9hZD86IHsgbXNnPzogc3RyaW5nOyBwYXlsb2FkPzogYW55IH0sXHJcbikgPT4ge1xyXG4gIGNvbnNvbGUubG9nKFxyXG4gICAgYE9vcHMsIHRoZXJlIHdhcyBhbiBlcnJvciBvbiBjaGFubmVsOiAke2NoYW5uZWx9JHtcclxuICAgICAgcGF5bG9hZD8ubXNnICYmIGBcXG4tPk1lc3NhZ2U6XFxuJHtwYXlsb2FkLm1zZ31gXHJcbiAgICB9ICR7cGF5bG9hZD8ucGF5bG9hZCAmJiBgXFxuLT4gUGF5bG9hZDpcXG4gJHtwYXlsb2FkLnBheWxvYWR9YH1cXG5gLFxyXG4gICk7XHJcbiAgZXZlbnQucmVwbHkoZ2V0UmVwbHlDaGFubmVsKGNoYW5uZWwpLCB7XHJcbiAgICBzdWNjZXNzOiBmYWxzZSxcclxuICAgIG1zZzogcGF5bG9hZD8ubXNnID8/ICcnLFxyXG4gICAgcGF5bG9hZDogcGF5bG9hZD8ucGF5bG9hZCA/PyB1bmRlZmluZWQsXHJcbiAgfSBhcyBJcGNJbnZva2VFcnJvclJldHVybik7XHJcbn07XHJcblxyXG4vKiogUmV0dXJucyBhIGZhaWx1cmUgb2JqZWN0IHRvIHRoZSBpcGMgdGhhdCBjYWxsZWQgdGhlIGludm9rZVxyXG4gKlxyXG4gKiBTdWl0ZWQgZm9yIGlwY01haW4uaGFuZGxlKCkgbGlzdGVuZXJzXHJcbiAqXHJcbiAqIEBwYXJhbSBlcnJvciBTdHJpbmdpZmllZCBFcnJvciBvYmplY3QgKG1vc3QgbGlrZWx5IGZyb20gY2F0Y2ggc3RhdGVtZW50KVxyXG4gKiBAcGFyYW0gbXNnIEN1c3RvbSBlcnJvciBtZXNzYWdlXHJcbiAqIEByZXR1cm5zIFN0YW5kYXJkIGludm9rZSByZXR1cm4gb2JqZWN0OyB7c3VjY2VzczogYm9vbGVhbiwgbXNnOiBzdHJpbmcsIHBheWxvYWQ6IHN0cmluZ31cclxuICovXHJcbmV4cG9ydCBjb25zdCByZXR1cm5JcGNJbnZva2VFcnJvciA9IChcclxuICBlcnJvcjogYW55LFxyXG4gIG1zZzogc3RyaW5nID0gJ0Vycm9yJyxcclxuKTogSXBjSW52b2tlRXJyb3JSZXR1cm4gPT4ge1xyXG4gIGNvbnN0IGVycm9yU3RyID0gc3RyaW5naWZ5RXJyb3IoZXJyb3IpO1xyXG4gIHJldHVybiB7XHJcbiAgICBzdWNjZXNzOiBmYWxzZSxcclxuICAgIG1zZyxcclxuICAgIHBheWxvYWQ6IGVycm9yU3RyID8/ICcnLFxyXG4gIH07XHJcbn07XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnlFcnJvcihlcnJvcjogYW55KTogc3RyaW5nIHtcclxuICBsZXQgZXJyb3JTdHI6IHN0cmluZyA9ICcnO1xyXG5cclxuICBpZiAodHlwZW9mIGVycm9yID09PSAnc3RyaW5nJykge1xyXG4gICAgZXJyb3JTdHIgPSBlcnJvcjtcclxuICB9IGVsc2UgaWYgKGVycm9yPy5yZXNwb25zZT8uZGF0YSkge1xyXG4gICAgZXJyb3JTdHIgPSBKU09OLnN0cmluZ2lmeShlcnJvci5yZXNwb25zZS5kYXRhKTtcclxuICB9IGVsc2UgaWYgKGVycm9yPy5tZXNzYWdlIHx8IGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcclxuICAgIGVycm9yU3RyID0gZXJyb3IubWVzc2FnZTtcclxuICB9IGVsc2Uge1xyXG4gICAgZXJyb3JTdHIgPSBKU09OLnN0cmluZ2lmeShlcnJvcik7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZXJyb3JTdHI7XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29yZUVsZWN0cm9uU3RvcmUgfSBmcm9tICcuL2NvcmVFbGVjdHJvblN0b3JlJztcclxuaW1wb3J0IHsgR2VuZXJpY0Z1bmN0aW9uIH0gZnJvbSAnLi9nZW5lcmljJztcclxuXHJcbmV4cG9ydCB0eXBlIFNldFN0b3JlVmFsdWVQYXlsb2FkID0ge1xyXG4gIGtleToga2V5b2YgQ29yZUVsZWN0cm9uU3RvcmU7XHJcbiAgc3RhdGU6IENvcmVFbGVjdHJvblN0b3JlW2tleW9mIENvcmVFbGVjdHJvblN0b3JlXTtcclxufTtcclxuXHJcbmV4cG9ydCBlbnVtIElwY0NoYW5uZWxzIHtcclxuICBjbG9zZUFwcCA9ICdjbG9zZS1hcHAnLFxyXG4gIG1pbmltaXplQXBwID0gJ21pbmltaXplLWFwcCcsXHJcbiAgbWF4aW1pemVBcHAgPSAnbWF4aW1pemUtYXBwJyxcclxuICBpc0FwcE1heGltaXplZCA9ICdpcy1hcHAtbWF4aW1pemVkJyxcclxuICByZXN0YXJ0QXBwID0gJ3Jlc3RhcnQtYXBwJyxcclxuICBjbGVhclN0b3JlID0gJ2NsZWFyLXN0b3JlJyxcclxuICBjaGVja0ZvclVwZGF0ZXMgPSAnY2hlY2stZm9yLXVwZGF0ZXMnLFxyXG4gIHRvZ2dsZURldlRvb2xzID0gJ3RvZ2dsZS1kZXYtdG9vbHMnLFxyXG5cclxuICB0b2dnbGVSZW5kZXJlckVycm9yRGlhbG9nID0gJ3RvZ2dsZS1yZW5kZXJlci1lcnJvci1kaWFsb2cnLFxyXG5cclxuICBleHBvcnRTdG9yZURhdGEgPSAnZXhwb3J0LXN0b3JlLWRhdGEnLFxyXG4gIGltcG9ydFN0b3JlRGF0YSA9ICdpbXBvcnQtc3RvcmUtZGF0YScsXHJcbiAgbG9hZFN0b3JlRGF0YSA9ICdsb2FkLXN0b3JlLWRhdGEnLFxyXG5cclxuICBzZXRTdG9yZVZhbHVlID0gJ3NldC1zdG9yZS12YWx1ZScsXHJcbiAgZ2V0U3RvcmVWYWx1ZSA9ICdnZXQtc3RvcmUtdmFsdWUnLFxyXG5cclxuICB0b2dnbGVFeGFtcGxlVmlzaWJpbGl0eSA9ICd0b2dnbGUtZXhhbXBsZS12aXNpYmlsaXR5JyxcclxufVxyXG5cclxuLyoqIFR5cGVzYWZlOiBFeHBlY3RlZCBwYXlsb2FkIElOUFVUIGZvciBpcGNDaGFubmVscyAqL1xyXG5leHBvcnQgdHlwZSBJcGNFeHBlY3RlZFBheWxvYWRMb29rdXAgPSB7XHJcbiAgW0lwY0NoYW5uZWxzLnNldFN0b3JlVmFsdWVdOiBTZXRTdG9yZVZhbHVlUGF5bG9hZDtcclxuICBbSXBjQ2hhbm5lbHMuZ2V0U3RvcmVWYWx1ZV06IGtleW9mIENvcmVFbGVjdHJvblN0b3JlO1xyXG4gIFtJcGNDaGFubmVscy50b2dnbGVFeGFtcGxlVmlzaWJpbGl0eV06IHsgc2hvd0J5ZTogYm9vbGVhbiB9IHwgbnVsbDtcclxufTtcclxuXHJcbi8qKiBUeXBlc2FmZTogRXhwZWN0ZWQgcGF5bG9hZCBSRVRVUk4gZm9yIGlwY0NoYW5uZWxzICovXHJcbmV4cG9ydCB0eXBlIElwY0V4cGVjdGVkUmV0dXJuTG9va3VwID0ge1xyXG4gIFtJcGNDaGFubmVscy5pc0FwcE1heGltaXplZF06IGJvb2xlYW47XHJcbiAgW0lwY0NoYW5uZWxzLmdldFN0b3JlVmFsdWVdOiBDb3JlRWxlY3Ryb25TdG9yZVtrZXlvZiBDb3JlRWxlY3Ryb25TdG9yZV07XHJcbiAgW0lwY0NoYW5uZWxzLnRvZ2dsZUV4YW1wbGVWaXNpYmlsaXR5XTogYm9vbGVhbjtcclxufTtcclxuXHJcbi8qKiBUeXBlc2FmZTogU3BlY2lhbCBleHBlY3RlZCBwYXlsb2FkIFJFVFVSTiwgc3BlY2lmaWNhbGx5IGZvciBpcGNNYWluLmhhbmRsZSBpcGNDaGFubmVsc1xyXG4gKlxyXG4gKiBUaGlzIG92ZXJyaWRlcyByZXR1cm4gZnJvbSBJcGNFeHBlY3RlZFJldHVybkxvb2t1cFxyXG4gKi9cclxuZXhwb3J0IHR5cGUgSXBjRXhwZWN0ZWRNYWluSGFuZGxlUmV0dXJuTG9va3VwID0ge1xyXG4gIFtJcGNDaGFubmVscy5zZXRTdG9yZVZhbHVlXTogQ29yZUVsZWN0cm9uU3RvcmVba2V5b2YgQ29yZUVsZWN0cm9uU3RvcmVdO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgdGhlIHJldHVybiB0eXBlIG9mIGFuIElQQyAoSW50ZXItUHJvY2VzcyBDb21tdW5pY2F0aW9uKSBpbnZva2Ugb3BlcmF0aW9uLlxyXG4gKiBAdGVtcGxhdGUgUCBUaGUgdHlwZSBvZiB0aGUgcGF5bG9hZCBpbmNsdWRlZCBpbiB0aGUgcmVzcG9uc2UuXHJcbiAqL1xyXG5leHBvcnQgdHlwZSBJcGNJbnZva2VSZXR1cm48UCA9IGFueT4gPSB7XHJcbiAgc3VjY2VzczogYm9vbGVhbjtcclxuICBtc2c6IHN0cmluZztcclxuICBwYXlsb2FkOiBQO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgdGhlIGVycm9yIHJldHVybiB0eXBlIG9mIGFuIElQQyBpbnZva2Ugb3BlcmF0aW9uLlxyXG4gKi9cclxuZXhwb3J0IHR5cGUgSXBjSW52b2tlRXJyb3JSZXR1cm4gPSB7XHJcbiAgc3VjY2VzczogZmFsc2U7XHJcbiAgbXNnOiBzdHJpbmc7XHJcbiAgcGF5bG9hZDogc3RyaW5nO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgdGhlIGV4cGVjdGVkIHBheWxvYWQgdHlwZSBmb3IgYSBzcGVjaWZpYyBJUEMgY2hhbm5lbC5cclxuICogQHRlbXBsYXRlIFQgVGhlIHR5cGUgb2YgdGhlIElQQyBjaGFubmVsLlxyXG4gKiBAdGVtcGxhdGUgUCBUaGUgdHlwZSBvZiB0aGUgcGF5bG9hZC5cclxuICovXHJcbmV4cG9ydCB0eXBlIElwY0V4cGVjdGVkUGF5bG9hZDxcclxuICBUIGV4dGVuZHMgSXBjQ2hhbm5lbHMsXHJcbiAgUCA9IHVuZGVmaW5lZCxcclxuPiA9IFQgZXh0ZW5kcyBrZXlvZiBJcGNFeHBlY3RlZFJldHVybkxvb2t1cCA/IElwY0V4cGVjdGVkUmV0dXJuTG9va3VwW1RdIDogUDtcclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIHRoZSBleHBlY3RlZCBwYXlsb2FkIHR5cGUgc3BlY2lmaWNhbGx5IGZvciBhIG1haW4gcHJvY2VzcyBJUEMgaGFuZGxlLlxyXG4gKiBAdGVtcGxhdGUgVCBUaGUgdHlwZSBvZiB0aGUgSVBDIGNoYW5uZWwuXHJcbiAqIEB0ZW1wbGF0ZSBQIFRoZSB0eXBlIG9mIHRoZSBwYXlsb2FkLlxyXG4gKi9cclxuZXhwb3J0IHR5cGUgSXBjRXhwZWN0ZWRNYWluSGFuZGxlUGF5bG9hZDxcclxuICBUIGV4dGVuZHMgSXBjQ2hhbm5lbHMsXHJcbiAgUCA9IHVuZGVmaW5lZCxcclxuPiA9IFQgZXh0ZW5kcyBrZXlvZiBJcGNFeHBlY3RlZE1haW5IYW5kbGVSZXR1cm5Mb29rdXBcclxuICA/IElwY0V4cGVjdGVkTWFpbkhhbmRsZVJldHVybkxvb2t1cFtUXVxyXG4gIDogUDtcclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIHRoZSBleHBlY3RlZCBwYXlsb2FkIHJldHVybiB0eXBlIGZvciBhbiBJUEMgY2hhbm5lbFxyXG4gKiB3aXRoIG1haW4gcHJvY2VzcyBoYW5kbGUgdHlwZXMgaGF2aW5nIHByaW9yaXR5XHJcbiAqIEB0ZW1wbGF0ZSBUIFRoZSB0eXBlIG9mIHRoZSBJUEMgY2hhbm5lbC5cclxuICogQHRlbXBsYXRlIFAgVGhlIHR5cGUgb2YgdGhlIHBheWxvYWQuXHJcbiAqL1xyXG5leHBvcnQgdHlwZSBJcGNFeHBlY3RlZFBheWxvYWRSZXR1cm48XHJcbiAgVCBleHRlbmRzIElwY0NoYW5uZWxzLFxyXG4gIFAgPSB1bmRlZmluZWQsXHJcbj4gPSBUIGV4dGVuZHMga2V5b2YgSXBjRXhwZWN0ZWRNYWluSGFuZGxlUmV0dXJuTG9va3VwXHJcbiAgPyBJcGNFeHBlY3RlZE1haW5IYW5kbGVSZXR1cm5Mb29rdXBbVF1cclxuICA6IElwY0V4cGVjdGVkUGF5bG9hZDxULCBQPjtcclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIHRoZSByZXR1cm4gdHlwZSBmb3IgYW4gSVBDIGNoYW5uZWwuXHJcbiAqIEB0ZW1wbGF0ZSBUIFRoZSB0eXBlIG9mIHRoZSBJUEMgY2hhbm5lbC5cclxuICovXHJcbmV4cG9ydCB0eXBlIElwY1JldHVybjxUIGV4dGVuZHMgSXBjQ2hhbm5lbHM+ID1cclxuICB8IElwY0ludm9rZVJldHVybjxJcGNFeHBlY3RlZFBheWxvYWRSZXR1cm48VD4+XHJcbiAgfCBJcGNJbnZva2VFcnJvclJldHVybjtcclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIHRoZSBjb25kaXRpb25hbCBpbnB1dCB0eXBlIGZvciBhbiBJUEMgY2hhbm5lbC5cclxuICogQHRlbXBsYXRlIFQgVGhlIHR5cGUgb2YgdGhlIElQQyBjaGFubmVsLlxyXG4gKi9cclxuZXhwb3J0IHR5cGUgSXBjSW5wdXRDb25kaXRpb25hbDxUIGV4dGVuZHMgSXBjQ2hhbm5lbHM+ID1cclxuICBUIGV4dGVuZHMga2V5b2YgSXBjRXhwZWN0ZWRQYXlsb2FkTG9va3VwXHJcbiAgICA/IElwY0V4cGVjdGVkUGF5bG9hZExvb2t1cFtUXVxyXG4gICAgOiB1bmRlZmluZWQ7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElfSXBjQXBpIHtcclxuICAvKipcclxuICAgKiBBdHRhY2hlcyBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgc3BlY2lmaWVkIElQQyBjaGFubmVsLlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjaGFubmVsIC0gVGhlIElQQyBjaGFubmVsIHRvIGxpc3RlbiBvbi5cclxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jIC0gVGhlIGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkIHdoZW4gdGhlIGV2ZW50IG9jY3Vycy5cclxuICAgKi9cclxuICBvbihjaGFubmVsOiBzdHJpbmcsIGNhbGxiYWNrOiBHZW5lcmljRnVuY3Rpb24pOiB2b2lkO1xyXG4gIC8qKlxyXG4gICAqIFJlbW92ZXMgYW4gZXZlbnQgbGlzdGVuZXIgZnJvbSB0aGUgc3BlY2lmaWVkIElQQyBjaGFubmVsLlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjaGFubmVsIC0gVGhlIElQQyBjaGFubmVsIHRvIHJlbW92ZSB0aGUgbGlzdGVuZXIgZnJvbS5cclxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jIC0gVGhlIGZ1bmN0aW9uIHRvIGJlIHJlbW92ZWQgZnJvbSB0aGUgbGlzdGVuZXJzLlxyXG4gICAqL1xyXG4gIHJlbW92ZUxpc3RlbmVyKGNoYW5uZWw6IHN0cmluZywgY2FsbGJhY2s6IEdlbmVyaWNGdW5jdGlvbik6IHZvaWQ7XHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlcyBhbGwgZXZlbnQgbGlzdGVuZXJzIGZyb20gdGhlIHNwZWNpZmllZCBJUEMgY2hhbm5lbC5cclxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2hhbm5lbCAtIFRoZSBJUEMgY2hhbm5lbCB0byByZW1vdmUgdGhlIGxpc3RlbmVyIGZyb20uXHJcbiAgICovXHJcbiAgcmVtb3ZlQWxsTGlzdGVuZXJzKGNoYW5uZWw6IHN0cmluZyk6IHZvaWQ7XHJcbiAgLyoqXHJcbiAgICogU2VuZHMgYSBtZXNzYWdlIHRvIHRoZSBzcGVjaWZpZWQgSVBDIGNoYW5uZWwuXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNoYW5uZWwgLSBUaGUgSVBDIGNoYW5uZWwgdG8gc2VuZCB0aGUgbWVzc2FnZSB0by5cclxuICAgKiBAcGFyYW0ge2FueX0gcGF5bG9hZCAtIFRoZSBkYXRhIHRvIGJlIHNlbnQgd2l0aCB0aGUgbWVzc2FnZS5cclxuICAgKi9cclxuICBzZW5kPFQgZXh0ZW5kcyBJcGNDaGFubmVscz4oXHJcbiAgICAuLi5hcmdzOiBUIGV4dGVuZHMga2V5b2YgSXBjRXhwZWN0ZWRQYXlsb2FkTG9va3VwXHJcbiAgICAgID8gW2NoYW5uZWw6IFQsIHBheWxvYWQ6IElwY0lucHV0Q29uZGl0aW9uYWw8VD5dXHJcbiAgICAgIDogW2NoYW5uZWw6IFRdXHJcbiAgKTogdm9pZDtcclxuICAvKipcclxuICAgKiBTZW5kcyBhIG1lc3NhZ2UgdG8gdGhlIHNwZWNpZmllZCBJUEMgY2hhbm5lbCBhbmQgYmFjayB0byByZW5kZXJlclxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjaGFubmVsIC0gVGhlIElQQyBjaGFubmVsIHRvIHNlbmQgdGhlIG1lc3NhZ2UgdG8uXHJcbiAgICogQHBhcmFtIHthbnl9IHBheWxvYWQgLSBUaGUgZGF0YSB0byBiZSBzZW50IHdpdGggdGhlIG1lc3NhZ2UuXHJcbiAgICovXHJcbiAgaW52b2tlPFQgZXh0ZW5kcyBJcGNDaGFubmVscz4oXHJcbiAgICAuLi5hcmdzOiBUIGV4dGVuZHMga2V5b2YgSXBjRXhwZWN0ZWRQYXlsb2FkTG9va3VwXHJcbiAgICAgID8gW2NoYW5uZWw6IFQsIHBheWxvYWQ6IElwY0lucHV0Q29uZGl0aW9uYWw8VD5dXHJcbiAgICAgIDogW2NoYW5uZWw6IFRdXHJcbiAgKTogUHJvbWlzZTxJcGNSZXR1cm48VD4+O1xyXG59XHJcbiIsImltcG9ydCB7IElwY0NoYW5uZWxzIH0gZnJvbSAnLi4vdHlwZXMvaXBjJztcclxuaW1wb3J0IHsgZ2V0UmVwbHlDaGFubmVsIH0gZnJvbSAnLi9nZXRSZXBseUNoYW5uZWwnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGJhc2VWYWxpZENoYW5uZWxzOiBJcGNDaGFubmVsc1tdID0gT2JqZWN0LnZhbHVlcyhJcGNDaGFubmVscyk7XHJcbmV4cG9ydCBjb25zdCByZXBseVZhbGlkQ2hhbm5lbHMgPSBiYXNlVmFsaWRDaGFubmVscy5tYXAoZ2V0UmVwbHlDaGFubmVsKTtcclxuZXhwb3J0IGNvbnN0IHZhbGlkQ2hhbm5lbHMgPSBbLi4uYmFzZVZhbGlkQ2hhbm5lbHMsIC4uLnJlcGx5VmFsaWRDaGFubmVsc107XHJcbiIsImltcG9ydCB7IElwY0NoYW5uZWxzIH0gZnJvbSAnc2hhcmVkL3R5cGVzL2lwYyc7XHJcblxyXG4vKiogQ29udmVydHMgYmFzZSBjaGFubmVscyB0byBhIGAqLXJlcGx5YCBjaGFubmVsICovXHJcbmV4cG9ydCBjb25zdCBnZXRSZXBseUNoYW5uZWwgPSAoY2hhbm5lbDogSXBjQ2hhbm5lbHMpID0+IGAke2NoYW5uZWx9LXJlcGx5YDtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZWxlY3Ryb25cIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGNvbnRleHRCcmlkZ2UgfSBmcm9tICdlbGVjdHJvbic7XHJcblxyXG5pbXBvcnQgeyBpcGNBcGkgfSBmcm9tICcuL2JyaWRnZXMvaXBjUmVuZGVyZXInO1xyXG5pbXBvcnQgeyBJX0VsZWN0cm9uQXBpIH0gZnJvbSAnLi4vc2hhcmVkL3R5cGVzL3dpbmRvdyc7XHJcblxyXG5jb25zdCBlbGVjdHJvbkFwaTogSV9FbGVjdHJvbkFwaSA9IHtcclxuICBpcGM6IGlwY0FwaSxcclxufTtcclxuXHJcbmNvbnRleHRCcmlkZ2UuZXhwb3NlSW5NYWluV29ybGQoJ2VsZWN0cm9uJywgZWxlY3Ryb25BcGkpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
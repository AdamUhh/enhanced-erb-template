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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ055QztBQUVNO0FBRy9DLE1BQU0sV0FBVyxHQUFrQjtJQUNqQyxHQUFHLEVBQUUsd0RBQU07Q0FDWixDQUFDO0FBRUYsbURBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy8uL3NyYy9tYWluL2JyaWRnZXMvaXBjUmVuZGVyZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4vbGlzdGVuZXJzL3V0aWwvaXBjUmVwbGllcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi91dGlscy9zdHJpbmdpZnlFcnJvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL3R5cGVzL2lwYy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL3V0aWxzL2NoYW5uZWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvdXRpbHMvZ2V0UmVwbHlDaGFubmVsLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiZWxlY3Ryb25cIiIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4vcHJlbG9hZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gZmFjdG9yeSgpO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkoZ2xvYmFsLCAoKSA9PiB7XG5yZXR1cm4gIiwiLyoqXHJcbiAqXHJcbiAqIFRoaXMgZmlsZSBjb250YWlucyB0aGUgdHlwZXNhZmUgaXBjUmVuZGVyZXIgbG9naWMgdGhhdCBpcyB1c2VkIG9uIGNsaWVudC9yZW5kZXJlciBzaWRlIHRvIGJlIHNlbnQgdG8gbWFpblxyXG4gKlxyXG4gKi9cclxuXHJcbmltcG9ydCB7IGlwY1JlbmRlcmVyLCBJcGNSZW5kZXJlckV2ZW50IH0gZnJvbSAnZWxlY3Ryb24nO1xyXG5pbXBvcnQge1xyXG4gIElfSXBjQXBpLFxyXG4gIElwY0NoYW5uZWxzLFxyXG4gIElwY1BheWxvYWRJbnB1dExvb2t1cCxcclxuICBJcGNFeHBlY3RlZFBheWxvYWRSZXR1cm4sXHJcbiAgSXBjSW5wdXRDb25kaXRpb25hbCxcclxuICBJcGNJbnZva2VSZXR1cm4sXHJcbiAgSXBjUmV0dXJuLFxyXG59IGZyb20gJy4uLy4uL3NoYXJlZC90eXBlcy9pcGMnO1xyXG5pbXBvcnQgeyB2YWxpZENoYW5uZWxzIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3V0aWxzL2NoYW5uZWxzJztcclxuaW1wb3J0IHsgcmV0dXJuSXBjSW52b2tlRXJyb3IgfSBmcm9tICcuLi9saXN0ZW5lcnMvdXRpbC9pcGNSZXBsaWVzJztcclxuXHJcbi8qKlxyXG4gKiBBdHRhY2hlcyBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgc3BlY2lmaWVkIElQQyBjaGFubmVsLlxyXG4gKiBAcGFyYW0gY2hhbm5lbCAtIFRoZSBJUEMgY2hhbm5lbCB0byBsaXN0ZW4gb24uXHJcbiAqIEBwYXJhbSBjYWxsYmFjayAtIFRoZSBmdW5jdGlvbiB0byBiZSBleGVjdXRlZCB3aGVuIHRoZSBldmVudCBvY2N1cnMuXHJcbiAqL1xyXG5jb25zdCBvbiA9IChcclxuICBjaGFubmVsOiBJcGNDaGFubmVscyxcclxuICBjYWxsYmFjazogKGV2ZW50OiBJcGNSZW5kZXJlckV2ZW50LCAuLi5hcmdzOiBhbnlbXSkgPT4gdm9pZCxcclxuKTogdm9pZCA9PiB7XHJcbiAgaWYgKHZhbGlkQ2hhbm5lbHMuaW5jbHVkZXMoY2hhbm5lbCkpXHJcbiAgICBpcGNSZW5kZXJlci5vbihjaGFubmVsLCAoXywgLi4uYXJncykgPT4gY2FsbGJhY2soXywgLi4uYXJncykpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgYW4gZXZlbnQgbGlzdGVuZXIgZnJvbSB0aGUgc3BlY2lmaWVkIElQQyBjaGFubmVsLlxyXG4gKiBAcGFyYW0gY2hhbm5lbCAtIFRoZSBJUEMgY2hhbm5lbCB0byByZW1vdmUgdGhlIGxpc3RlbmVyIGZyb20uXHJcbiAqIEBwYXJhbSBjYWxsYmFjayAtIFRoZSBmdW5jdGlvbiB0byBiZSByZW1vdmVkIGZyb20gdGhlIGxpc3RlbmVycy5cclxuICovXHJcbmNvbnN0IHJlbW92ZUxpc3RlbmVyID0gKFxyXG4gIGNoYW5uZWw6IElwY0NoYW5uZWxzLFxyXG4gIGNhbGxiYWNrOiAoZXZlbnQ6IElwY1JlbmRlcmVyRXZlbnQsIC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkLFxyXG4pOiB2b2lkID0+IHtcclxuICBpZiAodmFsaWRDaGFubmVscy5pbmNsdWRlcyhjaGFubmVsKSlcclxuICAgIGlwY1JlbmRlcmVyLnJlbW92ZUxpc3RlbmVyKGNoYW5uZWwsIChfLCAuLi5hcmdzKSA9PiBjYWxsYmFjayhfLCAuLi5hcmdzKSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlcyBhbGwgZXZlbnQgbGlzdGVuZXJzIGZyb20gdGhlIHNwZWNpZmllZCBJUEMgY2hhbm5lbC5cclxuICogQHBhcmFtIGNoYW5uZWwgLSBUaGUgSVBDIGNoYW5uZWwgdG8gcmVtb3ZlIHRoZSBsaXN0ZW5lciBmcm9tLlxyXG4gKi9cclxuY29uc3QgcmVtb3ZlQWxsTGlzdGVuZXJzID0gKGNoYW5uZWw6IElwY0NoYW5uZWxzKTogdm9pZCA9PiB7XHJcbiAgaWYgKHZhbGlkQ2hhbm5lbHMuaW5jbHVkZXMoY2hhbm5lbCkpIGlwY1JlbmRlcmVyLnJlbW92ZUFsbExpc3RlbmVycyhjaGFubmVsKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUeXBlc2FmZSBJUEMgbWV0aG9kIHRoYXQgc2VuZHMgYSBgc2VuZGAgbWVzc2FnZSB0byB0aGUgc3BlY2lmaWVkIElQQyBjaGFubmVsLlxyXG4gKiBAcGFyYW0gY2hhbm5lbCAtIFRoZSBJUEMgY2hhbm5lbCB0byBzZW5kIHRoZSBtZXNzYWdlIHRvLlxyXG4gKiBAcGFyYW0gcGF5bG9hZCAtIFRoZSBkYXRhIHRvIGJlIHNlbnQgd2l0aCB0aGUgbWVzc2FnZS5cclxuICovXHJcbmNvbnN0IHNlbmQgPSA8VCBleHRlbmRzIElwY0NoYW5uZWxzPihcclxuICBjaGFubmVsOiBULFxyXG4gIHBheWxvYWQ/OiBJcGNJbnB1dENvbmRpdGlvbmFsPFQ+LFxyXG4pOiB2b2lkID0+IHtcclxuICBpZiAodmFsaWRDaGFubmVscy5pbmNsdWRlcyhjaGFubmVsKSkgaXBjUmVuZGVyZXIuc2VuZChjaGFubmVsLCBwYXlsb2FkKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUeXBlc2FmZSBJUEMgbWV0aG9kIHRoYXQgc2VuZHMgYW4gYGludm9rZWAgbWVzc2FnZSB0byB0aGUgc3BlY2lmaWVkIElQQyBjaGFubmVsIGFuZCByZXR1cm5zIGEgcmVzcG9uc2UgYmFjayAodG8gdGhlIHJlbmRlcmVyKVxyXG4gKiBAcGFyYW0gY2hhbm5lbCAtIFRoZSBJUEMgY2hhbm5lbCB0byBzZW5kIHRoZSBtZXNzYWdlIHRvLlxyXG4gKiBAcGFyYW0gcGF5bG9hZCAtIFRoZSBkYXRhIHRvIGJlIHNlbnQgd2l0aCB0aGUgbWVzc2FnZS5cclxuICovXHJcbmNvbnN0IGludm9rZSA9IDxUIGV4dGVuZHMgSXBjQ2hhbm5lbHM+KFxyXG4gIC4uLmFyZ3M6IFQgZXh0ZW5kcyBrZXlvZiBJcGNQYXlsb2FkSW5wdXRMb29rdXBcclxuICAgID8gW2NoYW5uZWw6IFQsIHBheWxvYWQ/OiBJcGNJbnB1dENvbmRpdGlvbmFsPFQ+XVxyXG4gICAgOiBbY2hhbm5lbDogVF1cclxuKTogUHJvbWlzZTxJcGNSZXR1cm48VD4+ID0+XHJcbiAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgY29uc3QgW2NoYW5uZWwsIHBheWxvYWRdID0gYXJncztcclxuICAgIGlmICh2YWxpZENoYW5uZWxzLmluY2x1ZGVzKGNoYW5uZWwpKSB7XHJcbiAgICAgIGlwY1JlbmRlcmVyXHJcbiAgICAgICAgLmludm9rZShjaGFubmVsLCBwYXlsb2FkKVxyXG4gICAgICAgIC50aGVuKChyZXN1bHQ6IElwY0ludm9rZVJldHVybjxJcGNFeHBlY3RlZFBheWxvYWRSZXR1cm48VD4+KSA9PlxyXG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpLFxyXG4gICAgICAgIClcclxuICAgICAgICAuY2F0Y2goKGVycm9yOiB1bmtub3duKSA9PlxyXG4gICAgICAgICAgcmVqZWN0KHJldHVybklwY0ludm9rZUVycm9yKGVycm9yLCAnRXJyb3IgaW4gaW52b2tlJykpLFxyXG4gICAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZWplY3QocmV0dXJuSXBjSW52b2tlRXJyb3IoY2hhbm5lbCwgJ0ludmFsaWQgQ2hhbm5lbCcpKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbmV4cG9ydCBjb25zdCBpcGNBcGk6IElfSXBjQXBpID0ge1xyXG4gIG9uLFxyXG4gIHJlbW92ZUxpc3RlbmVyLFxyXG4gIHJlbW92ZUFsbExpc3RlbmVycyxcclxuICBzZW5kLFxyXG4gIGludm9rZSxcclxufTtcclxuIiwiaW1wb3J0IHsgSXBjTWFpbkV2ZW50IH0gZnJvbSAnZWxlY3Ryb24nO1xyXG5pbXBvcnQge1xyXG4gIElwY0NoYW5uZWxzLFxyXG4gIElwY0ludm9rZUVycm9yUmV0dXJuLFxyXG4gIElwY0ludm9rZVJldHVybixcclxufSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvdHlwZXMvaXBjJztcclxuaW1wb3J0IHsgZ2V0UmVwbHlDaGFubmVsIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3V0aWxzL2dldFJlcGx5Q2hhbm5lbCc7XHJcbmltcG9ydCB7IHN0cmluZ2lmeUVycm9yIH0gZnJvbSAnLi4vLi4vdXRpbHMvc3RyaW5naWZ5RXJyb3InO1xyXG5cclxuLyoqIFNlbmRzIGEgc3VjY2VzcyBvYmplY3QgdG8gdGhlIHNhbWUgcmVuZGVyZXIgZnJhbWUgdGhhdCBzZW50IHRoZSBvcmlnaW5hbCByZXF1ZXN0XHJcbiAqXHJcbiAqIFJlcXVpcmVzIGEgYCotcmVwbHlgIGNoYW5uZWwgdGhhdCBpcyBsaXN0ZW5pbmdcclxuICpcclxuICogUHJvdmlkZWQgY2hhbm5lbCBpcyBhdXRvbWF0aWNhbGx5IGNvbnZlcnRlZCBpbnRvIGEgYCotcmVwbHlgIGNoYW5uZWxcclxuICpcclxuICogVXNlZCBpbiBpcGNNYWluLm9uKCkgbGlzdGVuZXJzXHJcbiAqXHJcbiAqIFVzZWZ1bCBpZiB5b3Ugd2FudCBzb21lIGNvbXBvbmVudCB0byBydW4gY29kZSBhZnRlciBhIHN1Y2Nlc3MgZm9yIGEgc3BlY2lmaWMgY2hhbm5lbFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHJlcGx5U3VjY2VzcyA9IChcclxuICBldmVudDogSXBjTWFpbkV2ZW50LFxyXG4gIGNoYW5uZWw6IElwY0NoYW5uZWxzLFxyXG4gIHBheWxvYWQ/OiB7IG1zZz86IHN0cmluZzsgcGF5bG9hZD86IGFueSB9LFxyXG4pID0+IHtcclxuICBldmVudC5yZXBseShnZXRSZXBseUNoYW5uZWwoY2hhbm5lbCksIHtcclxuICAgIHN1Y2Nlc3M6IHRydWUsXHJcbiAgICBtc2c6IHBheWxvYWQ/Lm1zZyA/PyAnJyxcclxuICAgIHBheWxvYWQ6IHBheWxvYWQ/LnBheWxvYWQgPz8gdW5kZWZpbmVkLFxyXG4gIH0gYXMgSXBjSW52b2tlUmV0dXJuKTtcclxufTtcclxuXHJcbi8qKiBTZW5kcyBhIGZhaWx1cmUgb2JqZWN0IHRvIHRoZSBzYW1lIHJlbmRlcmVyIGZyYW1lIHRoYXQgc2VudCB0aGUgb3JpZ2luYWwgcmVxdWVzdFxyXG4gKlxyXG4gKiBSZXF1aXJlcyBhIGAqLXJlcGx5YCBjaGFubmVsIHRoYXQgaXMgbGlzdGVuaW5nLFxyXG4gKlxyXG4gKiBQcm92aWRlZCBjaGFubmVsIGlzIGF1dG9tYXRpY2FsbHkgY29udmVydGVkIGludG8gYSBgKi1yZXBseWAgY2hhbm5lbFxyXG4gKlxyXG4gKiBVc2VkIGluIGlwY01haW4ub24oKSBsaXN0ZW5lcnNcclxuICpcclxuICogVXNlZnVsIGlmIHlvdSB3YW50IHNvbWUgY29tcG9uZW50IHRvIHJ1biBjb2RlIGFmdGVyIGEgZmFpbHVyZSBmb3IgYSBzcGVjaWZpYyBjaGFubmVsXHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgcmVwbHlGYWlsdXJlID0gKFxyXG4gIGV2ZW50OiBJcGNNYWluRXZlbnQsXHJcbiAgY2hhbm5lbDogSXBjQ2hhbm5lbHMsXHJcbiAgcGF5bG9hZD86IHsgbXNnPzogc3RyaW5nOyBwYXlsb2FkPzogYW55IH0sXHJcbikgPT4ge1xyXG4gIGNvbnNvbGUubG9nKFxyXG4gICAgYE9vcHMsIHRoZXJlIHdhcyBhbiBlcnJvciBvbiBjaGFubmVsOiAke2NoYW5uZWx9JHtcclxuICAgICAgcGF5bG9hZD8ubXNnICYmIGBcXG4tPk1lc3NhZ2U6XFxuJHtwYXlsb2FkLm1zZ31gXHJcbiAgICB9ICR7cGF5bG9hZD8ucGF5bG9hZCAmJiBgXFxuLT4gUGF5bG9hZDpcXG4gJHtwYXlsb2FkLnBheWxvYWR9YH1cXG5gLFxyXG4gICk7XHJcbiAgZXZlbnQucmVwbHkoZ2V0UmVwbHlDaGFubmVsKGNoYW5uZWwpLCB7XHJcbiAgICBzdWNjZXNzOiBmYWxzZSxcclxuICAgIG1zZzogcGF5bG9hZD8ubXNnID8/ICcnLFxyXG4gICAgcGF5bG9hZDogcGF5bG9hZD8ucGF5bG9hZCA/PyB1bmRlZmluZWQsXHJcbiAgfSBhcyBJcGNJbnZva2VFcnJvclJldHVybik7XHJcbn07XHJcblxyXG4vKiogUmV0dXJucyBhIGZhaWx1cmUgb2JqZWN0IHRvIHRoZSBpcGMgdGhhdCBjYWxsZWQgdGhlIGludm9rZVxyXG4gKlxyXG4gKiBTdWl0ZWQgZm9yIGlwY01haW4uaGFuZGxlKCkgbGlzdGVuZXJzXHJcbiAqXHJcbiAqIEBwYXJhbSBlcnJvciBTdHJpbmdpZmllZCBFcnJvciBvYmplY3QgKG1vc3QgbGlrZWx5IGZyb20gY2F0Y2ggc3RhdGVtZW50KVxyXG4gKiBAcGFyYW0gbXNnIEN1c3RvbSBlcnJvciBtZXNzYWdlXHJcbiAqIEByZXR1cm5zIFN0YW5kYXJkIGludm9rZSByZXR1cm4gb2JqZWN0OyB7c3VjY2VzczogYm9vbGVhbiwgbXNnOiBzdHJpbmcsIHBheWxvYWQ6IHN0cmluZ31cclxuICovXHJcbmV4cG9ydCBjb25zdCByZXR1cm5JcGNJbnZva2VFcnJvciA9IChcclxuICBlcnJvcjogYW55LFxyXG4gIG1zZzogc3RyaW5nID0gJ0Vycm9yJyxcclxuKTogSXBjSW52b2tlRXJyb3JSZXR1cm4gPT4ge1xyXG4gIGNvbnN0IGVycm9yU3RyID0gc3RyaW5naWZ5RXJyb3IoZXJyb3IpO1xyXG4gIHJldHVybiB7XHJcbiAgICBzdWNjZXNzOiBmYWxzZSxcclxuICAgIG1zZyxcclxuICAgIHBheWxvYWQ6IGVycm9yU3RyID8/ICcnLFxyXG4gIH07XHJcbn07XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnlFcnJvcihlcnJvcjogYW55KTogc3RyaW5nIHtcclxuICBsZXQgZXJyb3JTdHI6IHN0cmluZyA9ICcnO1xyXG5cclxuICBpZiAodHlwZW9mIGVycm9yID09PSAnc3RyaW5nJykge1xyXG4gICAgZXJyb3JTdHIgPSBlcnJvcjtcclxuICB9IGVsc2UgaWYgKGVycm9yPy5yZXNwb25zZT8uZGF0YSkge1xyXG4gICAgZXJyb3JTdHIgPSBKU09OLnN0cmluZ2lmeShlcnJvci5yZXNwb25zZS5kYXRhKTtcclxuICB9IGVsc2UgaWYgKGVycm9yPy5tZXNzYWdlIHx8IGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcclxuICAgIGVycm9yU3RyID0gZXJyb3IubWVzc2FnZTtcclxuICB9IGVsc2Uge1xyXG4gICAgZXJyb3JTdHIgPSBKU09OLnN0cmluZ2lmeShlcnJvcik7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZXJyb3JTdHI7XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29yZUVsZWN0cm9uU3RvcmUgfSBmcm9tICcuL2NvcmVFbGVjdHJvblN0b3JlJztcclxuaW1wb3J0IHsgR2VuZXJpY0Z1bmN0aW9uIH0gZnJvbSAnLi9nZW5lcmljJztcclxuXHJcbmV4cG9ydCB0eXBlIFNldFN0b3JlVmFsdWVQYXlsb2FkID0ge1xyXG4gIGtleToga2V5b2YgQ29yZUVsZWN0cm9uU3RvcmU7XHJcbiAgc3RhdGU6IENvcmVFbGVjdHJvblN0b3JlW2tleW9mIENvcmVFbGVjdHJvblN0b3JlXTtcclxufTtcclxuXHJcbmV4cG9ydCBlbnVtIElwY0NoYW5uZWxzIHtcclxuICBjbG9zZUFwcCA9ICdjbG9zZS1hcHAnLFxyXG4gIG1pbmltaXplQXBwID0gJ21pbmltaXplLWFwcCcsXHJcbiAgbWF4aW1pemVBcHAgPSAnbWF4aW1pemUtYXBwJyxcclxuICBpc0FwcE1heGltaXplZCA9ICdpcy1hcHAtbWF4aW1pemVkJyxcclxuICByZXN0YXJ0QXBwID0gJ3Jlc3RhcnQtYXBwJyxcclxuICBjbGVhclN0b3JlID0gJ2NsZWFyLXN0b3JlJyxcclxuICBjaGVja0ZvclVwZGF0ZXMgPSAnY2hlY2stZm9yLXVwZGF0ZXMnLFxyXG4gIHRvZ2dsZURldlRvb2xzID0gJ3RvZ2dsZS1kZXYtdG9vbHMnLFxyXG5cclxuICB0b2dnbGVSZW5kZXJlckVycm9yRGlhbG9nID0gJ3RvZ2dsZS1yZW5kZXJlci1lcnJvci1kaWFsb2cnLFxyXG5cclxuICBleHBvcnRTdG9yZURhdGEgPSAnZXhwb3J0LXN0b3JlLWRhdGEnLFxyXG4gIGltcG9ydFN0b3JlRGF0YSA9ICdpbXBvcnQtc3RvcmUtZGF0YScsXHJcbiAgbG9hZFN0b3JlRGF0YSA9ICdsb2FkLXN0b3JlLWRhdGEnLFxyXG5cclxuICBzZXRTdG9yZVZhbHVlID0gJ3NldC1zdG9yZS12YWx1ZScsXHJcbiAgZ2V0U3RvcmVWYWx1ZSA9ICdnZXQtc3RvcmUtdmFsdWUnLFxyXG5cclxuICB0b2dnbGVFeGFtcGxlVmlzaWJpbGl0eSA9ICd0b2dnbGUtZXhhbXBsZS12aXNpYmlsaXR5JyxcclxufVxyXG5cclxuLyoqIFR5cGVzYWZlOiBFeHBlY3RlZCBwYXlsb2FkIElOUFVUIGZvciBpcGNDaGFubmVscyAqL1xyXG5leHBvcnQgdHlwZSBJcGNQYXlsb2FkSW5wdXRMb29rdXAgPSB7XHJcbiAgW0lwY0NoYW5uZWxzLnNldFN0b3JlVmFsdWVdOiBTZXRTdG9yZVZhbHVlUGF5bG9hZDtcclxuICBbSXBjQ2hhbm5lbHMuZ2V0U3RvcmVWYWx1ZV06IGtleW9mIENvcmVFbGVjdHJvblN0b3JlO1xyXG4gIFtJcGNDaGFubmVscy50b2dnbGVFeGFtcGxlVmlzaWJpbGl0eV06IGJvb2xlYW4gfCB1bmRlZmluZWQ7XHJcbn07XHJcblxyXG4vKiogVHlwZXNhZmU6IEV4cGVjdGVkIHBheWxvYWQgUkVUVVJOIGZvciBpcGNDaGFubmVscyAqL1xyXG5leHBvcnQgdHlwZSBJcGNQYXlsb2FkT3V0cHV0TG9va3VwID0ge1xyXG4gIFtJcGNDaGFubmVscy5pc0FwcE1heGltaXplZF06IGJvb2xlYW47XHJcbiAgW0lwY0NoYW5uZWxzLmdldFN0b3JlVmFsdWVdOiBDb3JlRWxlY3Ryb25TdG9yZVtrZXlvZiBDb3JlRWxlY3Ryb25TdG9yZV07XHJcbiAgW0lwY0NoYW5uZWxzLnRvZ2dsZUV4YW1wbGVWaXNpYmlsaXR5XTogYm9vbGVhbjtcclxufTtcclxuXHJcbi8qKiBUeXBlc2FmZTogU3BlY2lhbCBleHBlY3RlZCBwYXlsb2FkIFJFVFVSTiwgc3BlY2lmaWNhbGx5IGZvciBpcGNNYWluLmhhbmRsZSBpcGNDaGFubmVsc1xyXG4gKlxyXG4gKiBUaGlzIG92ZXJyaWRlcyByZXR1cm4gZnJvbSBJcGNFeHBlY3RlZFJldHVybkxvb2t1cFxyXG4gKi9cclxuZXhwb3J0IHR5cGUgSXBjTWFpblBheWxvYWRPdXRwdXRMb29rdXAgPSB7XHJcbiAgW0lwY0NoYW5uZWxzLnNldFN0b3JlVmFsdWVdOiBDb3JlRWxlY3Ryb25TdG9yZVtrZXlvZiBDb3JlRWxlY3Ryb25TdG9yZV07XHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBJcGNSZXR1cm5Gb3JtYXQ8UCA9IGFueT4gPSB7XHJcbiAgc3VjY2VzczogYm9vbGVhbjtcclxuICBtc2c/OiBzdHJpbmc7XHJcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XHJcbiAgcGF5bG9hZDogUDtcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIElwY0Vycm9yUmV0dXJuRm9ybWF0PFAgPSBhbnk+ID0ge1xyXG4gIHN1Y2Nlc3M6IGZhbHNlO1xyXG4gIG1zZzogc3RyaW5nO1xyXG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xyXG4gIHBheWxvYWQ/OiBQO1xyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgSXBjU2VuZFBheWxvYWRPdXRwdXQ8XHJcbiAgVCBleHRlbmRzIElwY0NoYW5uZWxzLFxyXG4gIFAgPSB1bmRlZmluZWQsXHJcbj4gPSBUIGV4dGVuZHMga2V5b2YgSXBjUGF5bG9hZE91dHB1dExvb2t1cCA/IElwY1BheWxvYWRPdXRwdXRMb29rdXBbVF0gOiBQO1xyXG5cclxuZXhwb3J0IHR5cGUgSXBjTWFpblBheWxvYWRPdXRwdXQ8XHJcbiAgVCBleHRlbmRzIElwY0NoYW5uZWxzLFxyXG4gIFAgPSB1bmRlZmluZWQsXHJcbj4gPSBUIGV4dGVuZHMga2V5b2YgSXBjTWFpblBheWxvYWRPdXRwdXRMb29rdXBcclxuICA/IElwY01haW5QYXlsb2FkT3V0cHV0TG9va3VwW1RdXHJcbiAgOiBQO1xyXG5cclxuZXhwb3J0IHR5cGUgSXBjUGF5bG9hZE91dHB1dDxcclxuICBUIGV4dGVuZHMgSXBjQ2hhbm5lbHMsXHJcbiAgUCA9IHVuZGVmaW5lZCxcclxuPiA9IFQgZXh0ZW5kcyBrZXlvZiBJcGNNYWluUGF5bG9hZE91dHB1dExvb2t1cFxyXG4gID8gSXBjTWFpblBheWxvYWRPdXRwdXRMb29rdXBbVF1cclxuICA6IElwY1NlbmRQYXlsb2FkT3V0cHV0PFQsIFA+O1xyXG5cclxuZXhwb3J0IHR5cGUgSXBjSW52b2tlUmV0dXJuPFQgZXh0ZW5kcyBJcGNDaGFubmVscz4gPVxyXG4gIHwgSXBjUmV0dXJuRm9ybWF0PElwY1BheWxvYWRPdXRwdXQ8VD4+XHJcbiAgfCBJcGNFcnJvclJldHVybkZvcm1hdDtcclxuXHJcbmV4cG9ydCB0eXBlIElwY1JldHVybjxUIGV4dGVuZHMgSXBjQ2hhbm5lbHM+ID0gSXBjUmV0dXJuRm9ybWF0PFxyXG4gIElwY1BheWxvYWRPdXRwdXQ8VD5cclxuPjtcclxuXHJcbmV4cG9ydCB0eXBlIElwY1NlbmRSZXR1cm48VCBleHRlbmRzIElwY0NoYW5uZWxzPiA9IElwY1JldHVybkZvcm1hdDxcclxuICBJcGNTZW5kUGF5bG9hZE91dHB1dDxUPlxyXG4+O1xyXG5cclxuZXhwb3J0IHR5cGUgSXBjRXhwZWN0ZWRJbnB1dDxUIGV4dGVuZHMgSXBjQ2hhbm5lbHM+ID1cclxuICBUIGV4dGVuZHMga2V5b2YgSXBjUGF5bG9hZElucHV0TG9va3VwID8gSXBjUGF5bG9hZElucHV0TG9va3VwW1RdIDogdW5kZWZpbmVkO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJX0lwY0FwaSB7XHJcbiAgLyoqXHJcbiAgICogQXR0YWNoZXMgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIHNwZWNpZmllZCBJUEMgY2hhbm5lbC5cclxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2hhbm5lbCAtIFRoZSBJUEMgY2hhbm5lbCB0byBsaXN0ZW4gb24uXHJcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuYyAtIFRoZSBmdW5jdGlvbiB0byBiZSBleGVjdXRlZCB3aGVuIHRoZSBldmVudCBvY2N1cnMuXHJcbiAgICovXHJcbiAgb24oY2hhbm5lbDogc3RyaW5nLCBjYWxsYmFjazogR2VuZXJpY0Z1bmN0aW9uKTogdm9pZDtcclxuICAvKipcclxuICAgKiBSZW1vdmVzIGFuIGV2ZW50IGxpc3RlbmVyIGZyb20gdGhlIHNwZWNpZmllZCBJUEMgY2hhbm5lbC5cclxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2hhbm5lbCAtIFRoZSBJUEMgY2hhbm5lbCB0byByZW1vdmUgdGhlIGxpc3RlbmVyIGZyb20uXHJcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuYyAtIFRoZSBmdW5jdGlvbiB0byBiZSByZW1vdmVkIGZyb20gdGhlIGxpc3RlbmVycy5cclxuICAgKi9cclxuICByZW1vdmVMaXN0ZW5lcihjaGFubmVsOiBzdHJpbmcsIGNhbGxiYWNrOiBHZW5lcmljRnVuY3Rpb24pOiB2b2lkO1xyXG4gIC8qKlxyXG4gICAqIFJlbW92ZXMgYWxsIGV2ZW50IGxpc3RlbmVycyBmcm9tIHRoZSBzcGVjaWZpZWQgSVBDIGNoYW5uZWwuXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNoYW5uZWwgLSBUaGUgSVBDIGNoYW5uZWwgdG8gcmVtb3ZlIHRoZSBsaXN0ZW5lciBmcm9tLlxyXG4gICAqL1xyXG4gIHJlbW92ZUFsbExpc3RlbmVycyhjaGFubmVsOiBzdHJpbmcpOiB2b2lkO1xyXG4gIC8qKlxyXG4gICAqIFNlbmRzIGEgbWVzc2FnZSB0byB0aGUgc3BlY2lmaWVkIElQQyBjaGFubmVsLlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjaGFubmVsIC0gVGhlIElQQyBjaGFubmVsIHRvIHNlbmQgdGhlIG1lc3NhZ2UgdG8uXHJcbiAgICogQHBhcmFtIHthbnl9IHBheWxvYWQgLSBUaGUgZGF0YSB0byBiZSBzZW50IHdpdGggdGhlIG1lc3NhZ2UuXHJcbiAgICovXHJcbiAgc2VuZDxUIGV4dGVuZHMgSXBjQ2hhbm5lbHM+KFxyXG4gICAgLi4uYXJnczogVCBleHRlbmRzIGtleW9mIElwY1BheWxvYWRJbnB1dExvb2t1cFxyXG4gICAgICA/IFtjaGFubmVsOiBULCBwYXlsb2FkOiBJcGNFeHBlY3RlZElucHV0PFQ+XVxyXG4gICAgICA6IFtjaGFubmVsOiBUXVxyXG4gICk6IHZvaWQ7XHJcbiAgLyoqXHJcbiAgICogU2VuZHMgYSBtZXNzYWdlIHRvIHRoZSBzcGVjaWZpZWQgSVBDIGNoYW5uZWwgYW5kIGJhY2sgdG8gcmVuZGVyZXJcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2hhbm5lbCAtIFRoZSBJUEMgY2hhbm5lbCB0byBzZW5kIHRoZSBtZXNzYWdlIHRvLlxyXG4gICAqIEBwYXJhbSB7YW55fSBwYXlsb2FkIC0gVGhlIGRhdGEgdG8gYmUgc2VudCB3aXRoIHRoZSBtZXNzYWdlLlxyXG4gICAqL1xyXG4gIGludm9rZTxUIGV4dGVuZHMgSXBjQ2hhbm5lbHM+KFxyXG4gICAgLi4uYXJnczogVCBleHRlbmRzIGtleW9mIElwY1BheWxvYWRJbnB1dExvb2t1cFxyXG4gICAgICA/IFtjaGFubmVsOiBULCBwYXlsb2FkOiBJcGNFeHBlY3RlZElucHV0PFQ+XVxyXG4gICAgICA6IFtjaGFubmVsOiBUXVxyXG4gICk6IFByb21pc2U8SXBjSW52b2tlUmV0dXJuPFQ+PjtcclxufVxyXG4iLCJpbXBvcnQgeyBJcGNDaGFubmVscyB9IGZyb20gJy4uL3R5cGVzL2lwYyc7XHJcbmltcG9ydCB7IGdldFJlcGx5Q2hhbm5lbCB9IGZyb20gJy4vZ2V0UmVwbHlDaGFubmVsJztcclxuXHJcbmV4cG9ydCBjb25zdCBiYXNlVmFsaWRDaGFubmVsczogSXBjQ2hhbm5lbHNbXSA9IE9iamVjdC52YWx1ZXMoSXBjQ2hhbm5lbHMpO1xyXG5leHBvcnQgY29uc3QgcmVwbHlWYWxpZENoYW5uZWxzID0gYmFzZVZhbGlkQ2hhbm5lbHMubWFwKGdldFJlcGx5Q2hhbm5lbCk7XHJcbmV4cG9ydCBjb25zdCB2YWxpZENoYW5uZWxzID0gWy4uLmJhc2VWYWxpZENoYW5uZWxzLCAuLi5yZXBseVZhbGlkQ2hhbm5lbHNdO1xyXG4iLCJpbXBvcnQgeyBJcGNDaGFubmVscyB9IGZyb20gJ3NoYXJlZC90eXBlcy9pcGMnO1xyXG5cclxuLyoqIENvbnZlcnRzIGJhc2UgY2hhbm5lbHMgdG8gYSBgKi1yZXBseWAgY2hhbm5lbCAqL1xyXG5leHBvcnQgY29uc3QgZ2V0UmVwbHlDaGFubmVsID0gKGNoYW5uZWw6IElwY0NoYW5uZWxzKSA9PiBgJHtjaGFubmVsfS1yZXBseWA7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVsZWN0cm9uXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBjb250ZXh0QnJpZGdlIH0gZnJvbSAnZWxlY3Ryb24nO1xyXG5cclxuaW1wb3J0IHsgaXBjQXBpIH0gZnJvbSAnLi9icmlkZ2VzL2lwY1JlbmRlcmVyJztcclxuaW1wb3J0IHsgSV9FbGVjdHJvbkFwaSB9IGZyb20gJy4uL3NoYXJlZC90eXBlcy93aW5kb3cnO1xyXG5cclxuY29uc3QgZWxlY3Ryb25BcGk6IElfRWxlY3Ryb25BcGkgPSB7XHJcbiAgaXBjOiBpcGNBcGksXHJcbn07XHJcblxyXG5jb250ZXh0QnJpZGdlLmV4cG9zZUluTWFpbldvcmxkKCdlbGVjdHJvbicsIGVsZWN0cm9uQXBpKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
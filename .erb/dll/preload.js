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
/* harmony import */ var _shared_utils_stringifyObj__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/utils/stringifyObj */ "./src/shared/utils/stringifyObj.ts");


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
    const errorStr = (0,_shared_utils_stringifyObj__WEBPACK_IMPORTED_MODULE_1__.stringifyObj)(error);
    return {
        success: false,
        msg,
        payload: errorStr ?? '',
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
    IpcChannels["isAppMaximized"] = "is-app-maximized";
    IpcChannels["restartApp"] = "restart-app";
    IpcChannels["clearStore"] = "clear-store";
    IpcChannels["toggleDevTools"] = "toggle-dev-tools";
    IpcChannels["checkForUpdates"] = "check-for-updates";
    IpcChannels["quitAndInstallUpdates"] = "quit-and-install-updates";
    IpcChannels["appUpdateInfo"] = "app-update-info";
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

/***/ "./src/shared/utils/stringifyObj.ts":
/*!******************************************!*\
  !*** ./src/shared/utils/stringifyObj.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   stringifyObj: () => (/* binding */ stringifyObj)
/* harmony export */ });
function stringifyObj(obj) {
    if (typeof obj === 'string')
        return obj;
    if (obj?.response?.data)
        return JSON.stringify(obj.response.data);
    if (obj?.message)
        return obj.message;
    return JSON.stringify(obj);
}


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTnlDO0FBRU07QUFHL0MsTUFBTSxXQUFXLEdBQWtCO0lBQ2pDLEdBQUcsRUFBRSx3REFBTTtDQUNaLENBQUM7QUFFRixtREFBYSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4vYnJpZGdlcy9pcGNSZW5kZXJlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi9saXN0ZW5lcnMvdXRpbC9pcGNSZXBsaWVzLnRzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvdHlwZXMvaXBjLnRzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvdXRpbHMvY2hhbm5lbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC91dGlscy9nZXRSZXBseUNoYW5uZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC91dGlscy9zdHJpbmdpZnlPYmoudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJlbGVjdHJvblwiIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi9wcmVsb2FkLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KShnbG9iYWwsICgpID0+IHtcbnJldHVybiAiLCIvKipcbiAqXG4gKiBUaGlzIGZpbGUgY29udGFpbnMgdGhlIHR5cGVzYWZlIGlwY1JlbmRlcmVyIGxvZ2ljIHRoYXQgaXMgdXNlZCBvbiBjbGllbnQvcmVuZGVyZXIgc2lkZSB0byBiZSBzZW50IHRvIG1haW5cbiAqXG4gKi9cblxuaW1wb3J0IHsgaXBjUmVuZGVyZXIsIElwY1JlbmRlcmVyRXZlbnQgfSBmcm9tICdlbGVjdHJvbic7XG5pbXBvcnQge1xuICBJX0lwY0FwaSxcbiAgSXBjQ2hhbm5lbHMsXG4gIElwY1BheWxvYWRJbnB1dExvb2t1cCxcbiAgSXBjRXhwZWN0ZWRQYXlsb2FkUmV0dXJuLFxuICBJcGNJbnB1dENvbmRpdGlvbmFsLFxuICBJcGNJbnZva2VSZXR1cm4sXG4gIElwY1JldHVybixcbn0gZnJvbSAnLi4vLi4vc2hhcmVkL3R5cGVzL2lwYyc7XG5pbXBvcnQgeyB2YWxpZENoYW5uZWxzIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3V0aWxzL2NoYW5uZWxzJztcbmltcG9ydCB7IHJldHVybklwY0ludm9rZUVycm9yIH0gZnJvbSAnLi4vbGlzdGVuZXJzL3V0aWwvaXBjUmVwbGllcyc7XG5cbi8qKlxuICogQXR0YWNoZXMgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIHNwZWNpZmllZCBJUEMgY2hhbm5lbC5cbiAqIEBwYXJhbSBjaGFubmVsIC0gVGhlIElQQyBjaGFubmVsIHRvIGxpc3RlbiBvbi5cbiAqIEBwYXJhbSBjYWxsYmFjayAtIFRoZSBmdW5jdGlvbiB0byBiZSBleGVjdXRlZCB3aGVuIHRoZSBldmVudCBvY2N1cnMuXG4gKi9cbmNvbnN0IG9uID0gKFxuICBjaGFubmVsOiBJcGNDaGFubmVscyxcbiAgY2FsbGJhY2s6IChldmVudDogSXBjUmVuZGVyZXJFdmVudCwgLi4uYXJnczogYW55W10pID0+IHZvaWQsXG4pOiB2b2lkID0+IHtcbiAgaWYgKHZhbGlkQ2hhbm5lbHMuaW5jbHVkZXMoY2hhbm5lbCkpXG4gICAgaXBjUmVuZGVyZXIub24oY2hhbm5lbCwgKF8sIC4uLmFyZ3MpID0+IGNhbGxiYWNrKF8sIC4uLmFyZ3MpKTtcbn07XG5cbi8qKlxuICogUmVtb3ZlcyBhbiBldmVudCBsaXN0ZW5lciBmcm9tIHRoZSBzcGVjaWZpZWQgSVBDIGNoYW5uZWwuXG4gKiBAcGFyYW0gY2hhbm5lbCAtIFRoZSBJUEMgY2hhbm5lbCB0byByZW1vdmUgdGhlIGxpc3RlbmVyIGZyb20uXG4gKiBAcGFyYW0gY2FsbGJhY2sgLSBUaGUgZnVuY3Rpb24gdG8gYmUgcmVtb3ZlZCBmcm9tIHRoZSBsaXN0ZW5lcnMuXG4gKi9cbmNvbnN0IHJlbW92ZUxpc3RlbmVyID0gKFxuICBjaGFubmVsOiBJcGNDaGFubmVscyxcbiAgY2FsbGJhY2s6IChldmVudDogSXBjUmVuZGVyZXJFdmVudCwgLi4uYXJnczogYW55W10pID0+IHZvaWQsXG4pOiB2b2lkID0+IHtcbiAgaWYgKHZhbGlkQ2hhbm5lbHMuaW5jbHVkZXMoY2hhbm5lbCkpXG4gICAgaXBjUmVuZGVyZXIucmVtb3ZlTGlzdGVuZXIoY2hhbm5lbCwgKF8sIC4uLmFyZ3MpID0+IGNhbGxiYWNrKF8sIC4uLmFyZ3MpKTtcbn07XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwgZXZlbnQgbGlzdGVuZXJzIGZyb20gdGhlIHNwZWNpZmllZCBJUEMgY2hhbm5lbC5cbiAqIEBwYXJhbSBjaGFubmVsIC0gVGhlIElQQyBjaGFubmVsIHRvIHJlbW92ZSB0aGUgbGlzdGVuZXIgZnJvbS5cbiAqL1xuY29uc3QgcmVtb3ZlQWxsTGlzdGVuZXJzID0gKGNoYW5uZWw6IElwY0NoYW5uZWxzKTogdm9pZCA9PiB7XG4gIGlmICh2YWxpZENoYW5uZWxzLmluY2x1ZGVzKGNoYW5uZWwpKSBpcGNSZW5kZXJlci5yZW1vdmVBbGxMaXN0ZW5lcnMoY2hhbm5lbCk7XG59O1xuXG4vKipcbiAqIFR5cGVzYWZlIElQQyBtZXRob2QgdGhhdCBzZW5kcyBhIGBzZW5kYCBtZXNzYWdlIHRvIHRoZSBzcGVjaWZpZWQgSVBDIGNoYW5uZWwuXG4gKiBAcGFyYW0gY2hhbm5lbCAtIFRoZSBJUEMgY2hhbm5lbCB0byBzZW5kIHRoZSBtZXNzYWdlIHRvLlxuICogQHBhcmFtIHBheWxvYWQgLSBUaGUgZGF0YSB0byBiZSBzZW50IHdpdGggdGhlIG1lc3NhZ2UuXG4gKi9cbmNvbnN0IHNlbmQgPSA8VCBleHRlbmRzIElwY0NoYW5uZWxzPihcbiAgY2hhbm5lbDogVCxcbiAgcGF5bG9hZD86IElwY0lucHV0Q29uZGl0aW9uYWw8VD4sXG4pOiB2b2lkID0+IHtcbiAgaWYgKHZhbGlkQ2hhbm5lbHMuaW5jbHVkZXMoY2hhbm5lbCkpIGlwY1JlbmRlcmVyLnNlbmQoY2hhbm5lbCwgcGF5bG9hZCk7XG59O1xuXG4vKipcbiAqIFR5cGVzYWZlIElQQyBtZXRob2QgdGhhdCBzZW5kcyBhbiBgaW52b2tlYCBtZXNzYWdlIHRvIHRoZSBzcGVjaWZpZWQgSVBDIGNoYW5uZWwgYW5kIHJldHVybnMgYSByZXNwb25zZSBiYWNrICh0byB0aGUgcmVuZGVyZXIpXG4gKiBAcGFyYW0gY2hhbm5lbCAtIFRoZSBJUEMgY2hhbm5lbCB0byBzZW5kIHRoZSBtZXNzYWdlIHRvLlxuICogQHBhcmFtIHBheWxvYWQgLSBUaGUgZGF0YSB0byBiZSBzZW50IHdpdGggdGhlIG1lc3NhZ2UuXG4gKi9cbmNvbnN0IGludm9rZSA9IDxUIGV4dGVuZHMgSXBjQ2hhbm5lbHM+KFxuICAuLi5hcmdzOiBUIGV4dGVuZHMga2V5b2YgSXBjUGF5bG9hZElucHV0TG9va3VwXG4gICAgPyBbY2hhbm5lbDogVCwgcGF5bG9hZD86IElwY0lucHV0Q29uZGl0aW9uYWw8VD5dXG4gICAgOiBbY2hhbm5lbDogVF1cbik6IFByb21pc2U8SXBjUmV0dXJuPFQ+PiA9PlxuICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgW2NoYW5uZWwsIHBheWxvYWRdID0gYXJncztcbiAgICBpZiAodmFsaWRDaGFubmVscy5pbmNsdWRlcyhjaGFubmVsKSkge1xuICAgICAgaXBjUmVuZGVyZXJcbiAgICAgICAgLmludm9rZShjaGFubmVsLCBwYXlsb2FkKVxuICAgICAgICAudGhlbigocmVzdWx0OiBJcGNJbnZva2VSZXR1cm48SXBjRXhwZWN0ZWRQYXlsb2FkUmV0dXJuPFQ+PikgPT5cbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCksXG4gICAgICAgIClcbiAgICAgICAgLmNhdGNoKChlcnJvcjogdW5rbm93bikgPT5cbiAgICAgICAgICByZWplY3QocmV0dXJuSXBjSW52b2tlRXJyb3IoZXJyb3IsICdFcnJvciBpbiBpbnZva2UnKSksXG4gICAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlamVjdChyZXR1cm5JcGNJbnZva2VFcnJvcihjaGFubmVsLCAnSW52YWxpZCBDaGFubmVsJykpO1xuICAgIH1cbiAgfSk7XG5cbmV4cG9ydCBjb25zdCBpcGNBcGk6IElfSXBjQXBpID0ge1xuICBvbixcbiAgcmVtb3ZlTGlzdGVuZXIsXG4gIHJlbW92ZUFsbExpc3RlbmVycyxcbiAgc2VuZCxcbiAgaW52b2tlLFxufTtcbiIsImltcG9ydCB7IElwY01haW5FdmVudCB9IGZyb20gJ2VsZWN0cm9uJztcbmltcG9ydCB7XG4gIElwY0NoYW5uZWxzLFxuICBJcGNJbnZva2VFcnJvclJldHVybixcbiAgSXBjSW52b2tlUmV0dXJuLFxufSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvdHlwZXMvaXBjJztcbmltcG9ydCB7IGdldFJlcGx5Q2hhbm5lbCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC91dGlscy9nZXRSZXBseUNoYW5uZWwnO1xuaW1wb3J0IHsgc3RyaW5naWZ5T2JqIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3V0aWxzL3N0cmluZ2lmeU9iaic7XG5cbi8qKiBTZW5kcyBhIHN1Y2Nlc3Mgb2JqZWN0IHRvIHRoZSBzYW1lIHJlbmRlcmVyIGZyYW1lIHRoYXQgc2VudCB0aGUgb3JpZ2luYWwgcmVxdWVzdFxuICpcbiAqIFJlcXVpcmVzIGEgYCotcmVwbHlgIGNoYW5uZWwgdGhhdCBpcyBsaXN0ZW5pbmdcbiAqXG4gKiBQcm92aWRlZCBjaGFubmVsIGlzIGF1dG9tYXRpY2FsbHkgY29udmVydGVkIGludG8gYSBgKi1yZXBseWAgY2hhbm5lbFxuICpcbiAqIFVzZWQgaW4gaXBjTWFpbi5vbigpIGxpc3RlbmVyc1xuICpcbiAqIFVzZWZ1bCBpZiB5b3Ugd2FudCBzb21lIGNvbXBvbmVudCB0byBydW4gY29kZSBhZnRlciBhIHN1Y2Nlc3MgZm9yIGEgc3BlY2lmaWMgY2hhbm5lbFxuICovXG5leHBvcnQgY29uc3QgcmVwbHlTdWNjZXNzID0gKFxuICBldmVudDogSXBjTWFpbkV2ZW50LFxuICBjaGFubmVsOiBJcGNDaGFubmVscyxcbiAgcGF5bG9hZD86IHsgbXNnPzogc3RyaW5nOyBwYXlsb2FkPzogYW55IH0sXG4pID0+IHtcbiAgZXZlbnQucmVwbHkoZ2V0UmVwbHlDaGFubmVsKGNoYW5uZWwpLCB7XG4gICAgc3VjY2VzczogdHJ1ZSxcbiAgICBtc2c6IHBheWxvYWQ/Lm1zZyA/PyAnJyxcbiAgICBwYXlsb2FkOiBwYXlsb2FkPy5wYXlsb2FkID8/IHVuZGVmaW5lZCxcbiAgfSBhcyBJcGNJbnZva2VSZXR1cm4pO1xufTtcblxuLyoqIFNlbmRzIGEgZmFpbHVyZSBvYmplY3QgdG8gdGhlIHNhbWUgcmVuZGVyZXIgZnJhbWUgdGhhdCBzZW50IHRoZSBvcmlnaW5hbCByZXF1ZXN0XG4gKlxuICogUmVxdWlyZXMgYSBgKi1yZXBseWAgY2hhbm5lbCB0aGF0IGlzIGxpc3RlbmluZyxcbiAqXG4gKiBQcm92aWRlZCBjaGFubmVsIGlzIGF1dG9tYXRpY2FsbHkgY29udmVydGVkIGludG8gYSBgKi1yZXBseWAgY2hhbm5lbFxuICpcbiAqIFVzZWQgaW4gaXBjTWFpbi5vbigpIGxpc3RlbmVyc1xuICpcbiAqIFVzZWZ1bCBpZiB5b3Ugd2FudCBzb21lIGNvbXBvbmVudCB0byBydW4gY29kZSBhZnRlciBhIGZhaWx1cmUgZm9yIGEgc3BlY2lmaWMgY2hhbm5lbFxuICpcbiAqL1xuZXhwb3J0IGNvbnN0IHJlcGx5RmFpbHVyZSA9IChcbiAgZXZlbnQ6IElwY01haW5FdmVudCxcbiAgY2hhbm5lbDogSXBjQ2hhbm5lbHMsXG4gIHBheWxvYWQ/OiB7IG1zZz86IHN0cmluZzsgcGF5bG9hZD86IGFueSB9LFxuKSA9PiB7XG4gIGNvbnNvbGUubG9nKFxuICAgIGBPb3BzLCB0aGVyZSB3YXMgYW4gZXJyb3Igb24gY2hhbm5lbDogJHtjaGFubmVsfSR7XG4gICAgICBwYXlsb2FkPy5tc2cgJiYgYFxcbi0+TWVzc2FnZTpcXG4ke3BheWxvYWQubXNnfWBcbiAgICB9ICR7cGF5bG9hZD8ucGF5bG9hZCAmJiBgXFxuLT4gUGF5bG9hZDpcXG4gJHtwYXlsb2FkLnBheWxvYWR9YH1cXG5gLFxuICApO1xuICBldmVudC5yZXBseShnZXRSZXBseUNoYW5uZWwoY2hhbm5lbCksIHtcbiAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICBtc2c6IHBheWxvYWQ/Lm1zZyA/PyAnJyxcbiAgICBwYXlsb2FkOiBwYXlsb2FkPy5wYXlsb2FkID8/IHVuZGVmaW5lZCxcbiAgfSBhcyBJcGNJbnZva2VFcnJvclJldHVybik7XG59O1xuXG4vKiogUmV0dXJucyBhIGZhaWx1cmUgb2JqZWN0IHRvIHRoZSBpcGMgdGhhdCBjYWxsZWQgdGhlIGludm9rZVxuICpcbiAqIFN1aXRlZCBmb3IgaXBjTWFpbi5oYW5kbGUoKSBsaXN0ZW5lcnNcbiAqXG4gKiBAcGFyYW0gZXJyb3IgU3RyaW5naWZpZWQgRXJyb3Igb2JqZWN0IChtb3N0IGxpa2VseSBmcm9tIGNhdGNoIHN0YXRlbWVudClcbiAqIEBwYXJhbSBtc2cgQ3VzdG9tIGVycm9yIG1lc3NhZ2VcbiAqIEByZXR1cm5zIFN0YW5kYXJkIGludm9rZSByZXR1cm4gb2JqZWN0OyB7c3VjY2VzczogYm9vbGVhbiwgbXNnOiBzdHJpbmcsIHBheWxvYWQ6IHN0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IHJldHVybklwY0ludm9rZUVycm9yID0gKFxuICBlcnJvcjogYW55LFxuICBtc2c6IHN0cmluZyA9ICdFcnJvcicsXG4pOiBJcGNJbnZva2VFcnJvclJldHVybiA9PiB7XG4gIGNvbnN0IGVycm9yU3RyID0gc3RyaW5naWZ5T2JqKGVycm9yKTtcbiAgcmV0dXJuIHtcbiAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICBtc2csXG4gICAgcGF5bG9hZDogZXJyb3JTdHIgPz8gJycsXG4gIH07XG59O1xuIiwiaW1wb3J0IHsgQ29yZUVsZWN0cm9uU3RvcmUgfSBmcm9tICcuL2NvcmVFbGVjdHJvblN0b3JlJztcbmltcG9ydCB7IEdlbmVyaWNGdW5jdGlvbiB9IGZyb20gJy4vZ2VuZXJpYyc7XG5cbmV4cG9ydCB0eXBlIFNldFN0b3JlVmFsdWVQYXlsb2FkID0ge1xuICBrZXk6IGtleW9mIENvcmVFbGVjdHJvblN0b3JlO1xuICBzdGF0ZTogQ29yZUVsZWN0cm9uU3RvcmVba2V5b2YgQ29yZUVsZWN0cm9uU3RvcmVdO1xufTtcblxuZXhwb3J0IGVudW0gSXBjQ2hhbm5lbHMge1xuICBjbG9zZUFwcCA9ICdjbG9zZS1hcHAnLFxuICBtaW5pbWl6ZUFwcCA9ICdtaW5pbWl6ZS1hcHAnLFxuICBtYXhpbWl6ZUFwcCA9ICdtYXhpbWl6ZS1hcHAnLFxuICBpc0FwcE1heGltaXplZCA9ICdpcy1hcHAtbWF4aW1pemVkJyxcbiAgcmVzdGFydEFwcCA9ICdyZXN0YXJ0LWFwcCcsXG4gIGNsZWFyU3RvcmUgPSAnY2xlYXItc3RvcmUnLFxuICB0b2dnbGVEZXZUb29scyA9ICd0b2dnbGUtZGV2LXRvb2xzJyxcbiAgY2hlY2tGb3JVcGRhdGVzID0gJ2NoZWNrLWZvci11cGRhdGVzJyxcbiAgcXVpdEFuZEluc3RhbGxVcGRhdGVzID0gJ3F1aXQtYW5kLWluc3RhbGwtdXBkYXRlcycsXG4gIGFwcFVwZGF0ZUluZm8gPSAnYXBwLXVwZGF0ZS1pbmZvJyxcblxuICB0b2dnbGVSZW5kZXJlckVycm9yRGlhbG9nID0gJ3RvZ2dsZS1yZW5kZXJlci1lcnJvci1kaWFsb2cnLFxuXG4gIGV4cG9ydFN0b3JlRGF0YSA9ICdleHBvcnQtc3RvcmUtZGF0YScsXG4gIGltcG9ydFN0b3JlRGF0YSA9ICdpbXBvcnQtc3RvcmUtZGF0YScsXG4gIGxvYWRTdG9yZURhdGEgPSAnbG9hZC1zdG9yZS1kYXRhJyxcblxuICBzZXRTdG9yZVZhbHVlID0gJ3NldC1zdG9yZS12YWx1ZScsXG4gIGdldFN0b3JlVmFsdWUgPSAnZ2V0LXN0b3JlLXZhbHVlJyxcblxuICB0b2dnbGVFeGFtcGxlVmlzaWJpbGl0eSA9ICd0b2dnbGUtZXhhbXBsZS12aXNpYmlsaXR5Jyxcbn1cblxuLyoqIFR5cGVzYWZlOiBFeHBlY3RlZCBwYXlsb2FkIElOUFVUIGZvciBpcGNDaGFubmVscyAqL1xuZXhwb3J0IHR5cGUgSXBjUGF5bG9hZElucHV0TG9va3VwID0ge1xuICBbSXBjQ2hhbm5lbHMuc2V0U3RvcmVWYWx1ZV06IFNldFN0b3JlVmFsdWVQYXlsb2FkO1xuICBbSXBjQ2hhbm5lbHMuZ2V0U3RvcmVWYWx1ZV06IGtleW9mIENvcmVFbGVjdHJvblN0b3JlO1xuICBbSXBjQ2hhbm5lbHMudG9nZ2xlRXhhbXBsZVZpc2liaWxpdHldOiBib29sZWFuIHwgdW5kZWZpbmVkO1xufTtcblxuLyoqIFR5cGVzYWZlOiBFeHBlY3RlZCBwYXlsb2FkIFJFVFVSTiBmb3IgaXBjQ2hhbm5lbHMgKi9cbmV4cG9ydCB0eXBlIElwY1BheWxvYWRPdXRwdXRMb29rdXAgPSB7XG4gIFtJcGNDaGFubmVscy5pc0FwcE1heGltaXplZF06IGJvb2xlYW47XG4gIFtJcGNDaGFubmVscy5nZXRTdG9yZVZhbHVlXTogQ29yZUVsZWN0cm9uU3RvcmVba2V5b2YgQ29yZUVsZWN0cm9uU3RvcmVdO1xuICBbSXBjQ2hhbm5lbHMudG9nZ2xlRXhhbXBsZVZpc2liaWxpdHldOiBib29sZWFuO1xufTtcblxuLyoqIFR5cGVzYWZlOiBTcGVjaWFsIGV4cGVjdGVkIHBheWxvYWQgUkVUVVJOLCBzcGVjaWZpY2FsbHkgZm9yIGlwY01haW4uaGFuZGxlIGlwY0NoYW5uZWxzXG4gKlxuICogVGhpcyBvdmVycmlkZXMgcmV0dXJuIGZyb20gSXBjRXhwZWN0ZWRSZXR1cm5Mb29rdXBcbiAqL1xuZXhwb3J0IHR5cGUgSXBjTWFpblBheWxvYWRPdXRwdXRMb29rdXAgPSB7XG4gIFtJcGNDaGFubmVscy5zZXRTdG9yZVZhbHVlXTogQ29yZUVsZWN0cm9uU3RvcmVba2V5b2YgQ29yZUVsZWN0cm9uU3RvcmVdO1xufTtcblxuZXhwb3J0IHR5cGUgSXBjUmV0dXJuRm9ybWF0PFAgPSBhbnk+ID0ge1xuICBzdWNjZXNzOiBib29sZWFuO1xuICBtc2c/OiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICBwYXlsb2FkPzogUDtcbn07XG5cbmV4cG9ydCB0eXBlIElwY0Vycm9yUmV0dXJuRm9ybWF0PFAgPSBhbnk+ID0ge1xuICBzdWNjZXNzOiBmYWxzZTtcbiAgbXNnOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICBwYXlsb2FkPzogUDtcbn07XG5cbmV4cG9ydCB0eXBlIElwY1NlbmRQYXlsb2FkT3V0cHV0PFxuICBUIGV4dGVuZHMgSXBjQ2hhbm5lbHMsXG4gIFAgPSB1bmRlZmluZWQsXG4+ID0gVCBleHRlbmRzIGtleW9mIElwY1BheWxvYWRPdXRwdXRMb29rdXAgPyBJcGNQYXlsb2FkT3V0cHV0TG9va3VwW1RdIDogUDtcblxuZXhwb3J0IHR5cGUgSXBjTWFpblBheWxvYWRPdXRwdXQ8XG4gIFQgZXh0ZW5kcyBJcGNDaGFubmVscyxcbiAgUCA9IHVuZGVmaW5lZCxcbj4gPSBUIGV4dGVuZHMga2V5b2YgSXBjTWFpblBheWxvYWRPdXRwdXRMb29rdXBcbiAgPyBJcGNNYWluUGF5bG9hZE91dHB1dExvb2t1cFtUXVxuICA6IFA7XG5cbmV4cG9ydCB0eXBlIElwY1BheWxvYWRPdXRwdXQ8XG4gIFQgZXh0ZW5kcyBJcGNDaGFubmVscyxcbiAgUCA9IHVuZGVmaW5lZCxcbj4gPSBUIGV4dGVuZHMga2V5b2YgSXBjTWFpblBheWxvYWRPdXRwdXRMb29rdXBcbiAgPyBJcGNNYWluUGF5bG9hZE91dHB1dExvb2t1cFtUXVxuICA6IElwY1NlbmRQYXlsb2FkT3V0cHV0PFQsIFA+O1xuXG5leHBvcnQgdHlwZSBJcGNJbnZva2VSZXR1cm48VCBleHRlbmRzIElwY0NoYW5uZWxzPiA9XG4gIHwgSXBjUmV0dXJuRm9ybWF0PElwY1BheWxvYWRPdXRwdXQ8VD4+XG4gIHwgSXBjRXJyb3JSZXR1cm5Gb3JtYXQ7XG5cbmV4cG9ydCB0eXBlIElwY1JldHVybjxUIGV4dGVuZHMgSXBjQ2hhbm5lbHM+ID0gSXBjUmV0dXJuRm9ybWF0PFxuICBJcGNQYXlsb2FkT3V0cHV0PFQ+XG4+O1xuXG5leHBvcnQgdHlwZSBJcGNTZW5kUmV0dXJuPFQgZXh0ZW5kcyBJcGNDaGFubmVscz4gPSBJcGNSZXR1cm5Gb3JtYXQ8XG4gIElwY1NlbmRQYXlsb2FkT3V0cHV0PFQ+XG4+O1xuXG5leHBvcnQgdHlwZSBJcGNFeHBlY3RlZElucHV0PFQgZXh0ZW5kcyBJcGNDaGFubmVscz4gPVxuICBUIGV4dGVuZHMga2V5b2YgSXBjUGF5bG9hZElucHV0TG9va3VwID8gSXBjUGF5bG9hZElucHV0TG9va3VwW1RdIDogdW5kZWZpbmVkO1xuXG5leHBvcnQgaW50ZXJmYWNlIElfSXBjQXBpIHtcbiAgLyoqXG4gICAqIEF0dGFjaGVzIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBzcGVjaWZpZWQgSVBDIGNoYW5uZWwuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjaGFubmVsIC0gVGhlIElQQyBjaGFubmVsIHRvIGxpc3RlbiBvbi5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuYyAtIFRoZSBmdW5jdGlvbiB0byBiZSBleGVjdXRlZCB3aGVuIHRoZSBldmVudCBvY2N1cnMuXG4gICAqL1xuICBvbihjaGFubmVsOiBzdHJpbmcsIGNhbGxiYWNrOiBHZW5lcmljRnVuY3Rpb24pOiB2b2lkO1xuICAvKipcbiAgICogUmVtb3ZlcyBhbiBldmVudCBsaXN0ZW5lciBmcm9tIHRoZSBzcGVjaWZpZWQgSVBDIGNoYW5uZWwuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjaGFubmVsIC0gVGhlIElQQyBjaGFubmVsIHRvIHJlbW92ZSB0aGUgbGlzdGVuZXIgZnJvbS5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuYyAtIFRoZSBmdW5jdGlvbiB0byBiZSByZW1vdmVkIGZyb20gdGhlIGxpc3RlbmVycy5cbiAgICovXG4gIHJlbW92ZUxpc3RlbmVyKGNoYW5uZWw6IHN0cmluZywgY2FsbGJhY2s6IEdlbmVyaWNGdW5jdGlvbik6IHZvaWQ7XG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCBldmVudCBsaXN0ZW5lcnMgZnJvbSB0aGUgc3BlY2lmaWVkIElQQyBjaGFubmVsLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2hhbm5lbCAtIFRoZSBJUEMgY2hhbm5lbCB0byByZW1vdmUgdGhlIGxpc3RlbmVyIGZyb20uXG4gICAqL1xuICByZW1vdmVBbGxMaXN0ZW5lcnMoY2hhbm5lbDogc3RyaW5nKTogdm9pZDtcbiAgLyoqXG4gICAqIFNlbmRzIGEgbWVzc2FnZSB0byB0aGUgc3BlY2lmaWVkIElQQyBjaGFubmVsLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2hhbm5lbCAtIFRoZSBJUEMgY2hhbm5lbCB0byBzZW5kIHRoZSBtZXNzYWdlIHRvLlxuICAgKiBAcGFyYW0ge2FueX0gcGF5bG9hZCAtIFRoZSBkYXRhIHRvIGJlIHNlbnQgd2l0aCB0aGUgbWVzc2FnZS5cbiAgICovXG4gIHNlbmQ8VCBleHRlbmRzIElwY0NoYW5uZWxzPihcbiAgICAuLi5hcmdzOiBUIGV4dGVuZHMga2V5b2YgSXBjUGF5bG9hZElucHV0TG9va3VwXG4gICAgICA/IFtjaGFubmVsOiBULCBwYXlsb2FkOiBJcGNFeHBlY3RlZElucHV0PFQ+XVxuICAgICAgOiBbY2hhbm5lbDogVF1cbiAgKTogdm9pZDtcbiAgLyoqXG4gICAqIFNlbmRzIGEgbWVzc2FnZSB0byB0aGUgc3BlY2lmaWVkIElQQyBjaGFubmVsIGFuZCBiYWNrIHRvIHJlbmRlcmVyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjaGFubmVsIC0gVGhlIElQQyBjaGFubmVsIHRvIHNlbmQgdGhlIG1lc3NhZ2UgdG8uXG4gICAqIEBwYXJhbSB7YW55fSBwYXlsb2FkIC0gVGhlIGRhdGEgdG8gYmUgc2VudCB3aXRoIHRoZSBtZXNzYWdlLlxuICAgKi9cbiAgaW52b2tlPFQgZXh0ZW5kcyBJcGNDaGFubmVscz4oXG4gICAgLi4uYXJnczogVCBleHRlbmRzIGtleW9mIElwY1BheWxvYWRJbnB1dExvb2t1cFxuICAgICAgPyBbY2hhbm5lbDogVCwgcGF5bG9hZDogSXBjRXhwZWN0ZWRJbnB1dDxUPl1cbiAgICAgIDogW2NoYW5uZWw6IFRdXG4gICk6IFByb21pc2U8SXBjSW52b2tlUmV0dXJuPFQ+Pjtcbn1cbiIsImltcG9ydCB7IElwY0NoYW5uZWxzIH0gZnJvbSAnLi4vdHlwZXMvaXBjJztcbmltcG9ydCB7IGdldFJlcGx5Q2hhbm5lbCB9IGZyb20gJy4vZ2V0UmVwbHlDaGFubmVsJztcblxuZXhwb3J0IGNvbnN0IGJhc2VWYWxpZENoYW5uZWxzOiBJcGNDaGFubmVsc1tdID0gT2JqZWN0LnZhbHVlcyhJcGNDaGFubmVscyk7XG5leHBvcnQgY29uc3QgcmVwbHlWYWxpZENoYW5uZWxzID0gYmFzZVZhbGlkQ2hhbm5lbHMubWFwKGdldFJlcGx5Q2hhbm5lbCk7XG5leHBvcnQgY29uc3QgdmFsaWRDaGFubmVscyA9IFsuLi5iYXNlVmFsaWRDaGFubmVscywgLi4ucmVwbHlWYWxpZENoYW5uZWxzXTtcbiIsImltcG9ydCB7IElwY0NoYW5uZWxzIH0gZnJvbSAnc2hhcmVkL3R5cGVzL2lwYyc7XG5cbi8qKiBDb252ZXJ0cyBiYXNlIGNoYW5uZWxzIHRvIGEgYCotcmVwbHlgIGNoYW5uZWwgKi9cbmV4cG9ydCBjb25zdCBnZXRSZXBseUNoYW5uZWwgPSAoY2hhbm5lbDogSXBjQ2hhbm5lbHMpID0+IGAke2NoYW5uZWx9LXJlcGx5YDtcbiIsImV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnlPYmoob2JqOiBhbnkpOiBzdHJpbmcge1xuICBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycpIHJldHVybiBvYmo7XG5cbiAgaWYgKG9iaj8ucmVzcG9uc2U/LmRhdGEpIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmoucmVzcG9uc2UuZGF0YSk7XG5cbiAgaWYgKG9iaj8ubWVzc2FnZSkgcmV0dXJuIG9iai5tZXNzYWdlO1xuXG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmopO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZWxlY3Ryb25cIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGNvbnRleHRCcmlkZ2UgfSBmcm9tICdlbGVjdHJvbic7XG5cbmltcG9ydCB7IGlwY0FwaSB9IGZyb20gJy4vYnJpZGdlcy9pcGNSZW5kZXJlcic7XG5pbXBvcnQgeyBJX0VsZWN0cm9uQXBpIH0gZnJvbSAnLi4vc2hhcmVkL3R5cGVzL3dpbmRvdyc7XG5cbmNvbnN0IGVsZWN0cm9uQXBpOiBJX0VsZWN0cm9uQXBpID0ge1xuICBpcGM6IGlwY0FwaSxcbn07XG5cbmNvbnRleHRCcmlkZ2UuZXhwb3NlSW5NYWluV29ybGQoJ2VsZWN0cm9uJywgZWxlY3Ryb25BcGkpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
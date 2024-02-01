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
/* harmony export */   DefaultShortcutKeybindings: () => (/* reexport safe */ _keybindings__WEBPACK_IMPORTED_MODULE_1__.DefaultShortcutKeybindings),
/* harmony export */   IpcChannels: () => (/* reexport safe */ _ipc__WEBPACK_IMPORTED_MODULE_0__.IpcChannels),
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
/* harmony export */   DefaultShortcutKeybindings: () => (/* binding */ DefaultShortcutKeybindings),
/* harmony export */   ShortcutKeybindingsAliases: () => (/* binding */ ShortcutKeybindingsAliases)
/* harmony export */ });
var ShortcutKeybindingsAliases;
(function (ShortcutKeybindingsAliases) {
    ShortcutKeybindingsAliases["toggleExample"] = "toggleExample";
    ShortcutKeybindingsAliases["toggleWithNotification"] = "toggleWithNotification";
    ShortcutKeybindingsAliases["toggleWithByeNotification"] = "toggleWithByeNotification";
    ShortcutKeybindingsAliases["toggleDeveloperTools"] = "toggleDeveloperTools";
})(ShortcutKeybindingsAliases || (ShortcutKeybindingsAliases = {}));
const DefaultShortcutKeybindings = {
    [ShortcutKeybindingsAliases.toggleExample]: {
        keybind: 'Ctrl+Shift+A',
        title: 'Toggle Example',
    },
    [ShortcutKeybindingsAliases.toggleWithNotification]: {
        keybind: 'Ctrl+Shift+S',
        title: 'Toggle With Notification',
    },
    [ShortcutKeybindingsAliases.toggleWithByeNotification]: {
        keybind: 'Ctrl+Shift+D',
        title: 'Toggle With Bye Notification',
    },
    [ShortcutKeybindingsAliases.toggleDeveloperTools]: {
        keybind: 'F12',
        title: 'Toggle Developer Tools',
        description: 'Shortcut will not work if window is not active/developer tools is active instead',
    },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUUsUUFBUSxFQUFFLENBQUM7S0FDdkMsQ0FBQztBQUNKLENBQUMsQ0FBQztBQVdBOzs7Ozs7Ozs7OztBQ3RGRjs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTnlDO0FBR0Y7QUFFdkMsTUFBTSxXQUFXLEdBQWtCO0lBQ2pDLEdBQUcsRUFBRSxnREFBTTtDQUNaLENBQUM7QUFFRixtREFBYSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4vYnJpZGdlcy9pcGMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC90eXBlcy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL3R5cGVzL2lwYy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL3R5cGVzL2tleWJpbmRpbmdzLnRzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvdXRpbHMvaXBjLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiZWxlY3Ryb25cIiIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4vcHJlbG9hZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gZmFjdG9yeSgpO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkoZ2xvYmFsLCAoKSA9PiB7XG5yZXR1cm4gIiwiaW1wb3J0IHsgaXBjUmVuZGVyZXIsIElwY1JlbmRlcmVyRXZlbnQgfSBmcm9tICdlbGVjdHJvbic7XHJcbmltcG9ydCB7IElfSXBjQXBpLCBJcGNDaGFubmVscyB9IGZyb20gJ3NoYXJlZC90eXBlcyc7XHJcbmltcG9ydCB7IElwY0ludm9rZVJldHVybiwgSXBjUGF5bG9hZCB9IGZyb20gJ3NoYXJlZC90eXBlcy9pcGMnO1xyXG5pbXBvcnQgeyBnZXRSZXBseUNoYW5uZWwgfSBmcm9tICcuLi8uLi9zaGFyZWQvdXRpbHMvaXBjJztcclxuXHJcbmNvbnN0IGJhc2VWYWxpZENoYW5uZWxzOiBJcGNDaGFubmVsc1tdID0gT2JqZWN0LnZhbHVlcyhJcGNDaGFubmVscyk7XHJcbi8vIFtcclxuLy8gSXBjQ2hhbm5lbHMuY2xvc2VBcHAsXHJcbi8vIElwY0NoYW5uZWxzLnJlc3RhcnRBcHAsXHJcbi8vIElwY0NoYW5uZWxzLmNsZWFyU3RvcmUsXHJcbi8vIElwY0NoYW5uZWxzLmV4cG9ydFN0b3JlRGF0YSxcclxuLy8gSXBjQ2hhbm5lbHMuaW1wb3J0U3RvcmVEYXRhLFxyXG4vLyBJcGNDaGFubmVscy5sb2FkU3RvcmVEYXRhLFxyXG4vLyBJcGNDaGFubmVscy5zZXRTdG9yZVZhbHVlLFxyXG4vLyBJcGNDaGFubmVscy5nZXRTdG9yZVZhbHVlLFxyXG4vLyBdO1xyXG4vLyBjb25zdCBmYWlsVmFsaWRDaGFubmVscyA9IGJhc2VWYWxpZENoYW5uZWxzLm1hcChnZXRGYWlsQ2hhbm5lbCk7XHJcbi8vIGNvbnN0IHN1Y2Nlc3NWYWxpZENoYW5uZWxzID0gYmFzZVZhbGlkQ2hhbm5lbHMubWFwKGdldFN1Y2Nlc3NDaGFubmVsKTtcclxuLy8gY29uc3QgdmFsaWRDaGFubmVscyA9IFtcclxuLy8gICAuLi5iYXNlVmFsaWRDaGFubmVscyxcclxuLy8gICAuLi5mYWlsVmFsaWRDaGFubmVscyxcclxuLy8gICAuLi5zdWNjZXNzVmFsaWRDaGFubmVscyxcclxuLy8gXTtcclxuY29uc3QgcmVwbHlWYWxpZENoYW5uZWxzID0gYmFzZVZhbGlkQ2hhbm5lbHMubWFwKGdldFJlcGx5Q2hhbm5lbCk7XHJcbmNvbnN0IHZhbGlkQ2hhbm5lbHMgPSBbLi4uYmFzZVZhbGlkQ2hhbm5lbHMsIC4uLnJlcGx5VmFsaWRDaGFubmVsc107XHJcblxyXG4vKipcclxuICogQXR0YWNoZXMgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIHNwZWNpZmllZCBJUEMgY2hhbm5lbC5cclxuICogQHBhcmFtIHtzdHJpbmd9IGNoYW5uZWwgLSBUaGUgSVBDIGNoYW5uZWwgdG8gbGlzdGVuIG9uLlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jIC0gVGhlIGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkIHdoZW4gdGhlIGV2ZW50IG9jY3Vycy5cclxuICovXHJcbmNvbnN0IG9uID0gKFxyXG4gIGNoYW5uZWw6IHN0cmluZyxcclxuICBmdW5jOiAoZXZlbnQ6IElwY1JlbmRlcmVyRXZlbnQsIC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkLFxyXG4pOiB2b2lkID0+IHtcclxuICBpZiAodmFsaWRDaGFubmVscy5pbmNsdWRlcyhjaGFubmVsIGFzIElwY0NoYW5uZWxzKSkge1xyXG4gICAgaXBjUmVuZGVyZXIub24oY2hhbm5lbCwgKF8sIC4uLmFyZ3MpID0+IGZ1bmMoXywgLi4uYXJncykpO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIGFuIGV2ZW50IGxpc3RlbmVyIGZyb20gdGhlIHNwZWNpZmllZCBJUEMgY2hhbm5lbC5cclxuICogQHBhcmFtIHtzdHJpbmd9IGNoYW5uZWwgLSBUaGUgSVBDIGNoYW5uZWwgdG8gcmVtb3ZlIHRoZSBsaXN0ZW5lciBmcm9tLlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jIC0gVGhlIGZ1bmN0aW9uIHRvIGJlIHJlbW92ZWQgZnJvbSB0aGUgbGlzdGVuZXJzLlxyXG4gKi9cclxuY29uc3QgcmVtb3ZlTGlzdGVuZXIgPSAoXHJcbiAgY2hhbm5lbDogc3RyaW5nLFxyXG4gIGZ1bmM6IChldmVudDogSXBjUmVuZGVyZXJFdmVudCwgLi4uYXJnczogYW55W10pID0+IHZvaWQsXHJcbik6IHZvaWQgPT4ge1xyXG4gIGlmICh2YWxpZENoYW5uZWxzLmluY2x1ZGVzKGNoYW5uZWwgYXMgSXBjQ2hhbm5lbHMpKSB7XHJcbiAgICBpcGNSZW5kZXJlci5yZW1vdmVMaXN0ZW5lcihjaGFubmVsLCAoXywgLi4uYXJncykgPT4gZnVuYyhfLCAuLi5hcmdzKSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgYWxsIGV2ZW50IGxpc3RlbmVycyBmcm9tIHRoZSBzcGVjaWZpZWQgSVBDIGNoYW5uZWwuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjaGFubmVsIC0gVGhlIElQQyBjaGFubmVsIHRvIHJlbW92ZSB0aGUgbGlzdGVuZXIgZnJvbS5cclxuICovXHJcbmNvbnN0IHJlbW92ZUFsbExpc3RlbmVycyA9IChjaGFubmVsOiBzdHJpbmcpOiB2b2lkID0+IHtcclxuICBpZiAodmFsaWRDaGFubmVscy5pbmNsdWRlcyhjaGFubmVsIGFzIElwY0NoYW5uZWxzKSkge1xyXG4gICAgaXBjUmVuZGVyZXIucmVtb3ZlQWxsTGlzdGVuZXJzKGNoYW5uZWwpO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZW5kcyBhIG1lc3NhZ2UgdG8gdGhlIHNwZWNpZmllZCBJUEMgY2hhbm5lbC5cclxuICogQHBhcmFtIHtzdHJpbmd9IGNoYW5uZWwgLSBUaGUgSVBDIGNoYW5uZWwgdG8gc2VuZCB0aGUgbWVzc2FnZSB0by5cclxuICogQHBhcmFtIHthbnl9IHBheWxvYWQgLSBUaGUgZGF0YSB0byBiZSBzZW50IHdpdGggdGhlIG1lc3NhZ2UuXHJcbiAqL1xyXG5jb25zdCBzZW5kID0gPFAgZXh0ZW5kcyBhbnlbXT4oY2hhbm5lbDogc3RyaW5nLCAuLi5wYXlsb2FkOiBQKTogdm9pZCA9PiB7XHJcbiAgaWYgKHZhbGlkQ2hhbm5lbHMuaW5jbHVkZXMoY2hhbm5lbCBhcyBJcGNDaGFubmVscykpIHtcclxuICAgIGlwY1JlbmRlcmVyLnNlbmQoY2hhbm5lbCwgLi4ucGF5bG9hZCk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNlbmRzIGEgbWVzc2FnZSB0byB0aGUgc3BlY2lmaWVkIElQQyBjaGFubmVsIGFuZCBiYWNrIHRvIHJlbmRlcmVyXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjaGFubmVsIC0gVGhlIElQQyBjaGFubmVsIHRvIHNlbmQgdGhlIG1lc3NhZ2UgdG8uXHJcbiAqIEBwYXJhbSB7YW55fSBwYXlsb2FkIC0gVGhlIGRhdGEgdG8gYmUgc2VudCB3aXRoIHRoZSBtZXNzYWdlLlxyXG4gKi9cclxuY29uc3QgaW52b2tlID0gPFxyXG4gIFAgZXh0ZW5kcyBhbnkgfCBhbnlbXSxcclxuICBUIGV4dGVuZHMga2V5b2YgSXBjUGF5bG9hZCA9IGtleW9mIElwY1BheWxvYWQsXHJcbj4oXHJcbiAgY2hhbm5lbDogVCxcclxuICBwYXlsb2FkPzogVCxcclxuKTogUHJvbWlzZTxJcGNJbnZva2VSZXR1cm48UD4+ID0+XHJcbiAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgaWYgKHZhbGlkQ2hhbm5lbHMuaW5jbHVkZXMoY2hhbm5lbCBhcyBJcGNDaGFubmVscykpIHtcclxuICAgICAgaXBjUmVuZGVyZXJcclxuICAgICAgICAuaW52b2tlKGNoYW5uZWwsIHBheWxvYWQpXHJcbiAgICAgICAgLnRoZW4oKHJlc3VsdDogSXBjSW52b2tlUmV0dXJuPFA+KSA9PiByZXNvbHZlKHJlc3VsdCkpXHJcbiAgICAgICAgLmNhdGNoKChlcnJvcjogdW5rbm93bikgPT5cclxuICAgICAgICAgIC8vID8gVGhpcyB3aWxsIGJhc2ljYWxseSBuZXZlciBnZXQgY2FsbGVkIGR1ZSB0byBob3cgdGhlIHN5c3RlbSB3b3Jrc1xyXG4gICAgICAgICAgLy8gPyBCdXQgaWxsIGtlZXAgaXQganVzdCBpbiBjYXNlIDpQXHJcbiAgICAgICAgICByZWplY3QoeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3JNc2c6ICdFcnJvcicsIHBheWxvYWQ6IGVycm9yIH0pLFxyXG4gICAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBIYW5kbGUgdGhlIGNhc2Ugd2hlbiB0aGUgY2hhbm5lbCBpcyBub3QgdmFsaWQsIGUuZy4sIHRocm93IGFuIGVycm9yXHJcbiAgICAgIHJlamVjdCh7XHJcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgICAgbXNnOiAnSW52YWxpZCBDaGFubmVsJyxcclxuICAgICAgICBwYXlsb2FkOiBjaGFubmVsLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbmV4cG9ydCBjb25zdCBpcGNBcGk6IElfSXBjQXBpID0ge1xyXG4gIG9uLFxyXG4gIHJlbW92ZUxpc3RlbmVyLFxyXG4gIHJlbW92ZUFsbExpc3RlbmVycyxcclxuICBzZW5kLFxyXG4gIGludm9rZSxcclxufTtcclxuIiwiaW1wb3J0IHsgQm91bmRzIH0gZnJvbSAnLi9ib3VuZHMnO1xyXG5pbXBvcnQgeyBDb3JlRWxlY3Ryb25TdG9yZSB9IGZyb20gJy4vY29yZUVsZWN0cm9uU3RvcmUnO1xyXG5pbXBvcnQgeyBHZW5lcmljRnVuY3Rpb24sIEdlbmVyaWNWb2lkRnVuY3Rpb24gfSBmcm9tICcuL2dlbmVyaWMnO1xyXG5pbXBvcnQge1xyXG4gIElfSXBjQXBpLFxyXG4gIElwY0NoYW5uZWxzLFxyXG4gIElwY0ludm9rZVJldHVybixcclxuICBJcGNQYXlsb2FkLFxyXG4gIFNldFN0b3JlVmFsdWVQYXlsb2FkLFxyXG59IGZyb20gJy4vaXBjJztcclxuaW1wb3J0IHtcclxuICBTaG9ydGN1dCxcclxuICBTaG9ydGN1dEV2ZW50TGlzdGVuZXIsXHJcbiAgRGVmYXVsdFNob3J0Y3V0S2V5YmluZGluZ3MsXHJcbiAgU2hvcnRjdXRLZXliaW5kaW5nc0FsaWFzZXMsXHJcbn0gZnJvbSAnLi9rZXliaW5kaW5ncyc7XHJcbmltcG9ydCB7IElfRWxlY3Ryb25BcGkgfSBmcm9tICcuL3dpbmRvdyc7XHJcblxyXG5leHBvcnQgdHlwZSB7XHJcbiAgQm91bmRzLFxyXG4gIEdlbmVyaWNGdW5jdGlvbixcclxuICBHZW5lcmljVm9pZEZ1bmN0aW9uLFxyXG4gIElfRWxlY3Ryb25BcGksXHJcbiAgSV9JcGNBcGksXHJcbiAgSXBjSW52b2tlUmV0dXJuLFxyXG4gIElwY1BheWxvYWQsXHJcbiAgQ29yZUVsZWN0cm9uU3RvcmUgYXMgTG9jYWxFbGVjdHJvblN0b3JlLFxyXG4gIFNldFN0b3JlVmFsdWVQYXlsb2FkLFxyXG4gIFNob3J0Y3V0LFxyXG4gIFNob3J0Y3V0RXZlbnRMaXN0ZW5lcixcclxufTtcclxuXHJcbmV4cG9ydCB7IElwY0NoYW5uZWxzLCBEZWZhdWx0U2hvcnRjdXRLZXliaW5kaW5ncywgU2hvcnRjdXRLZXliaW5kaW5nc0FsaWFzZXMgfTtcclxuIiwiaW1wb3J0IHsgR2VuZXJpY0Z1bmN0aW9uIH0gZnJvbSAnLi9nZW5lcmljJztcclxuaW1wb3J0IHsgQ29yZUVsZWN0cm9uU3RvcmUgfSBmcm9tICcuL2NvcmVFbGVjdHJvblN0b3JlJztcclxuXHJcbnR5cGUgU2V0U3RvcmVWYWx1ZVBheWxvYWQgPSB7XHJcbiAga2V5OiBrZXlvZiBDb3JlRWxlY3Ryb25TdG9yZTtcclxuICBzdGF0ZTogQ29yZUVsZWN0cm9uU3RvcmVba2V5b2YgQ29yZUVsZWN0cm9uU3RvcmVdO1xyXG59O1xyXG5cclxuZW51bSBJcGNDaGFubmVscyB7XHJcbiAgY2xvc2VBcHAgPSAnY2xvc2UtYXBwJyxcclxuICBtaW5pbWl6ZUFwcCA9ICdtaW5pbWl6ZS1hcHAnLFxyXG4gIG1heGltaXplQXBwID0gJ21heGltaXplLWFwcCcsXHJcbiAgcmVzdGFydEFwcCA9ICdyZXN0YXJ0LWFwcCcsXHJcbiAgY2xlYXJTdG9yZSA9ICdjbGVhci1zdG9yZScsXHJcbiAgdG9nZ2xlRGV2VG9vbHMgPSAndG9nZ2xlLWRldi10b29scycsXHJcbiAgZXhwb3J0U3RvcmVEYXRhID0gJ2V4cG9ydC1zdG9yZS1kYXRhJyxcclxuICBpbXBvcnRTdG9yZURhdGEgPSAnaW1wb3J0LXN0b3JlLWRhdGEnLFxyXG4gIGxvYWRTdG9yZURhdGEgPSAnbG9hZC1zdG9yZS1kYXRhJyxcclxuICBzZXRTdG9yZVZhbHVlID0gJ3NldC1zdG9yZS12YWx1ZScsXHJcbiAgZ2V0U3RvcmVWYWx1ZSA9ICdnZXQtc3RvcmUtdmFsdWUnLFxyXG59XHJcblxyXG50eXBlIElwY0ludm9rZVJldHVybjxQIGV4dGVuZHMgYW55ID0gYW55PiA9IHtcclxuICBzdWNjZXNzOiBib29sZWFuO1xyXG4gIG1zZzogc3RyaW5nO1xyXG4gIHBheWxvYWQ/OiBQO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFR5cGVzYWZldHk6IEV4cGVjdGVkIHBheWxvYWQgaW5wdXQgZm9yIGlwY0NoYW5uZWxzXHJcbiAqL1xyXG50eXBlIElwY1BheWxvYWQgPSB7XHJcbiAgW2tleSBpbiBJcGNDaGFubmVsc106IGtleSBleHRlbmRzICdzZXQtc3RvcmUtdmFsdWUnXHJcbiAgICA/IFNldFN0b3JlVmFsdWVQYXlsb2FkXHJcbiAgICA6IGFueTtcclxufTtcclxuXHJcbmludGVyZmFjZSBJX0lwY0FwaSB7XHJcbiAgb24oY2hhbm5lbDogc3RyaW5nLCBjYWxsYmFjazogR2VuZXJpY0Z1bmN0aW9uKTogdm9pZDtcclxuICByZW1vdmVMaXN0ZW5lcihjaGFubmVsOiBzdHJpbmcsIGNhbGxiYWNrOiBHZW5lcmljRnVuY3Rpb24pOiB2b2lkO1xyXG4gIHJlbW92ZUFsbExpc3RlbmVycyhjaGFubmVsOiBzdHJpbmcpOiB2b2lkO1xyXG4gIHNlbmQ8VCBleHRlbmRzIGtleW9mIElwY1BheWxvYWQ+KFxyXG4gICAgY2hhbm5lbDogVCxcclxuICAgIHBheWxvYWQ/OiBUIGV4dGVuZHMgJ3NldC1zdG9yZS12YWx1ZScgPyBTZXRTdG9yZVZhbHVlUGF5bG9hZCA6IGFueSxcclxuICApOiB2b2lkO1xyXG4gIGludm9rZTxQIGV4dGVuZHMgYW55IHwgYW55W10sIFQgZXh0ZW5kcyBrZXlvZiBJcGNQYXlsb2FkID0ga2V5b2YgSXBjUGF5bG9hZD4oXHJcbiAgICBjaGFubmVsOiBULFxyXG4gICAgcGF5bG9hZD86IFQgZXh0ZW5kcyAnc2V0LXN0b3JlLXZhbHVlJyA/IFNldFN0b3JlVmFsdWVQYXlsb2FkIDogYW55LFxyXG4gICk6IFByb21pc2U8SXBjSW52b2tlUmV0dXJuPFA+PjtcclxufVxyXG5cclxuZXhwb3J0IHsgSXBjQ2hhbm5lbHMgfTtcclxuXHJcbmV4cG9ydCB0eXBlIHsgSV9JcGNBcGksIElwY1BheWxvYWQsIFNldFN0b3JlVmFsdWVQYXlsb2FkLCBJcGNJbnZva2VSZXR1cm4gfTtcclxuIiwiZW51bSBTaG9ydGN1dEtleWJpbmRpbmdzQWxpYXNlcyB7XHJcbiAgdG9nZ2xlRXhhbXBsZSA9ICd0b2dnbGVFeGFtcGxlJyxcclxuICB0b2dnbGVXaXRoTm90aWZpY2F0aW9uID0gJ3RvZ2dsZVdpdGhOb3RpZmljYXRpb24nLFxyXG4gIHRvZ2dsZVdpdGhCeWVOb3RpZmljYXRpb24gPSAndG9nZ2xlV2l0aEJ5ZU5vdGlmaWNhdGlvbicsXHJcbiAgdG9nZ2xlRGV2ZWxvcGVyVG9vbHMgPSAndG9nZ2xlRGV2ZWxvcGVyVG9vbHMnLFxyXG59XHJcblxyXG5jb25zdCBEZWZhdWx0U2hvcnRjdXRLZXliaW5kaW5nczogUmVjb3JkPFxyXG4gIFNob3J0Y3V0S2V5YmluZGluZ3NBbGlhc2VzLFxyXG4gIHsga2V5YmluZDogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyBkZXNjcmlwdGlvbj86IHN0cmluZyB9XHJcbj4gPSB7XHJcbiAgW1Nob3J0Y3V0S2V5YmluZGluZ3NBbGlhc2VzLnRvZ2dsZUV4YW1wbGVdOiB7XHJcbiAgICBrZXliaW5kOiAnQ3RybCtTaGlmdCtBJyxcclxuICAgIHRpdGxlOiAnVG9nZ2xlIEV4YW1wbGUnLFxyXG4gIH0sXHJcbiAgW1Nob3J0Y3V0S2V5YmluZGluZ3NBbGlhc2VzLnRvZ2dsZVdpdGhOb3RpZmljYXRpb25dOiB7XHJcbiAgICBrZXliaW5kOiAnQ3RybCtTaGlmdCtTJyxcclxuICAgIHRpdGxlOiAnVG9nZ2xlIFdpdGggTm90aWZpY2F0aW9uJyxcclxuICB9LFxyXG4gIFtTaG9ydGN1dEtleWJpbmRpbmdzQWxpYXNlcy50b2dnbGVXaXRoQnllTm90aWZpY2F0aW9uXToge1xyXG4gICAga2V5YmluZDogJ0N0cmwrU2hpZnQrRCcsXHJcbiAgICB0aXRsZTogJ1RvZ2dsZSBXaXRoIEJ5ZSBOb3RpZmljYXRpb24nLFxyXG4gIH0sXHJcbiAgW1Nob3J0Y3V0S2V5YmluZGluZ3NBbGlhc2VzLnRvZ2dsZURldmVsb3BlclRvb2xzXToge1xyXG4gICAga2V5YmluZDogJ0YxMicsXHJcbiAgICB0aXRsZTogJ1RvZ2dsZSBEZXZlbG9wZXIgVG9vbHMnLFxyXG4gICAgZGVzY3JpcHRpb246XHJcbiAgICAgICdTaG9ydGN1dCB3aWxsIG5vdCB3b3JrIGlmIHdpbmRvdyBpcyBub3QgYWN0aXZlL2RldmVsb3BlciB0b29scyBpcyBhY3RpdmUgaW5zdGVhZCcsXHJcbiAgfSxcclxufTtcclxuXHJcbmludGVyZmFjZSBTaG9ydGN1dCB7XHJcbiAgaWQ6IFNob3J0Y3V0S2V5YmluZGluZ3NBbGlhc2VzO1xyXG4gIGtleWJpbmQ6IHN0cmluZztcclxuICB0aXRsZTogc3RyaW5nO1xyXG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xyXG4gIGFjdGlvbjogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnk7XHJcbn1cclxuXHJcbnR5cGUgU2hvcnRjdXRFdmVudExpc3RlbmVyID0gKC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkO1xyXG5cclxuZXhwb3J0IHsgU2hvcnRjdXRLZXliaW5kaW5nc0FsaWFzZXMsIERlZmF1bHRTaG9ydGN1dEtleWJpbmRpbmdzIH07XHJcblxyXG5leHBvcnQgdHlwZSB7IFNob3J0Y3V0LCBTaG9ydGN1dEV2ZW50TGlzdGVuZXIgfTtcclxuIiwiaW1wb3J0IHsgSXBjTWFpbkV2ZW50LCBJcGNNYWluSW52b2tlRXZlbnQgfSBmcm9tICdlbGVjdHJvbic7XHJcbmltcG9ydCB7IElwY0NoYW5uZWxzIH0gZnJvbSAnc2hhcmVkL3R5cGVzJztcclxuaW1wb3J0IHsgSXBjSW52b2tlUmV0dXJuIH0gZnJvbSAnc2hhcmVkL3R5cGVzL2lwYyc7XHJcblxyXG5jb25zdCBnZXRGYWlsQ2hhbm5lbCA9IChjaGFubmVsOiBJcGNDaGFubmVscykgPT4gYCR7Y2hhbm5lbH0tZmFpbGA7XHJcblxyXG5jb25zdCBnZXRTdWNjZXNzQ2hhbm5lbCA9IChjaGFubmVsOiBJcGNDaGFubmVscykgPT4gYCR7Y2hhbm5lbH0tc3VjY2Vzc2A7XHJcblxyXG5jb25zdCBnZXRSZXBseUNoYW5uZWwgPSAoY2hhbm5lbDogSXBjQ2hhbm5lbHMpID0+IGAke2NoYW5uZWx9LXJlcGx5YDtcclxuXHJcbmNvbnN0IHJlcGx5U3VjY2VzcyA9IChcclxuICBldmVudDogSXBjTWFpbkV2ZW50LFxyXG4gIGNoYW5uZWw6IElwY0NoYW5uZWxzLFxyXG4gIHBheWxvYWQ/OiBhbnksXHJcbikgPT4ge1xyXG4gIGV2ZW50LnJlcGx5KGdldFJlcGx5Q2hhbm5lbChjaGFubmVsKSwge1xyXG4gICAgc3VjY2VzczogdHJ1ZSxcclxuICAgIC4uLihwYXlsb2FkICYmIHsgcGF5bG9hZCB9KSxcclxuICB9KTtcclxufTtcclxuXHJcbmNvbnN0IHJlcGx5RmFpbHVyZSA9IChcclxuICBldmVudDogSXBjTWFpbkV2ZW50LFxyXG4gIGNoYW5uZWw6IElwY0NoYW5uZWxzLFxyXG4gIHBheWxvYWQ/OiBhbnksXHJcbikgPT4ge1xyXG4gIGV2ZW50LnJlcGx5KGdldFJlcGx5Q2hhbm5lbChjaGFubmVsKSwge1xyXG4gICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAuLi4ocGF5bG9hZCAmJiB7IHBheWxvYWQgfSksXHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCByZXBseUludm9rZVN1Y2Nlc3MgPSAoXHJcbiAgZXZlbnQ6IElwY01haW5JbnZva2VFdmVudCxcclxuICBjaGFubmVsOiBJcGNDaGFubmVscyxcclxuICBwYXlsb2FkPzogYW55LFxyXG4pID0+IHtcclxuICBldmVudC5zZW5kZXIuc2VuZChnZXRSZXBseUNoYW5uZWwoY2hhbm5lbCksIHtcclxuICAgIHN1Y2Nlc3M6IHRydWUsXHJcbiAgICAuLi4ocGF5bG9hZCAmJiB7IHBheWxvYWQgfSksXHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCByZXBseUludm9rZUZhaWx1cmUgPSAoXHJcbiAgZXZlbnQ6IElwY01haW5JbnZva2VFdmVudCxcclxuICBjaGFubmVsOiBJcGNDaGFubmVscyxcclxuICBwYXlsb2FkPzogYW55LFxyXG4pID0+IHtcclxuICBldmVudC5zZW5kZXIuc2VuZChnZXRSZXBseUNoYW5uZWwoY2hhbm5lbCksIHtcclxuICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgLi4uKHBheWxvYWQgJiYgeyBwYXlsb2FkIH0pLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3QgcmV0dXJuSXBjSW52b2tlRXJyb3IgPSAoXHJcbiAgZXJyb3I6IGFueSxcclxuICBtc2c6IHN0cmluZyA9ICdGYWlsZWQgdG8gdXBkYXRlIHN0b3JlJyxcclxuKTogSXBjSW52b2tlUmV0dXJuID0+IHtcclxuICBsZXQgZXJyb3JTdHI6IHN0cmluZyA9ICcnO1xyXG5cclxuICBpZiAodHlwZW9mIGVycm9yID09PSAnc3RyaW5nJykge1xyXG4gICAgZXJyb3JTdHIgPSBlcnJvcjtcclxuICB9IGVsc2UgaWYgKGVycm9yPy5yZXNwb25zZT8uZGF0YSkge1xyXG4gICAgZXJyb3JTdHIgPSBKU09OLnN0cmluZ2lmeShlcnJvci5yZXNwb25zZS5kYXRhKTtcclxuICB9IGVsc2UgaWYgKGVycm9yPy5tZXNzYWdlIHx8IGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcclxuICAgIGVycm9yU3RyID0gZXJyb3IubWVzc2FnZTtcclxuICB9IGVsc2Uge1xyXG4gICAgZXJyb3JTdHIgPSBKU09OLnN0cmluZ2lmeShlcnJvcik7XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICBtc2csXHJcbiAgICAuLi4oZXJyb3JTdHIgJiYgeyBwYXlsb2FkOiBlcnJvclN0ciB9KSxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IHtcclxuICBnZXRGYWlsQ2hhbm5lbCxcclxuICBnZXRTdWNjZXNzQ2hhbm5lbCxcclxuICBnZXRSZXBseUNoYW5uZWwsXHJcbiAgcmVwbHlTdWNjZXNzLFxyXG4gIHJlcGx5RmFpbHVyZSxcclxuICByZXBseUludm9rZVN1Y2Nlc3MsXHJcbiAgcmVwbHlJbnZva2VGYWlsdXJlLFxyXG4gIHJldHVybklwY0ludm9rZUVycm9yLFxyXG59O1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJlbGVjdHJvblwiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgY29udGV4dEJyaWRnZSB9IGZyb20gJ2VsZWN0cm9uJztcclxuXHJcbmltcG9ydCB7IElfRWxlY3Ryb25BcGkgfSBmcm9tICdzaGFyZWQvdHlwZXMnO1xyXG5pbXBvcnQgeyBpcGNBcGkgfSBmcm9tICcuL2JyaWRnZXMvaXBjJztcclxuXHJcbmNvbnN0IGVsZWN0cm9uQXBpOiBJX0VsZWN0cm9uQXBpID0ge1xyXG4gIGlwYzogaXBjQXBpLFxyXG59O1xyXG5cclxuY29udGV4dEJyaWRnZS5leHBvc2VJbk1haW5Xb3JsZCgnZWxlY3Ryb24nLCBlbGVjdHJvbkFwaSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
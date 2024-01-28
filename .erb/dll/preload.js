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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO1FBQ2hDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDaEQ7U0FBTSxJQUFJLEtBQUssRUFBRSxPQUFPLElBQUksS0FBSyxZQUFZLEtBQUssRUFBRTtRQUNuRCxRQUFRLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztLQUMxQjtTQUFNO1FBQ0wsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDbEM7SUFFRCxPQUFPO1FBQ0wsT0FBTyxFQUFFLEtBQUs7UUFDZCxHQUFHO1FBQ0gsR0FBRyxDQUFDLFFBQVEsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQztLQUN2QyxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBV0E7Ozs7Ozs7Ozs7O0FDdEZGOzs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOeUM7QUFHRjtBQUV2QyxNQUFNLFdBQVcsR0FBa0I7SUFDakMsR0FBRyxFQUFFLGdEQUFNO0NBQ1osQ0FBQztBQUVGLG1EQUFhLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi9icmlkZ2VzL2lwYy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL3R5cGVzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvdHlwZXMvaXBjLnRzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvdXRpbHMvaXBjLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiZWxlY3Ryb25cIiIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4vcHJlbG9hZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gZmFjdG9yeSgpO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkoZ2xvYmFsLCAoKSA9PiB7XG5yZXR1cm4gIiwiaW1wb3J0IHsgaXBjUmVuZGVyZXIsIElwY1JlbmRlcmVyRXZlbnQgfSBmcm9tICdlbGVjdHJvbic7XHJcbmltcG9ydCB7IElfSXBjQXBpLCBJcGNDaGFubmVscyB9IGZyb20gJ3NoYXJlZC90eXBlcyc7XHJcbmltcG9ydCB7IElwY0ludm9rZVJldHVybiwgSXBjUGF5bG9hZCB9IGZyb20gJ3NoYXJlZC90eXBlcy9pcGMnO1xyXG5pbXBvcnQgeyBnZXRSZXBseUNoYW5uZWwgfSBmcm9tICcuLi8uLi9zaGFyZWQvdXRpbHMvaXBjJztcclxuXHJcbmNvbnN0IGJhc2VWYWxpZENoYW5uZWxzOiBJcGNDaGFubmVsc1tdID0gT2JqZWN0LnZhbHVlcyhJcGNDaGFubmVscyk7XHJcbi8vIFtcclxuLy8gSXBjQ2hhbm5lbHMuY2xvc2VBcHAsXHJcbi8vIElwY0NoYW5uZWxzLnJlc3RhcnRBcHAsXHJcbi8vIElwY0NoYW5uZWxzLmNsZWFyU3RvcmUsXHJcbi8vIElwY0NoYW5uZWxzLmV4cG9ydFN0b3JlRGF0YSxcclxuLy8gSXBjQ2hhbm5lbHMuaW1wb3J0U3RvcmVEYXRhLFxyXG4vLyBJcGNDaGFubmVscy5sb2FkU3RvcmVEYXRhLFxyXG4vLyBJcGNDaGFubmVscy5zZXRTdG9yZVZhbHVlLFxyXG4vLyBJcGNDaGFubmVscy5nZXRTdG9yZVZhbHVlLFxyXG4vLyBdO1xyXG4vLyBjb25zdCBmYWlsVmFsaWRDaGFubmVscyA9IGJhc2VWYWxpZENoYW5uZWxzLm1hcChnZXRGYWlsQ2hhbm5lbCk7XHJcbi8vIGNvbnN0IHN1Y2Nlc3NWYWxpZENoYW5uZWxzID0gYmFzZVZhbGlkQ2hhbm5lbHMubWFwKGdldFN1Y2Nlc3NDaGFubmVsKTtcclxuLy8gY29uc3QgdmFsaWRDaGFubmVscyA9IFtcclxuLy8gICAuLi5iYXNlVmFsaWRDaGFubmVscyxcclxuLy8gICAuLi5mYWlsVmFsaWRDaGFubmVscyxcclxuLy8gICAuLi5zdWNjZXNzVmFsaWRDaGFubmVscyxcclxuLy8gXTtcclxuY29uc3QgcmVwbHlWYWxpZENoYW5uZWxzID0gYmFzZVZhbGlkQ2hhbm5lbHMubWFwKGdldFJlcGx5Q2hhbm5lbCk7XHJcbmNvbnN0IHZhbGlkQ2hhbm5lbHMgPSBbLi4uYmFzZVZhbGlkQ2hhbm5lbHMsIC4uLnJlcGx5VmFsaWRDaGFubmVsc107XHJcblxyXG4vKipcclxuICogQXR0YWNoZXMgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIHNwZWNpZmllZCBJUEMgY2hhbm5lbC5cclxuICogQHBhcmFtIHtzdHJpbmd9IGNoYW5uZWwgLSBUaGUgSVBDIGNoYW5uZWwgdG8gbGlzdGVuIG9uLlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jIC0gVGhlIGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkIHdoZW4gdGhlIGV2ZW50IG9jY3Vycy5cclxuICovXHJcbmNvbnN0IG9uID0gKFxyXG4gIGNoYW5uZWw6IHN0cmluZyxcclxuICBmdW5jOiAoZXZlbnQ6IElwY1JlbmRlcmVyRXZlbnQsIC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkLFxyXG4pOiB2b2lkID0+IHtcclxuICBpZiAodmFsaWRDaGFubmVscy5pbmNsdWRlcyhjaGFubmVsIGFzIElwY0NoYW5uZWxzKSkge1xyXG4gICAgaXBjUmVuZGVyZXIub24oY2hhbm5lbCwgKF8sIC4uLmFyZ3MpID0+IGZ1bmMoXywgLi4uYXJncykpO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIGFuIGV2ZW50IGxpc3RlbmVyIGZyb20gdGhlIHNwZWNpZmllZCBJUEMgY2hhbm5lbC5cclxuICogQHBhcmFtIHtzdHJpbmd9IGNoYW5uZWwgLSBUaGUgSVBDIGNoYW5uZWwgdG8gcmVtb3ZlIHRoZSBsaXN0ZW5lciBmcm9tLlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jIC0gVGhlIGZ1bmN0aW9uIHRvIGJlIHJlbW92ZWQgZnJvbSB0aGUgbGlzdGVuZXJzLlxyXG4gKi9cclxuY29uc3QgcmVtb3ZlTGlzdGVuZXIgPSAoXHJcbiAgY2hhbm5lbDogc3RyaW5nLFxyXG4gIGZ1bmM6IChldmVudDogSXBjUmVuZGVyZXJFdmVudCwgLi4uYXJnczogYW55W10pID0+IHZvaWQsXHJcbik6IHZvaWQgPT4ge1xyXG4gIGlmICh2YWxpZENoYW5uZWxzLmluY2x1ZGVzKGNoYW5uZWwgYXMgSXBjQ2hhbm5lbHMpKSB7XHJcbiAgICBpcGNSZW5kZXJlci5yZW1vdmVMaXN0ZW5lcihjaGFubmVsLCAoXywgLi4uYXJncykgPT4gZnVuYyhfLCAuLi5hcmdzKSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgYWxsIGV2ZW50IGxpc3RlbmVycyBmcm9tIHRoZSBzcGVjaWZpZWQgSVBDIGNoYW5uZWwuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjaGFubmVsIC0gVGhlIElQQyBjaGFubmVsIHRvIHJlbW92ZSB0aGUgbGlzdGVuZXIgZnJvbS5cclxuICovXHJcbmNvbnN0IHJlbW92ZUFsbExpc3RlbmVycyA9IChjaGFubmVsOiBzdHJpbmcpOiB2b2lkID0+IHtcclxuICBpZiAodmFsaWRDaGFubmVscy5pbmNsdWRlcyhjaGFubmVsIGFzIElwY0NoYW5uZWxzKSkge1xyXG4gICAgaXBjUmVuZGVyZXIucmVtb3ZlQWxsTGlzdGVuZXJzKGNoYW5uZWwpO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZW5kcyBhIG1lc3NhZ2UgdG8gdGhlIHNwZWNpZmllZCBJUEMgY2hhbm5lbC5cclxuICogQHBhcmFtIHtzdHJpbmd9IGNoYW5uZWwgLSBUaGUgSVBDIGNoYW5uZWwgdG8gc2VuZCB0aGUgbWVzc2FnZSB0by5cclxuICogQHBhcmFtIHthbnl9IHBheWxvYWQgLSBUaGUgZGF0YSB0byBiZSBzZW50IHdpdGggdGhlIG1lc3NhZ2UuXHJcbiAqL1xyXG5jb25zdCBzZW5kID0gPFAgZXh0ZW5kcyBhbnlbXT4oY2hhbm5lbDogc3RyaW5nLCAuLi5wYXlsb2FkOiBQKTogdm9pZCA9PiB7XHJcbiAgaWYgKHZhbGlkQ2hhbm5lbHMuaW5jbHVkZXMoY2hhbm5lbCBhcyBJcGNDaGFubmVscykpIHtcclxuICAgIGlwY1JlbmRlcmVyLnNlbmQoY2hhbm5lbCwgLi4ucGF5bG9hZCk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNlbmRzIGEgbWVzc2FnZSB0byB0aGUgc3BlY2lmaWVkIElQQyBjaGFubmVsIGFuZCBiYWNrIHRvIHJlbmRlcmVyXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjaGFubmVsIC0gVGhlIElQQyBjaGFubmVsIHRvIHNlbmQgdGhlIG1lc3NhZ2UgdG8uXHJcbiAqIEBwYXJhbSB7YW55fSBwYXlsb2FkIC0gVGhlIGRhdGEgdG8gYmUgc2VudCB3aXRoIHRoZSBtZXNzYWdlLlxyXG4gKi9cclxuY29uc3QgaW52b2tlID0gPFxyXG4gIFAgZXh0ZW5kcyBhbnkgfCBhbnlbXSxcclxuICBUIGV4dGVuZHMga2V5b2YgSXBjUGF5bG9hZCA9IGtleW9mIElwY1BheWxvYWQsXHJcbj4oXHJcbiAgY2hhbm5lbDogVCxcclxuICBwYXlsb2FkPzogVCxcclxuKTogUHJvbWlzZTxJcGNJbnZva2VSZXR1cm48UD4+ID0+XHJcbiAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgaWYgKHZhbGlkQ2hhbm5lbHMuaW5jbHVkZXMoY2hhbm5lbCBhcyBJcGNDaGFubmVscykpIHtcclxuICAgICAgaXBjUmVuZGVyZXJcclxuICAgICAgICAuaW52b2tlKGNoYW5uZWwsIHBheWxvYWQpXHJcbiAgICAgICAgLnRoZW4oKHJlc3VsdDogSXBjSW52b2tlUmV0dXJuPFA+KSA9PiByZXNvbHZlKHJlc3VsdCkpXHJcbiAgICAgICAgLmNhdGNoKChlcnJvcjogdW5rbm93bikgPT5cclxuICAgICAgICAgIC8vID8gVGhpcyB3aWxsIGJhc2ljYWxseSBuZXZlciBnZXQgY2FsbGVkIGR1ZSB0byBob3cgdGhlIHN5c3RlbSB3b3Jrc1xyXG4gICAgICAgICAgLy8gPyBCdXQgaWxsIGtlZXAgaXQganVzdCBpbiBjYXNlIDpQXHJcbiAgICAgICAgICByZWplY3QoeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3JNc2c6ICdFcnJvcicsIHBheWxvYWQ6IGVycm9yIH0pLFxyXG4gICAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBIYW5kbGUgdGhlIGNhc2Ugd2hlbiB0aGUgY2hhbm5lbCBpcyBub3QgdmFsaWQsIGUuZy4sIHRocm93IGFuIGVycm9yXHJcbiAgICAgIHJlamVjdCh7XHJcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgICAgbXNnOiAnSW52YWxpZCBDaGFubmVsJyxcclxuICAgICAgICBwYXlsb2FkOiBjaGFubmVsLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbmV4cG9ydCBjb25zdCBpcGNBcGk6IElfSXBjQXBpID0ge1xyXG4gIG9uLFxyXG4gIHJlbW92ZUxpc3RlbmVyLFxyXG4gIHJlbW92ZUFsbExpc3RlbmVycyxcclxuICBzZW5kLFxyXG4gIGludm9rZSxcclxufTtcclxuIiwiaW1wb3J0IHsgQm91bmRzIH0gZnJvbSAnLi9ib3VuZHMnO1xyXG5pbXBvcnQgeyBHZW5lcmljRnVuY3Rpb24sIEdlbmVyaWNWb2lkRnVuY3Rpb24gfSBmcm9tICcuL2dlbmVyaWMnO1xyXG5pbXBvcnQge1xyXG4gIElfSXBjQXBpLFxyXG4gIElwY0NoYW5uZWxzLFxyXG4gIFNldFN0b3JlVmFsdWVQYXlsb2FkLFxyXG4gIElwY1BheWxvYWQsXHJcbiAgSXBjSW52b2tlUmV0dXJuLFxyXG59IGZyb20gJy4vaXBjJztcclxuaW1wb3J0IHsgQ29yZUVsZWN0cm9uU3RvcmUgfSBmcm9tICcuL2NvcmVFbGVjdHJvblN0b3JlJztcclxuaW1wb3J0IHsgSV9FbGVjdHJvbkFwaSB9IGZyb20gJy4vd2luZG93JztcclxuXHJcbmV4cG9ydCB0eXBlIHtcclxuICBCb3VuZHMsXHJcbiAgSV9FbGVjdHJvbkFwaSxcclxuICBHZW5lcmljRnVuY3Rpb24sXHJcbiAgR2VuZXJpY1ZvaWRGdW5jdGlvbixcclxuICBJX0lwY0FwaSxcclxuICBJcGNQYXlsb2FkLFxyXG4gIElwY0ludm9rZVJldHVybixcclxuICBDb3JlRWxlY3Ryb25TdG9yZSBhcyBMb2NhbEVsZWN0cm9uU3RvcmUsXHJcbiAgU2V0U3RvcmVWYWx1ZVBheWxvYWQsXHJcbn07XHJcblxyXG5leHBvcnQgeyBJcGNDaGFubmVscyB9O1xyXG4iLCJpbXBvcnQgeyBHZW5lcmljRnVuY3Rpb24gfSBmcm9tICcuL2dlbmVyaWMnO1xyXG5pbXBvcnQgeyBDb3JlRWxlY3Ryb25TdG9yZSB9IGZyb20gJy4vY29yZUVsZWN0cm9uU3RvcmUnO1xyXG5cclxudHlwZSBTZXRTdG9yZVZhbHVlUGF5bG9hZCA9IHtcclxuICBrZXk6IGtleW9mIENvcmVFbGVjdHJvblN0b3JlO1xyXG4gIHN0YXRlOiBDb3JlRWxlY3Ryb25TdG9yZVtrZXlvZiBDb3JlRWxlY3Ryb25TdG9yZV07XHJcbn07XHJcblxyXG5lbnVtIElwY0NoYW5uZWxzIHtcclxuICBjbG9zZUFwcCA9ICdjbG9zZS1hcHAnLFxyXG4gIG1pbmltaXplQXBwID0gJ21pbmltaXplLWFwcCcsXHJcbiAgbWF4aW1pemVBcHAgPSAnbWF4aW1pemUtYXBwJyxcclxuICByZXN0YXJ0QXBwID0gJ3Jlc3RhcnQtYXBwJyxcclxuICBjbGVhclN0b3JlID0gJ2NsZWFyLXN0b3JlJyxcclxuICB0b2dnbGVEZXZUb29scyA9ICd0b2dnbGUtZGV2LXRvb2xzJyxcclxuICBleHBvcnRTdG9yZURhdGEgPSAnZXhwb3J0LXN0b3JlLWRhdGEnLFxyXG4gIGltcG9ydFN0b3JlRGF0YSA9ICdpbXBvcnQtc3RvcmUtZGF0YScsXHJcbiAgbG9hZFN0b3JlRGF0YSA9ICdsb2FkLXN0b3JlLWRhdGEnLFxyXG4gIHNldFN0b3JlVmFsdWUgPSAnc2V0LXN0b3JlLXZhbHVlJyxcclxuICBnZXRTdG9yZVZhbHVlID0gJ2dldC1zdG9yZS12YWx1ZScsXHJcbn1cclxuXHJcbnR5cGUgSXBjSW52b2tlUmV0dXJuPFAgZXh0ZW5kcyBhbnkgPSBhbnk+ID0ge1xyXG4gIHN1Y2Nlc3M6IGJvb2xlYW47XHJcbiAgbXNnOiBzdHJpbmc7XHJcbiAgcGF5bG9hZD86IFA7XHJcbn07XHJcblxyXG4vKipcclxuICogVHlwZXNhZmV0eTogRXhwZWN0ZWQgcGF5bG9hZCBpbnB1dCBmb3IgaXBjQ2hhbm5lbHNcclxuICovXHJcbnR5cGUgSXBjUGF5bG9hZCA9IHtcclxuICBba2V5IGluIElwY0NoYW5uZWxzXToga2V5IGV4dGVuZHMgJ3NldC1zdG9yZS12YWx1ZSdcclxuICAgID8gU2V0U3RvcmVWYWx1ZVBheWxvYWRcclxuICAgIDogYW55O1xyXG59O1xyXG5cclxuaW50ZXJmYWNlIElfSXBjQXBpIHtcclxuICBvbihjaGFubmVsOiBzdHJpbmcsIGNhbGxiYWNrOiBHZW5lcmljRnVuY3Rpb24pOiB2b2lkO1xyXG4gIHJlbW92ZUxpc3RlbmVyKGNoYW5uZWw6IHN0cmluZywgY2FsbGJhY2s6IEdlbmVyaWNGdW5jdGlvbik6IHZvaWQ7XHJcbiAgcmVtb3ZlQWxsTGlzdGVuZXJzKGNoYW5uZWw6IHN0cmluZyk6IHZvaWQ7XHJcbiAgc2VuZDxUIGV4dGVuZHMga2V5b2YgSXBjUGF5bG9hZD4oXHJcbiAgICBjaGFubmVsOiBULFxyXG4gICAgcGF5bG9hZD86IFQgZXh0ZW5kcyAnc2V0LXN0b3JlLXZhbHVlJyA/IFNldFN0b3JlVmFsdWVQYXlsb2FkIDogYW55LFxyXG4gICk6IHZvaWQ7XHJcbiAgaW52b2tlPFAgZXh0ZW5kcyBhbnkgfCBhbnlbXSwgVCBleHRlbmRzIGtleW9mIElwY1BheWxvYWQgPSBrZXlvZiBJcGNQYXlsb2FkPihcclxuICAgIGNoYW5uZWw6IFQsXHJcbiAgICBwYXlsb2FkPzogVCBleHRlbmRzICdzZXQtc3RvcmUtdmFsdWUnID8gU2V0U3RvcmVWYWx1ZVBheWxvYWQgOiBhbnksXHJcbiAgKTogUHJvbWlzZTxJcGNJbnZva2VSZXR1cm48UD4+O1xyXG59XHJcblxyXG5leHBvcnQgeyBJcGNDaGFubmVscyB9O1xyXG5cclxuZXhwb3J0IHR5cGUgeyBJX0lwY0FwaSwgSXBjUGF5bG9hZCwgU2V0U3RvcmVWYWx1ZVBheWxvYWQsIElwY0ludm9rZVJldHVybiB9O1xyXG4iLCJpbXBvcnQgeyBJcGNNYWluRXZlbnQsIElwY01haW5JbnZva2VFdmVudCB9IGZyb20gJ2VsZWN0cm9uJztcclxuaW1wb3J0IHsgSXBjQ2hhbm5lbHMgfSBmcm9tICdzaGFyZWQvdHlwZXMnO1xyXG5pbXBvcnQgeyBJcGNJbnZva2VSZXR1cm4gfSBmcm9tICdzaGFyZWQvdHlwZXMvaXBjJztcclxuXHJcbmNvbnN0IGdldEZhaWxDaGFubmVsID0gKGNoYW5uZWw6IElwY0NoYW5uZWxzKSA9PiBgJHtjaGFubmVsfS1mYWlsYDtcclxuXHJcbmNvbnN0IGdldFN1Y2Nlc3NDaGFubmVsID0gKGNoYW5uZWw6IElwY0NoYW5uZWxzKSA9PiBgJHtjaGFubmVsfS1zdWNjZXNzYDtcclxuXHJcbmNvbnN0IGdldFJlcGx5Q2hhbm5lbCA9IChjaGFubmVsOiBJcGNDaGFubmVscykgPT4gYCR7Y2hhbm5lbH0tcmVwbHlgO1xyXG5cclxuY29uc3QgcmVwbHlTdWNjZXNzID0gKFxyXG4gIGV2ZW50OiBJcGNNYWluRXZlbnQsXHJcbiAgY2hhbm5lbDogSXBjQ2hhbm5lbHMsXHJcbiAgcGF5bG9hZD86IGFueSxcclxuKSA9PiB7XHJcbiAgZXZlbnQucmVwbHkoZ2V0UmVwbHlDaGFubmVsKGNoYW5uZWwpLCB7XHJcbiAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgLi4uKHBheWxvYWQgJiYgeyBwYXlsb2FkIH0pLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3QgcmVwbHlGYWlsdXJlID0gKFxyXG4gIGV2ZW50OiBJcGNNYWluRXZlbnQsXHJcbiAgY2hhbm5lbDogSXBjQ2hhbm5lbHMsXHJcbiAgcGF5bG9hZD86IGFueSxcclxuKSA9PiB7XHJcbiAgZXZlbnQucmVwbHkoZ2V0UmVwbHlDaGFubmVsKGNoYW5uZWwpLCB7XHJcbiAgICBzdWNjZXNzOiBmYWxzZSxcclxuICAgIC4uLihwYXlsb2FkICYmIHsgcGF5bG9hZCB9KSxcclxuICB9KTtcclxufTtcclxuXHJcbmNvbnN0IHJlcGx5SW52b2tlU3VjY2VzcyA9IChcclxuICBldmVudDogSXBjTWFpbkludm9rZUV2ZW50LFxyXG4gIGNoYW5uZWw6IElwY0NoYW5uZWxzLFxyXG4gIHBheWxvYWQ/OiBhbnksXHJcbikgPT4ge1xyXG4gIGV2ZW50LnNlbmRlci5zZW5kKGdldFJlcGx5Q2hhbm5lbChjaGFubmVsKSwge1xyXG4gICAgc3VjY2VzczogdHJ1ZSxcclxuICAgIC4uLihwYXlsb2FkICYmIHsgcGF5bG9hZCB9KSxcclxuICB9KTtcclxufTtcclxuXHJcbmNvbnN0IHJlcGx5SW52b2tlRmFpbHVyZSA9IChcclxuICBldmVudDogSXBjTWFpbkludm9rZUV2ZW50LFxyXG4gIGNoYW5uZWw6IElwY0NoYW5uZWxzLFxyXG4gIHBheWxvYWQ/OiBhbnksXHJcbikgPT4ge1xyXG4gIGV2ZW50LnNlbmRlci5zZW5kKGdldFJlcGx5Q2hhbm5lbChjaGFubmVsKSwge1xyXG4gICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAuLi4ocGF5bG9hZCAmJiB7IHBheWxvYWQgfSksXHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCByZXR1cm5JcGNJbnZva2VFcnJvciA9IChcclxuICBlcnJvcjogYW55LFxyXG4gIG1zZzogc3RyaW5nID0gJ0ZhaWxlZCB0byB1cGRhdGUgc3RvcmUnLFxyXG4pOiBJcGNJbnZva2VSZXR1cm4gPT4ge1xyXG4gIGxldCBlcnJvclN0cjogc3RyaW5nID0gJyc7XHJcblxyXG4gIGlmICh0eXBlb2YgZXJyb3IgPT09ICdzdHJpbmcnKSB7XHJcbiAgICBlcnJvclN0ciA9IGVycm9yO1xyXG4gIH0gZWxzZSBpZiAoZXJyb3I/LnJlc3BvbnNlPy5kYXRhKSB7XHJcbiAgICBlcnJvclN0ciA9IEpTT04uc3RyaW5naWZ5KGVycm9yLnJlc3BvbnNlLmRhdGEpO1xyXG4gIH0gZWxzZSBpZiAoZXJyb3I/Lm1lc3NhZ2UgfHwgZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xyXG4gICAgZXJyb3JTdHIgPSBlcnJvci5tZXNzYWdlO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBlcnJvclN0ciA9IEpTT04uc3RyaW5naWZ5KGVycm9yKTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBzdWNjZXNzOiBmYWxzZSxcclxuICAgIG1zZyxcclxuICAgIC4uLihlcnJvclN0ciAmJiB7IHBheWxvYWQ6IGVycm9yU3RyIH0pLFxyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQge1xyXG4gIGdldEZhaWxDaGFubmVsLFxyXG4gIGdldFN1Y2Nlc3NDaGFubmVsLFxyXG4gIGdldFJlcGx5Q2hhbm5lbCxcclxuICByZXBseVN1Y2Nlc3MsXHJcbiAgcmVwbHlGYWlsdXJlLFxyXG4gIHJlcGx5SW52b2tlU3VjY2VzcyxcclxuICByZXBseUludm9rZUZhaWx1cmUsXHJcbiAgcmV0dXJuSXBjSW52b2tlRXJyb3IsXHJcbn07XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVsZWN0cm9uXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBjb250ZXh0QnJpZGdlIH0gZnJvbSAnZWxlY3Ryb24nO1xyXG5cclxuaW1wb3J0IHsgSV9FbGVjdHJvbkFwaSB9IGZyb20gJ3NoYXJlZC90eXBlcyc7XHJcbmltcG9ydCB7IGlwY0FwaSB9IGZyb20gJy4vYnJpZGdlcy9pcGMnO1xyXG5cclxuY29uc3QgZWxlY3Ryb25BcGk6IElfRWxlY3Ryb25BcGkgPSB7XHJcbiAgaXBjOiBpcGNBcGksXHJcbn07XHJcblxyXG5jb250ZXh0QnJpZGdlLmV4cG9zZUluTWFpbldvcmxkKCdlbGVjdHJvbicsIGVsZWN0cm9uQXBpKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
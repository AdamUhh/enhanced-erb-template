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
const invoke = (channel, ...payload) => {
    return new Promise((resolve, reject) => {
        if (validChannels.includes(channel)) {
            electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer
                .invoke(channel, ...payload)
                .then((result) => resolve({ success: true, payload: result }))
                .catch((error) => 
            // Handle IPC error appropriately, e.g., log or reject with an error
            reject({ success: false, payload: error.toString() }));
        }
        else {
            // Handle the case when the channel is not valid, e.g., throw an error
            reject({
                success: false,
                payload: `Invalid channel: ${channel}`,
            });
        }
    });
};
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
/* harmony export */   replySuccess: () => (/* binding */ replySuccess)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTnlDO0FBR0Y7QUFFdkMsTUFBTSxXQUFXLEdBQWtCO0lBQ2pDLEdBQUcsRUFBRSxnREFBTTtDQUNaLENBQUM7QUFFRixtREFBYSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4vYnJpZGdlcy9pcGMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC90eXBlcy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL3R5cGVzL2lwYy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL3V0aWxzL2lwYy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImVsZWN0cm9uXCIiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3NyYy9tYWluL3ByZWxvYWQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IGZhY3RvcnkoKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKGdsb2JhbCwgKCkgPT4ge1xucmV0dXJuICIsImltcG9ydCB7IGlwY1JlbmRlcmVyLCBJcGNSZW5kZXJlckV2ZW50IH0gZnJvbSAnZWxlY3Ryb24nO1xyXG5pbXBvcnQgeyBJX0lwY0FwaSwgSXBjQ2hhbm5lbHMgfSBmcm9tICdzaGFyZWQvdHlwZXMnO1xyXG5pbXBvcnQgeyBnZXRSZXBseUNoYW5uZWwgfSBmcm9tICcuLi8uLi9zaGFyZWQvdXRpbHMvaXBjJztcclxuXHJcbmNvbnN0IGJhc2VWYWxpZENoYW5uZWxzOiBJcGNDaGFubmVsc1tdID0gT2JqZWN0LnZhbHVlcyhJcGNDaGFubmVscyk7XHJcbi8vIFtcclxuLy8gSXBjQ2hhbm5lbHMuY2xvc2VBcHAsXHJcbi8vIElwY0NoYW5uZWxzLnJlc3RhcnRBcHAsXHJcbi8vIElwY0NoYW5uZWxzLmNsZWFyU3RvcmUsXHJcbi8vIElwY0NoYW5uZWxzLmV4cG9ydFN0b3JlRGF0YSxcclxuLy8gSXBjQ2hhbm5lbHMuaW1wb3J0U3RvcmVEYXRhLFxyXG4vLyBJcGNDaGFubmVscy5sb2FkU3RvcmVEYXRhLFxyXG4vLyBJcGNDaGFubmVscy5zZXRTdG9yZVZhbHVlLFxyXG4vLyBJcGNDaGFubmVscy5nZXRTdG9yZVZhbHVlLFxyXG4vLyBdO1xyXG4vLyBjb25zdCBmYWlsVmFsaWRDaGFubmVscyA9IGJhc2VWYWxpZENoYW5uZWxzLm1hcChnZXRGYWlsQ2hhbm5lbCk7XHJcbi8vIGNvbnN0IHN1Y2Nlc3NWYWxpZENoYW5uZWxzID0gYmFzZVZhbGlkQ2hhbm5lbHMubWFwKGdldFN1Y2Nlc3NDaGFubmVsKTtcclxuLy8gY29uc3QgdmFsaWRDaGFubmVscyA9IFtcclxuLy8gICAuLi5iYXNlVmFsaWRDaGFubmVscyxcclxuLy8gICAuLi5mYWlsVmFsaWRDaGFubmVscyxcclxuLy8gICAuLi5zdWNjZXNzVmFsaWRDaGFubmVscyxcclxuLy8gXTtcclxuY29uc3QgcmVwbHlWYWxpZENoYW5uZWxzID0gYmFzZVZhbGlkQ2hhbm5lbHMubWFwKGdldFJlcGx5Q2hhbm5lbCk7XHJcbmNvbnN0IHZhbGlkQ2hhbm5lbHMgPSBbLi4uYmFzZVZhbGlkQ2hhbm5lbHMsIC4uLnJlcGx5VmFsaWRDaGFubmVsc107XHJcblxyXG4vKipcclxuICogQXR0YWNoZXMgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIHNwZWNpZmllZCBJUEMgY2hhbm5lbC5cclxuICogQHBhcmFtIHtzdHJpbmd9IGNoYW5uZWwgLSBUaGUgSVBDIGNoYW5uZWwgdG8gbGlzdGVuIG9uLlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jIC0gVGhlIGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkIHdoZW4gdGhlIGV2ZW50IG9jY3Vycy5cclxuICovXHJcbmNvbnN0IG9uID0gKFxyXG4gIGNoYW5uZWw6IHN0cmluZyxcclxuICBmdW5jOiAoZXZlbnQ6IElwY1JlbmRlcmVyRXZlbnQsIC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkLFxyXG4pOiB2b2lkID0+IHtcclxuICBpZiAodmFsaWRDaGFubmVscy5pbmNsdWRlcyhjaGFubmVsIGFzIElwY0NoYW5uZWxzKSkge1xyXG4gICAgaXBjUmVuZGVyZXIub24oY2hhbm5lbCwgKF8sIC4uLmFyZ3MpID0+IGZ1bmMoXywgLi4uYXJncykpO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIGFuIGV2ZW50IGxpc3RlbmVyIGZyb20gdGhlIHNwZWNpZmllZCBJUEMgY2hhbm5lbC5cclxuICogQHBhcmFtIHtzdHJpbmd9IGNoYW5uZWwgLSBUaGUgSVBDIGNoYW5uZWwgdG8gcmVtb3ZlIHRoZSBsaXN0ZW5lciBmcm9tLlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jIC0gVGhlIGZ1bmN0aW9uIHRvIGJlIHJlbW92ZWQgZnJvbSB0aGUgbGlzdGVuZXJzLlxyXG4gKi9cclxuY29uc3QgcmVtb3ZlTGlzdGVuZXIgPSAoXHJcbiAgY2hhbm5lbDogc3RyaW5nLFxyXG4gIGZ1bmM6IChldmVudDogSXBjUmVuZGVyZXJFdmVudCwgLi4uYXJnczogYW55W10pID0+IHZvaWQsXHJcbik6IHZvaWQgPT4ge1xyXG4gIGlmICh2YWxpZENoYW5uZWxzLmluY2x1ZGVzKGNoYW5uZWwgYXMgSXBjQ2hhbm5lbHMpKSB7XHJcbiAgICBpcGNSZW5kZXJlci5yZW1vdmVMaXN0ZW5lcihjaGFubmVsLCAoXywgLi4uYXJncykgPT4gZnVuYyhfLCAuLi5hcmdzKSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgYWxsIGV2ZW50IGxpc3RlbmVycyBmcm9tIHRoZSBzcGVjaWZpZWQgSVBDIGNoYW5uZWwuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjaGFubmVsIC0gVGhlIElQQyBjaGFubmVsIHRvIHJlbW92ZSB0aGUgbGlzdGVuZXIgZnJvbS5cclxuICovXHJcbmNvbnN0IHJlbW92ZUFsbExpc3RlbmVycyA9IChjaGFubmVsOiBzdHJpbmcpOiB2b2lkID0+IHtcclxuICBpZiAodmFsaWRDaGFubmVscy5pbmNsdWRlcyhjaGFubmVsIGFzIElwY0NoYW5uZWxzKSkge1xyXG4gICAgaXBjUmVuZGVyZXIucmVtb3ZlQWxsTGlzdGVuZXJzKGNoYW5uZWwpO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZW5kcyBhIG1lc3NhZ2UgdG8gdGhlIHNwZWNpZmllZCBJUEMgY2hhbm5lbC5cclxuICogQHBhcmFtIHtzdHJpbmd9IGNoYW5uZWwgLSBUaGUgSVBDIGNoYW5uZWwgdG8gc2VuZCB0aGUgbWVzc2FnZSB0by5cclxuICogQHBhcmFtIHthbnl9IHBheWxvYWQgLSBUaGUgZGF0YSB0byBiZSBzZW50IHdpdGggdGhlIG1lc3NhZ2UuXHJcbiAqL1xyXG5jb25zdCBzZW5kID0gPFAgZXh0ZW5kcyBhbnlbXT4oY2hhbm5lbDogc3RyaW5nLCAuLi5wYXlsb2FkOiBQKTogdm9pZCA9PiB7XHJcbiAgaWYgKHZhbGlkQ2hhbm5lbHMuaW5jbHVkZXMoY2hhbm5lbCBhcyBJcGNDaGFubmVscykpIHtcclxuICAgIGlwY1JlbmRlcmVyLnNlbmQoY2hhbm5lbCwgLi4ucGF5bG9hZCk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNlbmRzIGEgbWVzc2FnZSB0byB0aGUgc3BlY2lmaWVkIElQQyBjaGFubmVsIGFuZCBiYWNrIHRvIHJlbmRlcmVyXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjaGFubmVsIC0gVGhlIElQQyBjaGFubmVsIHRvIHNlbmQgdGhlIG1lc3NhZ2UgdG8uXHJcbiAqIEBwYXJhbSB7YW55fSBwYXlsb2FkIC0gVGhlIGRhdGEgdG8gYmUgc2VudCB3aXRoIHRoZSBtZXNzYWdlLlxyXG4gKi9cclxuY29uc3QgaW52b2tlID0gPFAgZXh0ZW5kcyBhbnlbXSwgUj4oXHJcbiAgY2hhbm5lbDogc3RyaW5nLFxyXG4gIC4uLnBheWxvYWQ6IFBcclxuKTogUHJvbWlzZTx7IHN1Y2Nlc3M6IGJvb2xlYW47IHBheWxvYWQ6IFIgfT4gPT4ge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICBpZiAodmFsaWRDaGFubmVscy5pbmNsdWRlcyhjaGFubmVsIGFzIElwY0NoYW5uZWxzKSkge1xyXG4gICAgICBpcGNSZW5kZXJlclxyXG4gICAgICAgIC5pbnZva2UoY2hhbm5lbCwgLi4ucGF5bG9hZClcclxuICAgICAgICAudGhlbigocmVzdWx0OiBSKSA9PiByZXNvbHZlKHsgc3VjY2VzczogdHJ1ZSwgcGF5bG9hZDogcmVzdWx0IH0pKVxyXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+XHJcbiAgICAgICAgICAvLyBIYW5kbGUgSVBDIGVycm9yIGFwcHJvcHJpYXRlbHksIGUuZy4sIGxvZyBvciByZWplY3Qgd2l0aCBhbiBlcnJvclxyXG4gICAgICAgICAgcmVqZWN0KHsgc3VjY2VzczogZmFsc2UsIHBheWxvYWQ6IGVycm9yLnRvU3RyaW5nKCkgfSksXHJcbiAgICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIEhhbmRsZSB0aGUgY2FzZSB3aGVuIHRoZSBjaGFubmVsIGlzIG5vdCB2YWxpZCwgZS5nLiwgdGhyb3cgYW4gZXJyb3JcclxuICAgICAgcmVqZWN0KHtcclxuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcclxuICAgICAgICBwYXlsb2FkOiBgSW52YWxpZCBjaGFubmVsOiAke2NoYW5uZWx9YCxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaXBjQXBpOiBJX0lwY0FwaSA9IHtcclxuICBvbixcclxuICByZW1vdmVMaXN0ZW5lcixcclxuICByZW1vdmVBbGxMaXN0ZW5lcnMsXHJcbiAgc2VuZCxcclxuICBpbnZva2UsXHJcbn07XHJcbiIsImltcG9ydCB7IEJvdW5kcyB9IGZyb20gJy4vYm91bmRzJztcclxuaW1wb3J0IHsgR2VuZXJpY0Z1bmN0aW9uLCBHZW5lcmljVm9pZEZ1bmN0aW9uIH0gZnJvbSAnLi9nZW5lcmljJztcclxuaW1wb3J0IHsgSV9JcGNBcGksIElwY0NoYW5uZWxzLCBTZXRTdG9yZVZhbHVlUGF5bG9hZCB9IGZyb20gJy4vaXBjJztcclxuaW1wb3J0IHsgTG9jYWxFbGVjdHJvblN0b3JlIH0gZnJvbSAnLi9sb2NhbEVsZWN0cm9uU3RvcmUnO1xyXG5pbXBvcnQgeyBJX0VsZWN0cm9uQXBpIH0gZnJvbSAnLi93aW5kb3cnO1xyXG5cclxuZXhwb3J0IHR5cGUge1xyXG4gIEJvdW5kcyxcclxuICBJX0VsZWN0cm9uQXBpLFxyXG4gIEdlbmVyaWNGdW5jdGlvbixcclxuICBHZW5lcmljVm9pZEZ1bmN0aW9uLFxyXG4gIElfSXBjQXBpLFxyXG4gIExvY2FsRWxlY3Ryb25TdG9yZSxcclxuICBTZXRTdG9yZVZhbHVlUGF5bG9hZCxcclxufTtcclxuXHJcbmV4cG9ydCB7IElwY0NoYW5uZWxzIH07XHJcbiIsImltcG9ydCB7IEdlbmVyaWNGdW5jdGlvbiB9IGZyb20gJy4vZ2VuZXJpYyc7XHJcbmltcG9ydCB7IExvY2FsRWxlY3Ryb25TdG9yZSB9IGZyb20gJy4vbG9jYWxFbGVjdHJvblN0b3JlJztcclxuXHJcbnR5cGUgU2V0U3RvcmVWYWx1ZVBheWxvYWQgPSB7XHJcbiAga2V5OiBrZXlvZiBMb2NhbEVsZWN0cm9uU3RvcmU7XHJcbiAgc3RhdGU6IExvY2FsRWxlY3Ryb25TdG9yZVtrZXlvZiBMb2NhbEVsZWN0cm9uU3RvcmVdO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFR5cGVzYWZldHkgcGF5bG9hZCBmb3IgaXBjQ2hhbm5lbHNcclxuICovXHJcbnR5cGUgSXBjUGF5bG9hZCA9IHtcclxuICAnY2xvc2UtYXBwJzogYW55O1xyXG4gICdtaW5pbWl6ZS1hcHAnOiBhbnk7XHJcbiAgJ21heGltaXplLWFwcCc6IGFueTtcclxuICAncmVzdGFydC1hcHAnOiBhbnk7XHJcbiAgJ2NsZWFyLXN0b3JlJzogYW55O1xyXG4gICdleHBvcnQtc3RvcmUtZGF0YSc6IGFueTtcclxuICAnaW1wb3J0LXN0b3JlLWRhdGEnOiBhbnk7XHJcbiAgJ2xvYWQtc3RvcmUtZGF0YSc6IGFueTtcclxuICAnc2V0LXN0b3JlLXZhbHVlJzogU2V0U3RvcmVWYWx1ZVBheWxvYWQ7XHJcbiAgJ2dldC1zdG9yZS12YWx1ZSc6IGFueTtcclxufTtcclxuXHJcbmludGVyZmFjZSBJX0lwY0FwaSB7XHJcbiAgb24oY2hhbm5lbDogc3RyaW5nLCBjYWxsYmFjazogR2VuZXJpY0Z1bmN0aW9uKTogdm9pZDtcclxuICByZW1vdmVMaXN0ZW5lcihjaGFubmVsOiBzdHJpbmcsIGNhbGxiYWNrOiBHZW5lcmljRnVuY3Rpb24pOiB2b2lkO1xyXG4gIHJlbW92ZUFsbExpc3RlbmVycyhjaGFubmVsOiBzdHJpbmcpOiB2b2lkO1xyXG4gIHNlbmQ8VCBleHRlbmRzIGtleW9mIElwY1BheWxvYWQ+KFxyXG4gICAgY2hhbm5lbDogVCxcclxuICAgIHBheWxvYWQ/OiBUIGV4dGVuZHMgJ3NldC1zdG9yZS12YWx1ZScgPyBTZXRTdG9yZVZhbHVlUGF5bG9hZCA6IGFueSxcclxuICApOiB2b2lkO1xyXG4gIGludm9rZTxSLCBUIGV4dGVuZHMga2V5b2YgSXBjUGF5bG9hZCA9IGtleW9mIElwY1BheWxvYWQ+KFxyXG4gICAgY2hhbm5lbDogVCxcclxuICAgIHBheWxvYWQ/OiBUIGV4dGVuZHMgJ3NldC1zdG9yZS12YWx1ZScgPyBTZXRTdG9yZVZhbHVlUGF5bG9hZCA6IGFueSxcclxuICApOiBQcm9taXNlPHsgc3VjY2VzczogYm9vbGVhbjsgcGF5bG9hZDogUiB9PjtcclxufVxyXG5cclxuZW51bSBJcGNDaGFubmVscyB7XHJcbiAgY2xvc2VBcHAgPSAnY2xvc2UtYXBwJyxcclxuICBtaW5pbWl6ZUFwcCA9ICdtaW5pbWl6ZS1hcHAnLFxyXG4gIG1heGltaXplQXBwID0gJ21heGltaXplLWFwcCcsXHJcbiAgcmVzdGFydEFwcCA9ICdyZXN0YXJ0LWFwcCcsXHJcbiAgY2xlYXJTdG9yZSA9ICdjbGVhci1zdG9yZScsXHJcbiAgZXhwb3J0U3RvcmVEYXRhID0gJ2V4cG9ydC1zdG9yZS1kYXRhJyxcclxuICBpbXBvcnRTdG9yZURhdGEgPSAnaW1wb3J0LXN0b3JlLWRhdGEnLFxyXG4gIGxvYWRTdG9yZURhdGEgPSAnbG9hZC1zdG9yZS1kYXRhJyxcclxuICBzZXRTdG9yZVZhbHVlID0gJ3NldC1zdG9yZS12YWx1ZScsXHJcbiAgZ2V0U3RvcmVWYWx1ZSA9ICdnZXQtc3RvcmUtdmFsdWUnLFxyXG59XHJcblxyXG5leHBvcnQgeyBJcGNDaGFubmVscyB9O1xyXG5cclxuZXhwb3J0IHR5cGUgeyBJX0lwY0FwaSwgSXBjUGF5bG9hZCwgU2V0U3RvcmVWYWx1ZVBheWxvYWQgfTtcclxuIiwiaW1wb3J0IHsgSXBjTWFpbkV2ZW50LCBJcGNNYWluSW52b2tlRXZlbnQgfSBmcm9tICdlbGVjdHJvbic7XHJcbmltcG9ydCB7IElwY0NoYW5uZWxzIH0gZnJvbSAnc2hhcmVkL3R5cGVzJztcclxuXHJcbmNvbnN0IGdldEZhaWxDaGFubmVsID0gKGNoYW5uZWw6IElwY0NoYW5uZWxzKSA9PiBgJHtjaGFubmVsfS1mYWlsYDtcclxuXHJcbmNvbnN0IGdldFN1Y2Nlc3NDaGFubmVsID0gKGNoYW5uZWw6IElwY0NoYW5uZWxzKSA9PiBgJHtjaGFubmVsfS1zdWNjZXNzYDtcclxuXHJcbmNvbnN0IGdldFJlcGx5Q2hhbm5lbCA9IChjaGFubmVsOiBJcGNDaGFubmVscykgPT4gYCR7Y2hhbm5lbH0tcmVwbHlgO1xyXG5cclxuY29uc3QgcmVwbHlTdWNjZXNzID0gKFxyXG4gIGV2ZW50OiBJcGNNYWluRXZlbnQsXHJcbiAgY2hhbm5lbDogSXBjQ2hhbm5lbHMsXHJcbiAgcGF5bG9hZD86IGFueSxcclxuKSA9PiB7XHJcbiAgZXZlbnQucmVwbHkoZ2V0UmVwbHlDaGFubmVsKGNoYW5uZWwpLCB7XHJcbiAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgLi4uKHBheWxvYWQgJiYgeyBwYXlsb2FkIH0pLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3QgcmVwbHlGYWlsdXJlID0gKFxyXG4gIGV2ZW50OiBJcGNNYWluRXZlbnQsXHJcbiAgY2hhbm5lbDogSXBjQ2hhbm5lbHMsXHJcbiAgcGF5bG9hZD86IGFueSxcclxuKSA9PiB7XHJcbiAgZXZlbnQucmVwbHkoZ2V0UmVwbHlDaGFubmVsKGNoYW5uZWwpLCB7XHJcbiAgICBzdWNjZXNzOiBmYWxzZSxcclxuICAgIC4uLihwYXlsb2FkICYmIHsgcGF5bG9hZCB9KSxcclxuICB9KTtcclxufTtcclxuXHJcbmNvbnN0IHJlcGx5SW52b2tlU3VjY2VzcyA9IChcclxuICBldmVudDogSXBjTWFpbkludm9rZUV2ZW50LFxyXG4gIGNoYW5uZWw6IElwY0NoYW5uZWxzLFxyXG4gIHBheWxvYWQ/OiBhbnksXHJcbikgPT4ge1xyXG4gIGV2ZW50LnNlbmRlci5zZW5kKGdldFJlcGx5Q2hhbm5lbChjaGFubmVsKSwge1xyXG4gICAgc3VjY2VzczogdHJ1ZSxcclxuICAgIC4uLihwYXlsb2FkICYmIHsgcGF5bG9hZCB9KSxcclxuICB9KTtcclxufTtcclxuXHJcbmNvbnN0IHJlcGx5SW52b2tlRmFpbHVyZSA9IChcclxuICBldmVudDogSXBjTWFpbkludm9rZUV2ZW50LFxyXG4gIGNoYW5uZWw6IElwY0NoYW5uZWxzLFxyXG4gIHBheWxvYWQ/OiBhbnksXHJcbikgPT4ge1xyXG4gIGV2ZW50LnNlbmRlci5zZW5kKGdldFJlcGx5Q2hhbm5lbChjaGFubmVsKSwge1xyXG4gICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAuLi4ocGF5bG9hZCAmJiB7IHBheWxvYWQgfSksXHJcbiAgfSk7XHJcbn07XHJcblxyXG5leHBvcnQge1xyXG4gIGdldEZhaWxDaGFubmVsLFxyXG4gIGdldFN1Y2Nlc3NDaGFubmVsLFxyXG4gIGdldFJlcGx5Q2hhbm5lbCxcclxuICByZXBseVN1Y2Nlc3MsXHJcbiAgcmVwbHlGYWlsdXJlLFxyXG4gIHJlcGx5SW52b2tlU3VjY2VzcyxcclxuICByZXBseUludm9rZUZhaWx1cmUsXHJcbn07XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVsZWN0cm9uXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBjb250ZXh0QnJpZGdlIH0gZnJvbSAnZWxlY3Ryb24nO1xyXG5cclxuaW1wb3J0IHsgSV9FbGVjdHJvbkFwaSB9IGZyb20gJ3NoYXJlZC90eXBlcyc7XHJcbmltcG9ydCB7IGlwY0FwaSB9IGZyb20gJy4vYnJpZGdlcy9pcGMnO1xyXG5cclxuY29uc3QgZWxlY3Ryb25BcGk6IElfRWxlY3Ryb25BcGkgPSB7XHJcbiAgaXBjOiBpcGNBcGksXHJcbn07XHJcblxyXG5jb250ZXh0QnJpZGdlLmV4cG9zZUluTWFpbldvcmxkKCdlbGVjdHJvbicsIGVsZWN0cm9uQXBpKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
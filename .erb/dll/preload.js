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
/* harmony import */ var _util_ipc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/ipc */ "./src/main/util/ipc.ts");



const baseValidChannels = Object.values(shared_types__WEBPACK_IMPORTED_MODULE_1__.IpcChannels);
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

/***/ "./src/shared/keyboard/defaultKeybindings.ts":
/*!***************************************************!*\
  !*** ./src/shared/keyboard/defaultKeybindings.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DefaultShortcutKeybindings: () => (/* binding */ DefaultShortcutKeybindings)
/* harmony export */ });
/* harmony import */ var _keybindingAliases__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./keybindingAliases */ "./src/shared/keyboard/keybindingAliases.ts");

const DefaultShortcutKeybindings = {
    [_keybindingAliases__WEBPACK_IMPORTED_MODULE_0__.ShortcutKeybindingsAliases.toggleExample]: {
        keybind: 'Ctrl+Shift+A',
        title: 'Toggle Example',
    },
    [_keybindingAliases__WEBPACK_IMPORTED_MODULE_0__.ShortcutKeybindingsAliases.toggleWithNotification]: {
        keybind: 'Ctrl+Shift+S',
        title: 'Toggle With Notification',
    },
    [_keybindingAliases__WEBPACK_IMPORTED_MODULE_0__.ShortcutKeybindingsAliases.toggleWithByeNotification]: {
        keybind: 'Ctrl+Shift+D',
        title: 'Toggle With Bye Notification',
    },
    [_keybindingAliases__WEBPACK_IMPORTED_MODULE_0__.ShortcutKeybindingsAliases.toggleDeveloperTools]: {
        keybind: 'F12',
        title: 'Toggle Developer Tools',
        description: 'Shortcut will not work if window is not active/developer tools is active instead',
    },
};



/***/ }),

/***/ "./src/shared/keyboard/keybindingAliases.ts":
/*!**************************************************!*\
  !*** ./src/shared/keyboard/keybindingAliases.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShortcutKeybindingsAliases: () => (/* binding */ ShortcutKeybindingsAliases)
/* harmony export */ });
var ShortcutKeybindingsAliases;
(function (ShortcutKeybindingsAliases) {
    ShortcutKeybindingsAliases["toggleExample"] = "toggleExample";
    ShortcutKeybindingsAliases["toggleWithNotification"] = "toggleWithNotification";
    ShortcutKeybindingsAliases["toggleWithByeNotification"] = "toggleWithByeNotification";
    ShortcutKeybindingsAliases["toggleDeveloperTools"] = "toggleDeveloperTools";
})(ShortcutKeybindingsAliases || (ShortcutKeybindingsAliases = {}));



/***/ }),

/***/ "./src/shared/types/index.ts":
/*!***********************************!*\
  !*** ./src/shared/types/index.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DefaultShortcutKeybindings: () => (/* reexport safe */ _keyboard_defaultKeybindings__WEBPACK_IMPORTED_MODULE_0__.DefaultShortcutKeybindings),
/* harmony export */   IpcChannels: () => (/* reexport safe */ _ipc__WEBPACK_IMPORTED_MODULE_2__.IpcChannels),
/* harmony export */   ShortcutKeybindingsAliases: () => (/* reexport safe */ _keyboard_keybindingAliases__WEBPACK_IMPORTED_MODULE_1__.ShortcutKeybindingsAliases)
/* harmony export */ });
/* harmony import */ var _keyboard_defaultKeybindings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../keyboard/defaultKeybindings */ "./src/shared/keyboard/defaultKeybindings.ts");
/* harmony import */ var _keyboard_keybindingAliases__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../keyboard/keybindingAliases */ "./src/shared/keyboard/keybindingAliases.ts");
/* harmony import */ var _ipc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ipc */ "./src/shared/types/ipc.ts");






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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlbG9hZC5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVnlEO0FBQ0o7QUFFUDtBQUU5QyxNQUFNLGlCQUFpQixHQUFrQixNQUFNLENBQUMsTUFBTSxDQUFDLHFEQUFXLENBQUMsQ0FBQztBQUNwRSxNQUFNLGtCQUFrQixHQUFHLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxzREFBZSxDQUFDLENBQUM7QUFDbEUsTUFBTSxhQUFhLEdBQUcsQ0FBQyxHQUFHLGlCQUFpQixFQUFFLEdBQUcsa0JBQWtCLENBQUMsQ0FBQztBQUVwRTs7OztHQUlHO0FBQ0gsTUFBTSxFQUFFLEdBQUcsQ0FDVCxPQUFlLEVBQ2YsSUFBdUQsRUFDakQsRUFBRTtJQUNSLElBQUksYUFBYSxDQUFDLFFBQVEsQ0FBQyxPQUFzQixDQUFDLEVBQUU7UUFDbEQsaURBQVcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztLQUMzRDtBQUNILENBQUMsQ0FBQztBQUVGOzs7O0dBSUc7QUFDSCxNQUFNLGNBQWMsR0FBRyxDQUNyQixPQUFlLEVBQ2YsSUFBdUQsRUFDakQsRUFBRTtJQUNSLElBQUksYUFBYSxDQUFDLFFBQVEsQ0FBQyxPQUFzQixDQUFDLEVBQUU7UUFDbEQsaURBQVcsQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztLQUN2RTtBQUNILENBQUMsQ0FBQztBQUVGOzs7R0FHRztBQUNILE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxPQUFlLEVBQVEsRUFBRTtJQUNuRCxJQUFJLGFBQWEsQ0FBQyxRQUFRLENBQUMsT0FBc0IsQ0FBQyxFQUFFO1FBQ2xELGlEQUFXLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDekM7QUFDSCxDQUFDLENBQUM7QUFFRjs7OztHQUlHO0FBQ0gsTUFBTSxJQUFJLEdBQUcsQ0FBa0IsT0FBZSxFQUFFLEdBQUcsT0FBVSxFQUFRLEVBQUU7SUFDckUsSUFBSSxhQUFhLENBQUMsUUFBUSxDQUFDLE9BQXNCLENBQUMsRUFBRTtRQUNsRCxpREFBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQztLQUN2QztBQUNILENBQUMsQ0FBQztBQUVGOzs7O0dBSUc7QUFDSCxNQUFNLE1BQU0sR0FBRyxDQUliLE9BQVUsRUFDVixPQUFXLEVBQ2tCLEVBQUUsQ0FDL0IsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7SUFDOUIsSUFBSSxhQUFhLENBQUMsUUFBUSxDQUFDLE9BQXNCLENBQUMsRUFBRTtRQUNsRCxpREFBVzthQUNSLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDO2FBQ3hCLElBQUksQ0FBQyxDQUFDLE1BQTBCLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNyRCxLQUFLLENBQUMsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUN4QixxRUFBcUU7UUFDckUsb0NBQW9DO1FBQ3BDLE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FDOUQsQ0FBQztLQUNMO1NBQU07UUFDTCxzRUFBc0U7UUFDdEUsTUFBTSxDQUFDO1lBQ0wsT0FBTyxFQUFFLEtBQUs7WUFDZCxHQUFHLEVBQUUsaUJBQWlCO1lBQ3RCLE9BQU8sRUFBRSxPQUFPO1NBQ2pCLENBQUMsQ0FBQztLQUNKO0FBQ0gsQ0FBQyxDQUFDLENBQUM7QUFFRSxNQUFNLE1BQU0sR0FBYTtJQUM5QixFQUFFO0lBQ0YsY0FBYztJQUNkLGtCQUFrQjtJQUNsQixJQUFJO0lBQ0osTUFBTTtDQUNQLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUZGLE1BQU0sZUFBZSxHQUFHLENBQUMsT0FBb0IsRUFBRSxFQUFFLENBQUMsR0FBRyxPQUFPLFFBQVEsQ0FBQztBQUVyRSxNQUFNLFlBQVksR0FBRyxDQUNuQixLQUFtQixFQUNuQixPQUFvQixFQUNwQixPQUFhLEVBQ2IsRUFBRTtJQUNGLEtBQUssQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3BDLE9BQU8sRUFBRSxJQUFJO1FBQ2IsR0FBRyxDQUFDLE9BQU8sSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDO0tBQzVCLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUVGLE1BQU0sWUFBWSxHQUFHLENBQ25CLEtBQW1CLEVBQ25CLE9BQW9CLEVBQ3BCLE9BQWEsRUFDYixFQUFFO0lBQ0YsS0FBSyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDcEMsT0FBTyxFQUFFLEtBQUs7UUFDZCxHQUFHLENBQUMsT0FBTyxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7S0FDNUIsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBRUYsTUFBTSxrQkFBa0IsR0FBRyxDQUN6QixLQUF5QixFQUN6QixPQUFvQixFQUNwQixPQUFhLEVBQ2IsRUFBRTtJQUNGLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUMxQyxPQUFPLEVBQUUsSUFBSTtRQUNiLEdBQUcsQ0FBQyxPQUFPLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQztLQUM1QixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUFFRixNQUFNLGtCQUFrQixHQUFHLENBQ3pCLEtBQXlCLEVBQ3pCLE9BQW9CLEVBQ3BCLE9BQWEsRUFDYixFQUFFO0lBQ0YsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQzFDLE9BQU8sRUFBRSxLQUFLO1FBQ2QsR0FBRyxDQUFDLE9BQU8sSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDO0tBQzVCLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUVGLE1BQU0sb0JBQW9CLEdBQUcsQ0FDM0IsS0FBVSxFQUNWLE1BQWMsd0JBQXdCLEVBQ3JCLEVBQUU7SUFDbkIsSUFBSSxRQUFRLEdBQVcsRUFBRSxDQUFDO0lBRTFCLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQzdCLFFBQVEsR0FBRyxLQUFLLENBQUM7S0FDbEI7U0FBTSxJQUFJLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO1FBQ2hDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDaEQ7U0FBTSxJQUFJLEtBQUssRUFBRSxPQUFPLElBQUksS0FBSyxZQUFZLEtBQUssRUFBRTtRQUNuRCxRQUFRLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztLQUMxQjtTQUFNO1FBQ0wsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDbEM7SUFFRCxPQUFPO1FBQ0wsT0FBTyxFQUFFLEtBQUs7UUFDZCxHQUFHO1FBQ0gsR0FBRyxDQUFDLFFBQVEsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQztLQUN2QyxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBU0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRitEO0FBRWpFLE1BQU0sMEJBQTBCLEdBRzVCO0lBQ0YsQ0FBQywwRUFBMEIsQ0FBQyxhQUFhLENBQUMsRUFBRTtRQUMxQyxPQUFPLEVBQUUsY0FBYztRQUN2QixLQUFLLEVBQUUsZ0JBQWdCO0tBQ3hCO0lBQ0QsQ0FBQywwRUFBMEIsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO1FBQ25ELE9BQU8sRUFBRSxjQUFjO1FBQ3ZCLEtBQUssRUFBRSwwQkFBMEI7S0FDbEM7SUFDRCxDQUFDLDBFQUEwQixDQUFDLHlCQUF5QixDQUFDLEVBQUU7UUFDdEQsT0FBTyxFQUFFLGNBQWM7UUFDdkIsS0FBSyxFQUFFLDhCQUE4QjtLQUN0QztJQUNELENBQUMsMEVBQTBCLENBQUMsb0JBQW9CLENBQUMsRUFBRTtRQUNqRCxPQUFPLEVBQUUsS0FBSztRQUNkLEtBQUssRUFBRSx3QkFBd0I7UUFDL0IsV0FBVyxFQUNULGtGQUFrRjtLQUNyRjtDQUNGLENBQUM7QUFFb0M7Ozs7Ozs7Ozs7Ozs7OztBQzFCdEMsSUFBSywwQkFLSjtBQUxELFdBQUssMEJBQTBCO0lBQzdCLDZEQUErQjtJQUMvQiwrRUFBaUQ7SUFDakQscUZBQXVEO0lBQ3ZELDJFQUE2QztBQUMvQyxDQUFDLEVBTEksMEJBQTBCLEtBQTFCLDBCQUEwQixRQUs5QjtBQUVxQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQc0M7QUFDRDtBQVM1RDtBQWdCZ0U7Ozs7Ozs7Ozs7Ozs7OztBQ2xCL0UsSUFBSyxXQWFKO0FBYkQsV0FBSyxXQUFXO0lBQ2QscUNBQXNCO0lBQ3RCLDJDQUE0QjtJQUM1QiwyQ0FBNEI7SUFDNUIseUNBQTBCO0lBQzFCLHlDQUEwQjtJQUMxQixvREFBcUM7SUFDckMsa0RBQW1DO0lBQ25DLG9EQUFxQztJQUNyQyxvREFBcUM7SUFDckMsZ0RBQWlDO0lBQ2pDLGdEQUFpQztJQUNqQyxnREFBaUM7QUFDbkMsQ0FBQyxFQWJJLFdBQVcsS0FBWCxXQUFXLFFBYWY7QUErQnNCOzs7Ozs7Ozs7OztBQ3BEdkI7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ055QztBQUdGO0FBRXZDLE1BQU0sV0FBVyxHQUFrQjtJQUNqQyxHQUFHLEVBQUUsZ0RBQU07Q0FDWixDQUFDO0FBRUYsbURBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy8uL3NyYy9tYWluL2JyaWRnZXMvaXBjLnRzIiwid2VicGFjazovLy8uL3NyYy9tYWluL3V0aWwvaXBjLnRzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQva2V5Ym9hcmQvZGVmYXVsdEtleWJpbmRpbmdzLnRzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQva2V5Ym9hcmQva2V5YmluZGluZ0FsaWFzZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC90eXBlcy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL3R5cGVzL2lwYy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImVsZWN0cm9uXCIiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3NyYy9tYWluL3ByZWxvYWQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IGZhY3RvcnkoKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKGdsb2JhbCwgKCkgPT4ge1xucmV0dXJuICIsImltcG9ydCB7IGlwY1JlbmRlcmVyLCBJcGNSZW5kZXJlckV2ZW50IH0gZnJvbSAnZWxlY3Ryb24nO1xyXG5pbXBvcnQgeyBJX0lwY0FwaSwgSXBjQ2hhbm5lbHMgfSBmcm9tICdzaGFyZWQvdHlwZXMnO1xyXG5pbXBvcnQgeyBJcGNJbnZva2VSZXR1cm4sIElwY1BheWxvYWQgfSBmcm9tICdzaGFyZWQvdHlwZXMvaXBjJztcclxuaW1wb3J0IHsgZ2V0UmVwbHlDaGFubmVsIH0gZnJvbSAnLi4vdXRpbC9pcGMnO1xyXG5cclxuY29uc3QgYmFzZVZhbGlkQ2hhbm5lbHM6IElwY0NoYW5uZWxzW10gPSBPYmplY3QudmFsdWVzKElwY0NoYW5uZWxzKTtcclxuY29uc3QgcmVwbHlWYWxpZENoYW5uZWxzID0gYmFzZVZhbGlkQ2hhbm5lbHMubWFwKGdldFJlcGx5Q2hhbm5lbCk7XHJcbmNvbnN0IHZhbGlkQ2hhbm5lbHMgPSBbLi4uYmFzZVZhbGlkQ2hhbm5lbHMsIC4uLnJlcGx5VmFsaWRDaGFubmVsc107XHJcblxyXG4vKipcclxuICogQXR0YWNoZXMgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIHNwZWNpZmllZCBJUEMgY2hhbm5lbC5cclxuICogQHBhcmFtIHtzdHJpbmd9IGNoYW5uZWwgLSBUaGUgSVBDIGNoYW5uZWwgdG8gbGlzdGVuIG9uLlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jIC0gVGhlIGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkIHdoZW4gdGhlIGV2ZW50IG9jY3Vycy5cclxuICovXHJcbmNvbnN0IG9uID0gKFxyXG4gIGNoYW5uZWw6IHN0cmluZyxcclxuICBmdW5jOiAoZXZlbnQ6IElwY1JlbmRlcmVyRXZlbnQsIC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkLFxyXG4pOiB2b2lkID0+IHtcclxuICBpZiAodmFsaWRDaGFubmVscy5pbmNsdWRlcyhjaGFubmVsIGFzIElwY0NoYW5uZWxzKSkge1xyXG4gICAgaXBjUmVuZGVyZXIub24oY2hhbm5lbCwgKF8sIC4uLmFyZ3MpID0+IGZ1bmMoXywgLi4uYXJncykpO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIGFuIGV2ZW50IGxpc3RlbmVyIGZyb20gdGhlIHNwZWNpZmllZCBJUEMgY2hhbm5lbC5cclxuICogQHBhcmFtIHtzdHJpbmd9IGNoYW5uZWwgLSBUaGUgSVBDIGNoYW5uZWwgdG8gcmVtb3ZlIHRoZSBsaXN0ZW5lciBmcm9tLlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jIC0gVGhlIGZ1bmN0aW9uIHRvIGJlIHJlbW92ZWQgZnJvbSB0aGUgbGlzdGVuZXJzLlxyXG4gKi9cclxuY29uc3QgcmVtb3ZlTGlzdGVuZXIgPSAoXHJcbiAgY2hhbm5lbDogc3RyaW5nLFxyXG4gIGZ1bmM6IChldmVudDogSXBjUmVuZGVyZXJFdmVudCwgLi4uYXJnczogYW55W10pID0+IHZvaWQsXHJcbik6IHZvaWQgPT4ge1xyXG4gIGlmICh2YWxpZENoYW5uZWxzLmluY2x1ZGVzKGNoYW5uZWwgYXMgSXBjQ2hhbm5lbHMpKSB7XHJcbiAgICBpcGNSZW5kZXJlci5yZW1vdmVMaXN0ZW5lcihjaGFubmVsLCAoXywgLi4uYXJncykgPT4gZnVuYyhfLCAuLi5hcmdzKSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgYWxsIGV2ZW50IGxpc3RlbmVycyBmcm9tIHRoZSBzcGVjaWZpZWQgSVBDIGNoYW5uZWwuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjaGFubmVsIC0gVGhlIElQQyBjaGFubmVsIHRvIHJlbW92ZSB0aGUgbGlzdGVuZXIgZnJvbS5cclxuICovXHJcbmNvbnN0IHJlbW92ZUFsbExpc3RlbmVycyA9IChjaGFubmVsOiBzdHJpbmcpOiB2b2lkID0+IHtcclxuICBpZiAodmFsaWRDaGFubmVscy5pbmNsdWRlcyhjaGFubmVsIGFzIElwY0NoYW5uZWxzKSkge1xyXG4gICAgaXBjUmVuZGVyZXIucmVtb3ZlQWxsTGlzdGVuZXJzKGNoYW5uZWwpO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZW5kcyBhIG1lc3NhZ2UgdG8gdGhlIHNwZWNpZmllZCBJUEMgY2hhbm5lbC5cclxuICogQHBhcmFtIHtzdHJpbmd9IGNoYW5uZWwgLSBUaGUgSVBDIGNoYW5uZWwgdG8gc2VuZCB0aGUgbWVzc2FnZSB0by5cclxuICogQHBhcmFtIHthbnl9IHBheWxvYWQgLSBUaGUgZGF0YSB0byBiZSBzZW50IHdpdGggdGhlIG1lc3NhZ2UuXHJcbiAqL1xyXG5jb25zdCBzZW5kID0gPFAgZXh0ZW5kcyBhbnlbXT4oY2hhbm5lbDogc3RyaW5nLCAuLi5wYXlsb2FkOiBQKTogdm9pZCA9PiB7XHJcbiAgaWYgKHZhbGlkQ2hhbm5lbHMuaW5jbHVkZXMoY2hhbm5lbCBhcyBJcGNDaGFubmVscykpIHtcclxuICAgIGlwY1JlbmRlcmVyLnNlbmQoY2hhbm5lbCwgLi4ucGF5bG9hZCk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNlbmRzIGEgbWVzc2FnZSB0byB0aGUgc3BlY2lmaWVkIElQQyBjaGFubmVsIGFuZCBiYWNrIHRvIHJlbmRlcmVyXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjaGFubmVsIC0gVGhlIElQQyBjaGFubmVsIHRvIHNlbmQgdGhlIG1lc3NhZ2UgdG8uXHJcbiAqIEBwYXJhbSB7YW55fSBwYXlsb2FkIC0gVGhlIGRhdGEgdG8gYmUgc2VudCB3aXRoIHRoZSBtZXNzYWdlLlxyXG4gKi9cclxuY29uc3QgaW52b2tlID0gPFxyXG4gIFAgZXh0ZW5kcyBhbnkgfCBhbnlbXSxcclxuICBUIGV4dGVuZHMga2V5b2YgSXBjUGF5bG9hZCA9IGtleW9mIElwY1BheWxvYWQsXHJcbj4oXHJcbiAgY2hhbm5lbDogVCxcclxuICBwYXlsb2FkPzogVCxcclxuKTogUHJvbWlzZTxJcGNJbnZva2VSZXR1cm48UD4+ID0+XHJcbiAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgaWYgKHZhbGlkQ2hhbm5lbHMuaW5jbHVkZXMoY2hhbm5lbCBhcyBJcGNDaGFubmVscykpIHtcclxuICAgICAgaXBjUmVuZGVyZXJcclxuICAgICAgICAuaW52b2tlKGNoYW5uZWwsIHBheWxvYWQpXHJcbiAgICAgICAgLnRoZW4oKHJlc3VsdDogSXBjSW52b2tlUmV0dXJuPFA+KSA9PiByZXNvbHZlKHJlc3VsdCkpXHJcbiAgICAgICAgLmNhdGNoKChlcnJvcjogdW5rbm93bikgPT5cclxuICAgICAgICAgIC8vID8gVGhpcyB3aWxsIGJhc2ljYWxseSBuZXZlciBnZXQgY2FsbGVkIGR1ZSB0byBob3cgdGhlIHN5c3RlbSB3b3Jrc1xyXG4gICAgICAgICAgLy8gPyBCdXQgaWxsIGtlZXAgaXQganVzdCBpbiBjYXNlIDpQXHJcbiAgICAgICAgICByZWplY3QoeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3JNc2c6ICdFcnJvcicsIHBheWxvYWQ6IGVycm9yIH0pLFxyXG4gICAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBIYW5kbGUgdGhlIGNhc2Ugd2hlbiB0aGUgY2hhbm5lbCBpcyBub3QgdmFsaWQsIGUuZy4sIHRocm93IGFuIGVycm9yXHJcbiAgICAgIHJlamVjdCh7XHJcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgICAgbXNnOiAnSW52YWxpZCBDaGFubmVsJyxcclxuICAgICAgICBwYXlsb2FkOiBjaGFubmVsLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbmV4cG9ydCBjb25zdCBpcGNBcGk6IElfSXBjQXBpID0ge1xyXG4gIG9uLFxyXG4gIHJlbW92ZUxpc3RlbmVyLFxyXG4gIHJlbW92ZUFsbExpc3RlbmVycyxcclxuICBzZW5kLFxyXG4gIGludm9rZSxcclxufTtcclxuIiwiaW1wb3J0IHsgSXBjTWFpbkV2ZW50LCBJcGNNYWluSW52b2tlRXZlbnQgfSBmcm9tICdlbGVjdHJvbic7XHJcbmltcG9ydCB7IElwY0NoYW5uZWxzIH0gZnJvbSAnc2hhcmVkL3R5cGVzJztcclxuaW1wb3J0IHsgSXBjSW52b2tlUmV0dXJuIH0gZnJvbSAnc2hhcmVkL3R5cGVzL2lwYyc7XHJcblxyXG5jb25zdCBnZXRSZXBseUNoYW5uZWwgPSAoY2hhbm5lbDogSXBjQ2hhbm5lbHMpID0+IGAke2NoYW5uZWx9LXJlcGx5YDtcclxuXHJcbmNvbnN0IHJlcGx5U3VjY2VzcyA9IChcclxuICBldmVudDogSXBjTWFpbkV2ZW50LFxyXG4gIGNoYW5uZWw6IElwY0NoYW5uZWxzLFxyXG4gIHBheWxvYWQ/OiBhbnksXHJcbikgPT4ge1xyXG4gIGV2ZW50LnJlcGx5KGdldFJlcGx5Q2hhbm5lbChjaGFubmVsKSwge1xyXG4gICAgc3VjY2VzczogdHJ1ZSxcclxuICAgIC4uLihwYXlsb2FkICYmIHsgcGF5bG9hZCB9KSxcclxuICB9KTtcclxufTtcclxuXHJcbmNvbnN0IHJlcGx5RmFpbHVyZSA9IChcclxuICBldmVudDogSXBjTWFpbkV2ZW50LFxyXG4gIGNoYW5uZWw6IElwY0NoYW5uZWxzLFxyXG4gIHBheWxvYWQ/OiBhbnksXHJcbikgPT4ge1xyXG4gIGV2ZW50LnJlcGx5KGdldFJlcGx5Q2hhbm5lbChjaGFubmVsKSwge1xyXG4gICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAuLi4ocGF5bG9hZCAmJiB7IHBheWxvYWQgfSksXHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCByZXBseUludm9rZVN1Y2Nlc3MgPSAoXHJcbiAgZXZlbnQ6IElwY01haW5JbnZva2VFdmVudCxcclxuICBjaGFubmVsOiBJcGNDaGFubmVscyxcclxuICBwYXlsb2FkPzogYW55LFxyXG4pID0+IHtcclxuICBldmVudC5zZW5kZXIuc2VuZChnZXRSZXBseUNoYW5uZWwoY2hhbm5lbCksIHtcclxuICAgIHN1Y2Nlc3M6IHRydWUsXHJcbiAgICAuLi4ocGF5bG9hZCAmJiB7IHBheWxvYWQgfSksXHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCByZXBseUludm9rZUZhaWx1cmUgPSAoXHJcbiAgZXZlbnQ6IElwY01haW5JbnZva2VFdmVudCxcclxuICBjaGFubmVsOiBJcGNDaGFubmVscyxcclxuICBwYXlsb2FkPzogYW55LFxyXG4pID0+IHtcclxuICBldmVudC5zZW5kZXIuc2VuZChnZXRSZXBseUNoYW5uZWwoY2hhbm5lbCksIHtcclxuICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgLi4uKHBheWxvYWQgJiYgeyBwYXlsb2FkIH0pLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3QgcmV0dXJuSXBjSW52b2tlRXJyb3IgPSAoXHJcbiAgZXJyb3I6IGFueSxcclxuICBtc2c6IHN0cmluZyA9ICdGYWlsZWQgdG8gdXBkYXRlIHN0b3JlJyxcclxuKTogSXBjSW52b2tlUmV0dXJuID0+IHtcclxuICBsZXQgZXJyb3JTdHI6IHN0cmluZyA9ICcnO1xyXG5cclxuICBpZiAodHlwZW9mIGVycm9yID09PSAnc3RyaW5nJykge1xyXG4gICAgZXJyb3JTdHIgPSBlcnJvcjtcclxuICB9IGVsc2UgaWYgKGVycm9yPy5yZXNwb25zZT8uZGF0YSkge1xyXG4gICAgZXJyb3JTdHIgPSBKU09OLnN0cmluZ2lmeShlcnJvci5yZXNwb25zZS5kYXRhKTtcclxuICB9IGVsc2UgaWYgKGVycm9yPy5tZXNzYWdlIHx8IGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcclxuICAgIGVycm9yU3RyID0gZXJyb3IubWVzc2FnZTtcclxuICB9IGVsc2Uge1xyXG4gICAgZXJyb3JTdHIgPSBKU09OLnN0cmluZ2lmeShlcnJvcik7XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICBtc2csXHJcbiAgICAuLi4oZXJyb3JTdHIgJiYgeyBwYXlsb2FkOiBlcnJvclN0ciB9KSxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IHtcclxuICBnZXRSZXBseUNoYW5uZWwsXHJcbiAgcmVwbHlTdWNjZXNzLFxyXG4gIHJlcGx5RmFpbHVyZSxcclxuICByZXBseUludm9rZVN1Y2Nlc3MsXHJcbiAgcmVwbHlJbnZva2VGYWlsdXJlLFxyXG4gIHJldHVybklwY0ludm9rZUVycm9yLFxyXG59O1xyXG4iLCJpbXBvcnQgeyBTaG9ydGN1dEtleWJpbmRpbmdzQWxpYXNlcyB9IGZyb20gJy4va2V5YmluZGluZ0FsaWFzZXMnO1xyXG5cclxuY29uc3QgRGVmYXVsdFNob3J0Y3V0S2V5YmluZGluZ3M6IFJlY29yZDxcclxuICBTaG9ydGN1dEtleWJpbmRpbmdzQWxpYXNlcyxcclxuICB7IGtleWJpbmQ6IHN0cmluZzsgdGl0bGU6IHN0cmluZzsgZGVzY3JpcHRpb24/OiBzdHJpbmcgfVxyXG4+ID0ge1xyXG4gIFtTaG9ydGN1dEtleWJpbmRpbmdzQWxpYXNlcy50b2dnbGVFeGFtcGxlXToge1xyXG4gICAga2V5YmluZDogJ0N0cmwrU2hpZnQrQScsXHJcbiAgICB0aXRsZTogJ1RvZ2dsZSBFeGFtcGxlJyxcclxuICB9LFxyXG4gIFtTaG9ydGN1dEtleWJpbmRpbmdzQWxpYXNlcy50b2dnbGVXaXRoTm90aWZpY2F0aW9uXToge1xyXG4gICAga2V5YmluZDogJ0N0cmwrU2hpZnQrUycsXHJcbiAgICB0aXRsZTogJ1RvZ2dsZSBXaXRoIE5vdGlmaWNhdGlvbicsXHJcbiAgfSxcclxuICBbU2hvcnRjdXRLZXliaW5kaW5nc0FsaWFzZXMudG9nZ2xlV2l0aEJ5ZU5vdGlmaWNhdGlvbl06IHtcclxuICAgIGtleWJpbmQ6ICdDdHJsK1NoaWZ0K0QnLFxyXG4gICAgdGl0bGU6ICdUb2dnbGUgV2l0aCBCeWUgTm90aWZpY2F0aW9uJyxcclxuICB9LFxyXG4gIFtTaG9ydGN1dEtleWJpbmRpbmdzQWxpYXNlcy50b2dnbGVEZXZlbG9wZXJUb29sc106IHtcclxuICAgIGtleWJpbmQ6ICdGMTInLFxyXG4gICAgdGl0bGU6ICdUb2dnbGUgRGV2ZWxvcGVyIFRvb2xzJyxcclxuICAgIGRlc2NyaXB0aW9uOlxyXG4gICAgICAnU2hvcnRjdXQgd2lsbCBub3Qgd29yayBpZiB3aW5kb3cgaXMgbm90IGFjdGl2ZS9kZXZlbG9wZXIgdG9vbHMgaXMgYWN0aXZlIGluc3RlYWQnLFxyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgeyBEZWZhdWx0U2hvcnRjdXRLZXliaW5kaW5ncyB9O1xyXG4iLCJlbnVtIFNob3J0Y3V0S2V5YmluZGluZ3NBbGlhc2VzIHtcclxuICB0b2dnbGVFeGFtcGxlID0gJ3RvZ2dsZUV4YW1wbGUnLFxyXG4gIHRvZ2dsZVdpdGhOb3RpZmljYXRpb24gPSAndG9nZ2xlV2l0aE5vdGlmaWNhdGlvbicsXHJcbiAgdG9nZ2xlV2l0aEJ5ZU5vdGlmaWNhdGlvbiA9ICd0b2dnbGVXaXRoQnllTm90aWZpY2F0aW9uJyxcclxuICB0b2dnbGVEZXZlbG9wZXJUb29scyA9ICd0b2dnbGVEZXZlbG9wZXJUb29scycsXHJcbn1cclxuXHJcbmV4cG9ydCB7IFNob3J0Y3V0S2V5YmluZGluZ3NBbGlhc2VzIH07XHJcbiIsImltcG9ydCB7IERlZmF1bHRTaG9ydGN1dEtleWJpbmRpbmdzIH0gZnJvbSAnLi4va2V5Ym9hcmQvZGVmYXVsdEtleWJpbmRpbmdzJztcclxuaW1wb3J0IHsgU2hvcnRjdXRLZXliaW5kaW5nc0FsaWFzZXMgfSBmcm9tICcuLi9rZXlib2FyZC9rZXliaW5kaW5nQWxpYXNlcyc7XHJcbmltcG9ydCB7IENvcmVFbGVjdHJvblN0b3JlIH0gZnJvbSAnLi9jb3JlRWxlY3Ryb25TdG9yZSc7XHJcbmltcG9ydCB7IEdlbmVyaWNGdW5jdGlvbiwgR2VuZXJpY1ZvaWRGdW5jdGlvbiB9IGZyb20gJy4vZ2VuZXJpYyc7XHJcbmltcG9ydCB7XHJcbiAgSV9JcGNBcGksXHJcbiAgSXBjQ2hhbm5lbHMsXHJcbiAgSXBjSW52b2tlUmV0dXJuLFxyXG4gIElwY1BheWxvYWQsXHJcbiAgU2V0U3RvcmVWYWx1ZVBheWxvYWQsXHJcbn0gZnJvbSAnLi9pcGMnO1xyXG5pbXBvcnQgeyBTaG9ydGN1dCB9IGZyb20gJy4va2V5YmluZGluZ3MnO1xyXG5pbXBvcnQgeyBJX0VsZWN0cm9uQXBpIH0gZnJvbSAnLi93aW5kb3cnO1xyXG5cclxuZXhwb3J0IHR5cGUge1xyXG4gIEdlbmVyaWNGdW5jdGlvbixcclxuICBHZW5lcmljVm9pZEZ1bmN0aW9uLFxyXG4gIElfRWxlY3Ryb25BcGksXHJcbiAgSV9JcGNBcGksXHJcbiAgSXBjSW52b2tlUmV0dXJuLFxyXG4gIElwY1BheWxvYWQsXHJcbiAgQ29yZUVsZWN0cm9uU3RvcmUsXHJcbiAgU2V0U3RvcmVWYWx1ZVBheWxvYWQsXHJcbiAgU2hvcnRjdXQsXHJcbn07XHJcblxyXG5leHBvcnQgeyBEZWZhdWx0U2hvcnRjdXRLZXliaW5kaW5ncywgSXBjQ2hhbm5lbHMsIFNob3J0Y3V0S2V5YmluZGluZ3NBbGlhc2VzIH07XHJcbiIsImltcG9ydCB7IEdlbmVyaWNGdW5jdGlvbiB9IGZyb20gJy4vZ2VuZXJpYyc7XHJcbmltcG9ydCB7IENvcmVFbGVjdHJvblN0b3JlIH0gZnJvbSAnLi9jb3JlRWxlY3Ryb25TdG9yZSc7XHJcblxyXG50eXBlIFNldFN0b3JlVmFsdWVQYXlsb2FkID0ge1xyXG4gIGtleToga2V5b2YgQ29yZUVsZWN0cm9uU3RvcmU7XHJcbiAgc3RhdGU6IENvcmVFbGVjdHJvblN0b3JlW2tleW9mIENvcmVFbGVjdHJvblN0b3JlXTtcclxufTtcclxuXHJcbmVudW0gSXBjQ2hhbm5lbHMge1xyXG4gIGNsb3NlQXBwID0gJ2Nsb3NlLWFwcCcsXHJcbiAgbWluaW1pemVBcHAgPSAnbWluaW1pemUtYXBwJyxcclxuICBtYXhpbWl6ZUFwcCA9ICdtYXhpbWl6ZS1hcHAnLFxyXG4gIHJlc3RhcnRBcHAgPSAncmVzdGFydC1hcHAnLFxyXG4gIGNsZWFyU3RvcmUgPSAnY2xlYXItc3RvcmUnLFxyXG4gIGNoZWNrRm9yVXBkYXRlcyA9ICdjaGVjay1mb3ItdXBkYXRlcycsXHJcbiAgdG9nZ2xlRGV2VG9vbHMgPSAndG9nZ2xlLWRldi10b29scycsXHJcbiAgZXhwb3J0U3RvcmVEYXRhID0gJ2V4cG9ydC1zdG9yZS1kYXRhJyxcclxuICBpbXBvcnRTdG9yZURhdGEgPSAnaW1wb3J0LXN0b3JlLWRhdGEnLFxyXG4gIGxvYWRTdG9yZURhdGEgPSAnbG9hZC1zdG9yZS1kYXRhJyxcclxuICBzZXRTdG9yZVZhbHVlID0gJ3NldC1zdG9yZS12YWx1ZScsXHJcbiAgZ2V0U3RvcmVWYWx1ZSA9ICdnZXQtc3RvcmUtdmFsdWUnLFxyXG59XHJcblxyXG50eXBlIElwY0ludm9rZVJldHVybjxQIGV4dGVuZHMgYW55ID0gYW55PiA9IHtcclxuICBzdWNjZXNzOiBib29sZWFuO1xyXG4gIG1zZzogc3RyaW5nO1xyXG4gIHBheWxvYWQ/OiBQO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFR5cGVzYWZldHk6IEV4cGVjdGVkIHBheWxvYWQgaW5wdXQgZm9yIGlwY0NoYW5uZWxzXHJcbiAqL1xyXG50eXBlIElwY1BheWxvYWQgPSB7XHJcbiAgW2tleSBpbiBJcGNDaGFubmVsc106IGtleSBleHRlbmRzICdzZXQtc3RvcmUtdmFsdWUnXHJcbiAgICA/IFNldFN0b3JlVmFsdWVQYXlsb2FkXHJcbiAgICA6IGFueTtcclxufTtcclxuXHJcbmludGVyZmFjZSBJX0lwY0FwaSB7XHJcbiAgb24oY2hhbm5lbDogc3RyaW5nLCBjYWxsYmFjazogR2VuZXJpY0Z1bmN0aW9uKTogdm9pZDtcclxuICByZW1vdmVMaXN0ZW5lcihjaGFubmVsOiBzdHJpbmcsIGNhbGxiYWNrOiBHZW5lcmljRnVuY3Rpb24pOiB2b2lkO1xyXG4gIHJlbW92ZUFsbExpc3RlbmVycyhjaGFubmVsOiBzdHJpbmcpOiB2b2lkO1xyXG4gIHNlbmQ8VCBleHRlbmRzIGtleW9mIElwY1BheWxvYWQ+KFxyXG4gICAgY2hhbm5lbDogVCxcclxuICAgIHBheWxvYWQ/OiBUIGV4dGVuZHMgJ3NldC1zdG9yZS12YWx1ZScgPyBTZXRTdG9yZVZhbHVlUGF5bG9hZCA6IGFueSxcclxuICApOiB2b2lkO1xyXG4gIGludm9rZTxQIGV4dGVuZHMgYW55IHwgYW55W10sIFQgZXh0ZW5kcyBrZXlvZiBJcGNQYXlsb2FkID0ga2V5b2YgSXBjUGF5bG9hZD4oXHJcbiAgICBjaGFubmVsOiBULFxyXG4gICAgcGF5bG9hZD86IFQgZXh0ZW5kcyAnc2V0LXN0b3JlLXZhbHVlJyA/IFNldFN0b3JlVmFsdWVQYXlsb2FkIDogYW55LFxyXG4gICk6IFByb21pc2U8SXBjSW52b2tlUmV0dXJuPFA+PjtcclxufVxyXG5cclxuZXhwb3J0IHsgSXBjQ2hhbm5lbHMgfTtcclxuXHJcbmV4cG9ydCB0eXBlIHsgSV9JcGNBcGksIElwY1BheWxvYWQsIFNldFN0b3JlVmFsdWVQYXlsb2FkLCBJcGNJbnZva2VSZXR1cm4gfTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZWxlY3Ryb25cIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGNvbnRleHRCcmlkZ2UgfSBmcm9tICdlbGVjdHJvbic7XHJcblxyXG5pbXBvcnQgeyBJX0VsZWN0cm9uQXBpIH0gZnJvbSAnc2hhcmVkL3R5cGVzJztcclxuaW1wb3J0IHsgaXBjQXBpIH0gZnJvbSAnLi9icmlkZ2VzL2lwYyc7XHJcblxyXG5jb25zdCBlbGVjdHJvbkFwaTogSV9FbGVjdHJvbkFwaSA9IHtcclxuICBpcGM6IGlwY0FwaSxcclxufTtcclxuXHJcbmNvbnRleHRCcmlkZ2UuZXhwb3NlSW5NYWluV29ybGQoJ2VsZWN0cm9uJywgZWxlY3Ryb25BcGkpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
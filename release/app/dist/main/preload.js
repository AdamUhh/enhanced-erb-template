!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var r=t();for(var o in r)("object"==typeof exports?exports:e)[o]=r[o]}}(global,(()=>(()=>{"use strict";var e={r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t);const r=require("electron");var o;!function(e){e.closeApp="close-app",e.minimizeApp="minimize-app",e.maximizeApp="maximize-app",e.isAppMaximized="is-app-maximized",e.restartApp="restart-app",e.clearStore="clear-store",e.toggleDevTools="toggle-dev-tools",e.checkForUpdates="check-for-updates",e.quitAndInstallUpdates="quit-and-install-updates",e.appUpdateInfo="app-update-info",e.toggleRendererErrorDialog="toggle-renderer-error-dialog",e.exportStoreData="export-store-data",e.importStoreData="import-store-data",e.loadStoreData="load-store-data",e.setStoreValue="set-store-value",e.getStoreValue="get-store-value",e.toggleExampleVisibility="toggle-example-visibility"}(o||(o={}));const i=Object.values(o),a=i.map((e=>`${e}-reply`)),n=[...i,...a];const s=(e,t="Error")=>{var r;return{success:!1,msg:t,payload:("string"==typeof(r=e)?r:r?.response?.data?JSON.stringify(r.response.data):r?.message?r.message:JSON.stringify(r))??""}},p={ipc:{on:(e,t)=>{n.includes(e)&&r.ipcRenderer.on(e,((e,...r)=>t(e,...r)))},removeListener:(e,t)=>{n.includes(e)&&r.ipcRenderer.removeListener(e,((e,...r)=>t(e,...r)))},removeAllListeners:e=>{n.includes(e)&&r.ipcRenderer.removeAllListeners(e)},send:(e,t)=>{n.includes(e)&&r.ipcRenderer.send(e,t)},invoke:(...e)=>new Promise(((t,o)=>{const[i,a]=e;n.includes(i)?r.ipcRenderer.invoke(i,a).then((e=>t(e))).catch((e=>o(s(e,"Error in invoke")))):o(s(i,"Invalid Channel"))}))}};return r.contextBridge.exposeInMainWorld("electron",p),t})()));
//# sourceMappingURL=preload.js.map
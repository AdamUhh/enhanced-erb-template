!function(e,o){if("object"==typeof exports&&"object"==typeof module)module.exports=o();else if("function"==typeof define&&define.amd)define([],o);else{var r=o();for(var t in r)("object"==typeof exports?exports:e)[t]=r[t]}}(global,(()=>(()=>{"use strict";var e={r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},o={};e.r(o);const r=require("electron");var t;!function(e){e.closeApp="close-app",e.minimizeApp="minimize-app",e.maximizeApp="maximize-app",e.restartApp="restart-app",e.clearStore="clear-store",e.checkForUpdates="check-for-updates",e.toggleDevTools="toggle-dev-tools",e.exportStoreData="export-store-data",e.importStoreData="import-store-data",e.loadStoreData="load-store-data",e.setStoreValue="set-store-value",e.getStoreValue="get-store-value"}(t||(t={}));const n=e=>`${e}-reply`,s=Object.values(t),a=s.map(n),i=[...s,...a],l={ipc:{on:(e,o)=>{i.includes(e)&&r.ipcRenderer.on(e,((e,...r)=>o(e,...r)))},removeListener:(e,o)=>{i.includes(e)&&r.ipcRenderer.removeListener(e,((e,...r)=>o(e,...r)))},removeAllListeners:e=>{i.includes(e)&&r.ipcRenderer.removeAllListeners(e)},send:(e,...o)=>{i.includes(e)&&r.ipcRenderer.send(e,...o)},invoke:(e,o)=>new Promise(((t,n)=>{i.includes(e)?r.ipcRenderer.invoke(e,o).then((e=>t(e))).catch((e=>n({success:!1,errorMsg:"Error",payload:e}))):n({success:!1,msg:"Invalid Channel",payload:e})}))}};return r.contextBridge.exposeInMainWorld("electron",l),o})()));
//# sourceMappingURL=preload.js.map
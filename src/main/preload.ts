import { contextBridge } from 'electron';

import { ipcApi } from './bridges/ipcRenderer';
import { I_ElectronApi } from '../shared/types/window';

const electronApi: I_ElectronApi = {
  ipc: ipcApi,
};

contextBridge.exposeInMainWorld('electron', electronApi);

import { contextBridge } from 'electron';

import { I_ElectronApi } from 'shared/types';
import { ipcApi } from './bridges/ipc';

const electronApi: I_ElectronApi = {
  ipc: ipcApi,
};

contextBridge.exposeInMainWorld('electron', electronApi);

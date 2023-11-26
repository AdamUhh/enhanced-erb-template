import { contextBridge } from 'electron';

import { ElectronApi } from '../shared/types';
import { ipcApi } from './bridges/ipc';

const electronApi: ElectronApi = {
  ipc: ipcApi,
};

contextBridge.exposeInMainWorld('electron', electronApi);

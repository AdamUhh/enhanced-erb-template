import { I_IpcApi } from './ipc';

export interface I_ElectronApi {
  ipc: I_IpcApi;
}

declare global {
  interface Window {
    electron: I_ElectronApi;
  }
}

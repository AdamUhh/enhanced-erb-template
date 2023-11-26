import { IpcApi } from './ipc';

export interface ElectronApi {
  ipc: IpcApi;
}

declare global {
  interface Window {
    electron: ElectronApi;
  }
}

import { I_IpcApi } from './ipc';

interface I_ElectronApi {
  ipc: I_IpcApi;
}

declare global {
  interface Window {
    electron: I_ElectronApi;
  }
}
export type { I_ElectronApi };

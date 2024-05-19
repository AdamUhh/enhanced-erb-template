import { IpcChannels } from 'shared/types/ipc';

export const restartApp = () => {
  window.electron.ipc.send(IpcChannels.restartApp);
};

export const closeApp = () => {
  window.electron.ipc.send(IpcChannels.closeApp);
};

export const minimizeApp = () => {
  window.electron.ipc.send(IpcChannels.minimizeApp);
};

export const maximizeApp = () => {
  window.electron.ipc.send(IpcChannels.maximizeApp);
};

export const toggleDevTools = () => {
  window.electron.ipc.send(IpcChannels.toggleDevTools);
};

export const clearStore = () => {
  window.electron.ipc.send(IpcChannels.clearStore);
};

export const checkForupdates = () => {
  window.electron.ipc.send(IpcChannels.checkForUpdates);
};

export const quitAndInstall = () => {
  window.electron.ipc.send(IpcChannels.quitAndInstallUpdates);
};

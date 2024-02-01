import { IpcChannels } from 'shared/types';

const restartApp = () => {
  window.electron.ipc.send(IpcChannels.restartApp);
};

const closeApp = () => {
  window.electron.ipc.send(IpcChannels.closeApp);
};

const minimizeApp = () => {
  window.electron.ipc.send(IpcChannels.minimizeApp);
};

const maximizeApp = () => {
  window.electron.ipc.send(IpcChannels.maximizeApp);
};

const toggleDevTools = () => {
  window.electron.ipc.send(IpcChannels.toggleDevTools);
};

const clearStore = () => {
  window.electron.ipc.send(IpcChannels.clearStore);
};

const checkForupdates = () => {
  window.electron.ipc.send(IpcChannels.checkForUpdates);
};

export {
  restartApp,
  closeApp,
  minimizeApp,
  maximizeApp,
  toggleDevTools,
  clearStore,
  checkForupdates,
};

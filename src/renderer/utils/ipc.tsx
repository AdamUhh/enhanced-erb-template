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

export { restartApp, closeApp, minimizeApp, maximizeApp };

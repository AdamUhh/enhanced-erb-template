import {
  dialog,
  ipcMain,
  OpenDialogOptions,
  SaveDialogOptions,
} from 'electron';
import fs from 'fs';

import { IpcChannels, SetStoreValuePayload } from '../shared/types';
import { getFailChannel, getSuccessChannel } from '../shared/utils/ipc';
import MainWindow from './mainWindow';
import Store from './store';

ipcMain.on(IpcChannels.clearStore, (event) => {
  try {
    Store.clear();
    event.reply(getSuccessChannel(IpcChannels.clearStore));
  } catch (error: any) {
    console.log('Failed to clear store', error);
    event.reply(getFailChannel(IpcChannels.clearStore), error.toString());
  }
});

ipcMain.on(IpcChannels.exportStoreData, async (event) => {
  const options: SaveDialogOptions = {
    buttonLabel: 'Export',
    defaultPath: 'store-data.json',
    filters: [
      { extensions: ['json'], name: 'json' },
      { extensions: ['*'], name: 'All Files' },
    ],
    title: 'Export Store Data',
  };

  try {
    const { canceled, filePath } = await dialog.showSaveDialog(options);
    if (canceled || !filePath) return;
    const data = JSON.stringify(Store.getStore());
    fs.writeFileSync(filePath, data);
    event.reply(getSuccessChannel(IpcChannels.exportStoreData));
  } catch (error: any) {
    console.log(`Failed to save file: ${IpcChannels.exportStoreData}`, error);
    event.reply(getFailChannel(IpcChannels.exportStoreData), error.toString());
  }
});

ipcMain.on(IpcChannels.importStoreData, async (event) => {
  const options: OpenDialogOptions = {
    buttonLabel: 'Import',
    filters: [
      { extensions: ['json'], name: 'json' },
      { extensions: ['*'], name: 'All Files' },
    ],
    title: 'Import Store Data',
  };

  try {
    const { canceled, filePaths } = await dialog.showOpenDialog(options);
    if (canceled || !filePaths.length) return;
    const filePath = filePaths[0];

    fs.readFile(filePath, 'utf-8', (err, jsonData) => {
      if (err) {
        throw err;
      }

      const data = JSON.parse(jsonData);

      if (data.__internal__) {
        delete data.__internal__;
      }

      Store.clear();
      Store.setStore(data);

      event.reply(getSuccessChannel(IpcChannels.importStoreData), data);
    });
  } catch (error: any) {
    console.log(`Failed to read file: ${IpcChannels.importStoreData}`, error);
    event.reply(getFailChannel(IpcChannels.importStoreData), error.toString());
  }
});

ipcMain.on(IpcChannels.loadStoreData, (event) => {
  try {
    const state = Store.getStore();
    event.reply(getSuccessChannel(IpcChannels.loadStoreData), state);
  } catch (error: any) {
    console.log(`Failed to load store`, error);
    event.reply(getFailChannel(IpcChannels.loadStoreData), error.toString());
  }
});

ipcMain.on(IpcChannels.restartApp, (event) => {
  try {
    console.log('Trying to restart app');
    MainWindow.getWebContents()?.reloadIgnoringCache();
    setTimeout(() => {
      event.reply(getSuccessChannel(IpcChannels.restartApp));
    }, 1000);
  } catch (error: any) {
    console.log('Failed to restart app', error);
    setTimeout(() => {
      event.reply(getFailChannel(IpcChannels.restartApp), error.toString());
    }, 1000);
  }
});

ipcMain.on(
  IpcChannels.setStoreValue,
  (event, { key, state }: SetStoreValuePayload) => {
    try {
      Store.set(key, state);
      event.reply(getSuccessChannel(IpcChannels.setStoreValue));
    } catch (error: any) {
      console.log(`Failed to set Store of key ${key}`, error);
      event.reply(getFailChannel(IpcChannels.setStoreValue), error.toString());
    }
  },
);

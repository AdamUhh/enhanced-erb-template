import {
  OpenDialogOptions,
  SaveDialogOptions,
  dialog,
  ipcMain,
} from 'electron';
import fs from 'fs';

import {
  IpcChannels,
  IpcInvokeReturn,
  LocalElectronStore,
  SetStoreValuePayload,
} from '../../shared/types';
import {
  replyFailure,
  replySuccess,
  returnIpcInvokeError,
} from '../../shared/utils/ipc';
import Store from '../store';
import MainWindow from '../mainWindow';

export default () => {
  ipcMain.on(IpcChannels.clearStore, (event) => {
    try {
      Store.clear();
      MainWindow.getWebContents()?.reloadIgnoringCache();
    } catch (error: any) {
      console.log('Failed to clear store', error);
      replyFailure(event, IpcChannels.clearStore, error.toString());
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
      replySuccess(event, IpcChannels.exportStoreData);
    } catch (error: any) {
      console.log(`Failed to save file: ${IpcChannels.exportStoreData}`, error);
      replyFailure(event, IpcChannels.exportStoreData, error.toString());
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

        replySuccess(event, IpcChannels.importStoreData, data);
      });
    } catch (error: any) {
      console.log(`Failed to read file: ${IpcChannels.importStoreData}`, error);
      replyFailure(event, IpcChannels.importStoreData, error.toString());
    }
  });

  ipcMain.on(IpcChannels.loadStoreData, (event) => {
    try {
      const state = Store.getStore();
      replySuccess(event, IpcChannels.setStoreValue, state);
    } catch (error: any) {
      console.log(`Failed to load store`, error);
      replyFailure(event, IpcChannels.loadStoreData, error.toString());
    }
  });

  ipcMain.on(
    IpcChannels.setStoreValue,
    (event, { key, state }: SetStoreValuePayload): void => {
      try {
        Store.set(key, state);
        replySuccess(
          event,
          IpcChannels.setStoreValue,
          'Successfully changed electron store value and redux value',
        );
      } catch (error: any) {
        console.log(`Failed to set Store of key ${key}`, error);
        replyFailure(event, IpcChannels.setStoreValue, error.toString());
        // dialog.showMessageBox({
        //   type: 'error',
        //   title: 'Wallpaper',
        //   message: `Failed to change desktop wallaper\n ${error.toString()}`,
        //   detail: error.toString(),
        //  });
      }
    },
  );

  ipcMain.handle(
    IpcChannels.setStoreValue,
    (event, { key, state }: SetStoreValuePayload): IpcInvokeReturn => {
      try {
        // replyInvokeSuccess(
        //   event,
        //   IpcChannels.setStoreValue,
        //   'Successfully changed electron store value and redux value',
        // );

        Store.set(key, state);
        return {
          success: true,
          msg: 'Successfully updated store',
          payload: state,
        };
      } catch (error: unknown) {
        // replyInvokeFailure(event, IpcChannels.setStoreValue, error.toString());
        return returnIpcInvokeError(error);
      }
    },
  );

  ipcMain.handle(
    IpcChannels.getStoreValue,
    (event, key: keyof LocalElectronStore): IpcInvokeReturn => {
      try {
        // replyInvokeSuccess(
        //   event,
        //   IpcChannels.setStoreValue,
        //   'Successfully changed electron store value and redux value',
        // );

        const res = Store.get(key);
        return {
          success: true,
          msg: 'Successfully retrieved store',
          payload: res,
        };
      } catch (error: unknown) {
        // replyInvokeFailure(event, IpcChannels.setStoreValue, error.toString());
        return returnIpcInvokeError(error);
      }
    },
  );
};

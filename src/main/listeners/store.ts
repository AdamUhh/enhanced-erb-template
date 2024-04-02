import { OpenDialogOptions, SaveDialogOptions, dialog } from 'electron';
import fs from 'fs-extra';

import { CoreElectronStore } from '../../shared/types/coreElectronStore';
import { IpcChannels } from '../../shared/types/ipc';
import { ipcMainHandle, ipcMainOn } from '../bridges/ipcMain';
import MainWindow from '../mainWindow';
import Store from '../store';
import { replySuccess, returnIpcInvokeError } from './util/ipcReplies';
import { SendErrorToRendererDialog } from './util/sendToRenderer';

export default () => {
  ipcMainOn(IpcChannels.clearStore, () => {
    try {
      Store.clear();
      MainWindow.getWebContents()?.reloadIgnoringCache();
    } catch (error: any) {
      SendErrorToRendererDialog('Failed to clear store', error);
    }
  });

  ipcMainOn(IpcChannels.exportStoreData, async () => {
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
    } catch (error: any) {
      SendErrorToRendererDialog('Failed to export file', error);
    }
  });

  ipcMainOn(IpcChannels.importStoreData, async () => {
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

        // replySuccess(event, IpcChannels.importStoreData, data);
      });
    } catch (error: any) {
      SendErrorToRendererDialog('Failed to read import file', error);
    }
  });

  ipcMainOn(IpcChannels.loadStoreData, (event) => {
    try {
      const state = Store.getStore();

      replySuccess(event, IpcChannels.loadStoreData, { payload: state });
    } catch (error: any) {
      SendErrorToRendererDialog('Failed to load store', error);
    }
  });

  ipcMainOn(IpcChannels.setStoreValue, (_, { key, state }) => {
    try {
      Store.set(key, state);
    } catch (error: any) {
      SendErrorToRendererDialog(`Failed to set Store of key ${key}`, error);
    }
  });

  ipcMainHandle(IpcChannels.setStoreValue, async (_, { key, state }) => {
    try {
      Store.set(key, state);
      return {
        success: true,
        msg: 'Successfully updated store',
        payload: state,
      };
    } catch (error: unknown) {
      return returnIpcInvokeError(error);
    }
  });

  ipcMainHandle(
    IpcChannels.getStoreValue,
    async (_, key: keyof CoreElectronStore) => {
      try {
        const res = Store.get(key);
        return {
          success: true,
          msg: 'Successfully retrieved store',
          payload: res,
        };
      } catch (error: unknown) {
        return returnIpcInvokeError(error);
      }
    },
  );
};

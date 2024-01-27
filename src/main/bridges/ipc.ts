import { ipcRenderer, IpcRendererEvent } from 'electron';
import { I_IpcApi, IpcChannels } from 'shared/types';
import { IpcInvokeReturn, IpcPayload } from 'shared/types/ipc';
import { getReplyChannel } from '../../shared/utils/ipc';

const baseValidChannels: IpcChannels[] = Object.values(IpcChannels);
// [
// IpcChannels.closeApp,
// IpcChannels.restartApp,
// IpcChannels.clearStore,
// IpcChannels.exportStoreData,
// IpcChannels.importStoreData,
// IpcChannels.loadStoreData,
// IpcChannels.setStoreValue,
// IpcChannels.getStoreValue,
// ];
// const failValidChannels = baseValidChannels.map(getFailChannel);
// const successValidChannels = baseValidChannels.map(getSuccessChannel);
// const validChannels = [
//   ...baseValidChannels,
//   ...failValidChannels,
//   ...successValidChannels,
// ];
const replyValidChannels = baseValidChannels.map(getReplyChannel);
const validChannels = [...baseValidChannels, ...replyValidChannels];

/**
 * Attaches an event listener to the specified IPC channel.
 * @param {string} channel - The IPC channel to listen on.
 * @param {function} func - The function to be executed when the event occurs.
 */
const on = (
  channel: string,
  func: (event: IpcRendererEvent, ...args: any[]) => void,
): void => {
  if (validChannels.includes(channel as IpcChannels)) {
    ipcRenderer.on(channel, (_, ...args) => func(_, ...args));
  }
};

/**
 * Removes an event listener from the specified IPC channel.
 * @param {string} channel - The IPC channel to remove the listener from.
 * @param {function} func - The function to be removed from the listeners.
 */
const removeListener = (
  channel: string,
  func: (event: IpcRendererEvent, ...args: any[]) => void,
): void => {
  if (validChannels.includes(channel as IpcChannels)) {
    ipcRenderer.removeListener(channel, (_, ...args) => func(_, ...args));
  }
};

/**
 * Removes all event listeners from the specified IPC channel.
 * @param {string} channel - The IPC channel to remove the listener from.
 */
const removeAllListeners = (channel: string): void => {
  if (validChannels.includes(channel as IpcChannels)) {
    ipcRenderer.removeAllListeners(channel);
  }
};

/**
 * Sends a message to the specified IPC channel.
 * @param {string} channel - The IPC channel to send the message to.
 * @param {any} payload - The data to be sent with the message.
 */
const send = <P extends any[]>(channel: string, ...payload: P): void => {
  if (validChannels.includes(channel as IpcChannels)) {
    ipcRenderer.send(channel, ...payload);
  }
};

/**
 * Sends a message to the specified IPC channel and back to renderer
 * @param {string} channel - The IPC channel to send the message to.
 * @param {any} payload - The data to be sent with the message.
 */
const invoke = <
  P extends any | any[],
  T extends keyof IpcPayload = keyof IpcPayload,
>(
  channel: T,
  payload?: T,
): Promise<IpcInvokeReturn<P>> =>
  new Promise((resolve, reject) => {
    if (validChannels.includes(channel as IpcChannels)) {
      ipcRenderer
        .invoke(channel, payload)
        .then((result: IpcInvokeReturn<P>) => resolve(result))
        .catch((error: unknown) =>
          // ? This will basically never get called due to how the system works
          // ? But ill keep it just in case :P
          reject({ success: false, errorMsg: 'Error', payload: error }),
        );
    } else {
      // Handle the case when the channel is not valid, e.g., throw an error
      reject({
        success: false,
        msg: 'Invalid Channel',
        payload: channel,
      });
    }
  });

export const ipcApi: I_IpcApi = {
  on,
  removeListener,
  removeAllListeners,
  send,
  invoke,
};

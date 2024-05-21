/**
 *
 * This file contains the typesafe ipcRenderer logic that is used on client/renderer side to be sent to main
 *
 */

import { ipcRenderer, IpcRendererEvent } from 'electron';
import {
  I_IpcApi,
  IpcChannels,
  IpcExpectedInput,
  IpcInvokeReturn,
  IpcPayloadInputLookup,
  IpcReturn,
} from '../../shared/types/ipc';
import { validChannels } from '../../shared/utils/channels';
import { returnIpcInvokeError } from '../listeners/util/ipcReplies';

/**
 * Attaches an event listener to the specified IPC channel.
 * @param channel - The IPC channel to listen on.
 * @param callback - The function to be executed when the event occurs.
 */
const on = (
  channel: IpcChannels,
  callback: (event: IpcRendererEvent, ...args: any[]) => void,
): void => {
  if (validChannels.includes(channel))
    ipcRenderer.on(channel, (_, ...args) => callback(_, ...args));
};

/**
 * Removes an event listener from the specified IPC channel.
 * @param channel - The IPC channel to remove the listener from.
 * @param callback - The function to be removed from the listeners.
 */
const removeListener = (
  channel: IpcChannels,
  callback: (event: IpcRendererEvent, ...args: any[]) => void,
): void => {
  if (validChannels.includes(channel))
    ipcRenderer.removeListener(channel, (_, ...args) => callback(_, ...args));
};

/**
 * Removes all event listeners from the specified IPC channel.
 * @param channel - The IPC channel to remove the listener from.
 */
const removeAllListeners = (channel: IpcChannels): void => {
  if (validChannels.includes(channel)) ipcRenderer.removeAllListeners(channel);
};

/**
 * Typesafe IPC method that sends a `send` message to the specified IPC channel.
 * @param channel - The IPC channel to send the message to.
 * @param payload - The data to be sent with the message.
 */
const send = <T extends IpcChannels>(
  channel: T,
  payload?: IpcExpectedInput<T>,
): void => {
  if (validChannels.includes(channel)) ipcRenderer.send(channel, payload);
};

/**
 * Typesafe IPC method that sends an `invoke` message to the specified IPC channel and returns a response back (to the renderer)
 * @param channel - The IPC channel to send the message to.
 * @param payload - The data to be sent with the message.
 */
const invoke = <T extends IpcChannels>(
  ...args: T extends keyof IpcPayloadInputLookup
    ? [channel: T, payload?: IpcExpectedInput<T>]
    : [channel: T]
): Promise<IpcReturn<T>> =>
  new Promise((resolve, reject) => {
    const [channel, payload] = args;
    if (validChannels.includes(channel)) {
      ipcRenderer
        .invoke(channel, payload)
        .then((result: IpcInvokeReturn<T>) => resolve(result))
        .catch((error: unknown) =>
          reject(returnIpcInvokeError(error, 'Error in invoke')),
        );
    } else {
      reject(returnIpcInvokeError(channel, 'Invalid Channel'));
    }
  });

export const ipcApi: I_IpcApi = {
  on,
  removeListener,
  removeAllListeners,
  send,
  invoke,
};

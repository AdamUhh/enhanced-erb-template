/**
 *
 * This file contains the typesafe ipcMain logic that is used on main side
 *
 */

import { IpcMainEvent, IpcMainInvokeEvent, ipcMain } from 'electron';
import {
  IpcChannels,
  IpcExpectedReturnLookup,
  IpcInputConditional,
  IpcReturn,
} from '../../shared/types/ipc';
import { baseValidChannels } from '../../shared/utils/channels';

/**
 * Typesafe IPC method that listens to an `on` request from a specified IPC channel.
 * @param {string} channel - The IPC channel to listen to.
 * @param {any} callback - The function to call when an IPC event is received.
 */
export const ipcMainOn = <T extends IpcChannels>(
  channel: T,
  callback: (
    event: IpcMainEvent,
    payload: IpcInputConditional<T>,
  ) => T extends keyof IpcExpectedReturnLookup
    ? IpcExpectedReturnLookup[T]
    : void,
) => {
  if (baseValidChannels.includes(channel))
    ipcMain.on(channel, (event, payload) => callback(event, payload));
};

/**
 * Typesafe IPC method that listens to a `handle` request from a specified IPC channel.
 * @param {string} channel - The IPC channel to listen to.
 * @param {any} callback - The function to call when an IPC event is received.
 */
export const ipcMainHandle = <T extends IpcChannels>(
  channel: T,
  callback: (
    event: IpcMainInvokeEvent,
    payload: IpcInputConditional<T>,
  ) => Promise<IpcReturn<T>>,
) => {
  if (baseValidChannels.includes(channel))
    ipcMain.handle(channel, (event, payload) => callback(event, payload));
};

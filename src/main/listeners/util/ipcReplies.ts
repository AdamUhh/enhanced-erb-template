import { IpcMainEvent } from 'electron';
import {
  IpcChannels,
  IpcInvokeErrorReturn,
  IpcInvokeReturn,
} from '../../../shared/types/ipc';
import { getReplyChannel } from '../../../shared/utils/getReplyChannel';
import { stringifyObj } from '../../../shared/utils/stringifyObj';

/** Sends a success object to the same renderer frame that sent the original request
 *
 * Requires a `*-reply` channel that is listening
 *
 * Provided channel is automatically converted into a `*-reply` channel
 *
 * Used in ipcMain.on() listeners
 *
 * Useful if you want some component to run code after a success for a specific channel
 */
export const replySuccess = (
  event: IpcMainEvent,
  channel: IpcChannels,
  payload?: { msg?: string; payload?: any },
) => {
  event.reply(getReplyChannel(channel), {
    success: true,
    msg: payload?.msg ?? '',
    payload: payload?.payload ?? undefined,
  } as IpcInvokeReturn);
};

/** Sends a failure object to the same renderer frame that sent the original request
 *
 * Requires a `*-reply` channel that is listening,
 *
 * Provided channel is automatically converted into a `*-reply` channel
 *
 * Used in ipcMain.on() listeners
 *
 * Useful if you want some component to run code after a failure for a specific channel
 *
 */
export const replyFailure = (
  event: IpcMainEvent,
  channel: IpcChannels,
  payload?: { msg?: string; payload?: any },
) => {
  console.log(
    `Oops, there was an error on channel: ${channel}${
      payload?.msg && `\n->Message:\n${payload.msg}`
    } ${payload?.payload && `\n-> Payload:\n ${payload.payload}`}\n`,
  );
  event.reply(getReplyChannel(channel), {
    success: false,
    msg: payload?.msg ?? '',
    payload: payload?.payload ?? undefined,
  } as IpcInvokeErrorReturn);
};

/** Returns a failure object to the ipc that called the invoke
 *
 * Suited for ipcMain.handle() listeners
 *
 * @param error Stringified Error object (most likely from catch statement)
 * @param msg Custom error message
 * @returns Standard invoke return object; {success: boolean, msg: string, payload: string}
 */
export const returnIpcInvokeError = (
  error: any,
  msg: string = 'Error',
): IpcInvokeErrorReturn => {
  const errorStr = stringifyObj(error);
  return {
    success: false,
    msg,
    payload: errorStr ?? '',
  };
};

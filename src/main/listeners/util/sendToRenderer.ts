/**
 *
 * Function is in separate file due to import of MainWindow
 *
 * IMPORTANT: DO NOT IMPORT IN ANY RENDERER FILE
 *
 * For example, inside bridges, returnIpcInvokeError was imported, but since it used to contain MainWindow
 * electron/node removed a `vm` from the renderer, which completely broke the app from packaging
 * Error: The vm module of Node.js is deprecated in the renderer process and will be removed
 *
 */

import { IpcChannels, IpcErrorReturnFormat } from '../../../shared/types/ipc';
import MainWindow from '../../mainWindow';
import { stringifyObj } from '../../../shared/utils/stringifyObj';

/** Sends a failure object to the renderer.
 *
 * Requires a `*-reply` channel that is listening.
 *
 * Provided `channel` is automatically converted into a `*-reply` channel.
 *
 * Can be used anywhere.
 *
 * Useful for general error logs to the renderer.
 *
 * @param title - The title of the error.
 * @param message - The detailed error message (optional).
 */
export function SendErrorToRendererDialog(
  title: string = '',
  message: string = '',
) {
  const payloadMsg = stringifyObj(message);

  console.log(
    `Oops, there was an error: \n-> ${title} ${
      payloadMsg && `\n-> Details:\n ${payloadMsg}`
    }\n`,
  );

  MainWindow.sendToRenderer(IpcChannels.toggleRendererErrorDialog, {
    success: false,
    msg: title,
    payload: payloadMsg,
  } as IpcErrorReturnFormat);
}

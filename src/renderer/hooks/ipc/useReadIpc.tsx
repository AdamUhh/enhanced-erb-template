import { useCallback } from 'react';
import { GenericVoidFunction, IpcChannels } from 'shared/types';
import { getReplyChannel } from 'shared/utils/ipc';
import { useIpcEffect } from './utils';

/**
 * Used to send an IPC request and handle its success/failure reply.
 * @param {IpcChannels} options.channel - The IPC channel to read.
 * @param {GenericVoidFunction} [options.failCallback] - Callback to be invoked on failure.
 * @param {GenericVoidFunction} [options.successCallback] - Callback to be invoked on success.
 * @returns {Function} A callback function to send a message through IPC.
 */
function useReadIpc({
  channel,
  failCallback = () => {},
  successCallback = () => {},
}: {
  channel: IpcChannels;
  failCallback?: GenericVoidFunction;
  successCallback?: GenericVoidFunction;
}): Function {
  // ? Attach an IPC effect for handling success/failure events.
  useIpcEffect({
    channel: getReplyChannel(channel),
    successCallback,
    failCallback,
  });

  // ? Returns a memoized callback function to send a message through IPC.
  return useCallback(() => window.electron.ipc.send(channel), [channel]);
}

export { useReadIpc };

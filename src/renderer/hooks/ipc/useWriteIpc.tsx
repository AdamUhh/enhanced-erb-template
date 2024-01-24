import { useCallback } from 'react';
import { GenericVoidFunction, IpcChannels } from 'shared/types';
import { getFailChannel, getSuccessChannel } from 'shared/utils/ipc';
import { useIpcEffect } from './utils';

/**
 * Used to send an IPC request with a payload and handle its success/failure reply.
 * @param {IpcChannels} options.channel - The IPC channel to read.
 * @param {GenericVoidFunction} [options.failCallback] - Callback to be invoked on failure.
 * @param {GenericVoidFunction} [options.successCallback] - Callback to be invoked on success.
 * @param {GenericVoidFunction} [options.payload] - payload attached to request
 * @returns {Function} A callback function to send a message with payload through IPC.
 */
function useWriteIpc<P = undefined>({
  channel,
  failCallback,
  payload,
  successCallback,
}: {
  channel: IpcChannels;
  failCallback: GenericVoidFunction;
  payload?: P;
  successCallback: GenericVoidFunction;
}): Function {
  // ? Attach an IPC effect for handling failure events.
  useIpcEffect(getFailChannel(channel), failCallback);

  // ? Attach an IPC effect for handling success events.
  useIpcEffect(getSuccessChannel(channel), successCallback);

  // ? Returns a memoized callback function to send a message with payload through IPC.
  return useCallback(
    () => window.electron.ipc.send(channel, payload),
    [channel, payload],
  );
}

export { useWriteIpc };

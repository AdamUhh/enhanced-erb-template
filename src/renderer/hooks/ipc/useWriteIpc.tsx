import { useCallback } from 'react';
import { GenericVoidFunction, IpcChannels } from 'shared/types';
import { getReplyChannel } from '../../../main/util/ipc';
import { useIpcEffect } from './useIpcEffect';

/**
 * Used to send an IPC request with a payload and handle its success/failure reply.
 * @param options.channel - The IPC channel to read.
 * @param options.failCallback - Callback to be invoked on failure.
 * @param options.successCallback - Callback to be invoked on success.
 * @param options.payload - optional payload attached to request
 * @returns A callback function to send a message with payload through IPC.
 */
function useWriteIpc<P = undefined>({
  channel,
  failCallback,
  successCallback,
  payload,
}: {
  channel: IpcChannels;
  failCallback: GenericVoidFunction;
  successCallback: GenericVoidFunction;
  payload?: P;
}) {
  // ? Attach an IPC effect for handling success/failure events.
  useIpcEffect({
    channel: getReplyChannel(channel),
    successCallback,
    failCallback,
  });

  // ? Returns a memoized callback function to send a message with payload through IPC.
  return useCallback(
    () => window.electron.ipc.send(channel, payload),
    [channel, payload],
  );
}

export { useWriteIpc };

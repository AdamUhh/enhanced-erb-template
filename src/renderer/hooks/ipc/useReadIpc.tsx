import { useCallback } from 'react';
import { GenericVoidFunction, IpcChannels } from 'shared/types';
import { getReplyChannel } from '../../../main/util/ipc';
import { useIpcEffect } from './useIpcEffect';

/**
 * Used to send an IPC request and handle its success/failure reply.
 * @param options.channel - The IPC channel to read.
 * @param options.failCallback - Callback to be invoked on failure.
 * @param options.successCallback - Callback to be invoked on success.
 * @returns A callback function to send a message through IPC.
 */
function useReadIpc({
  channel,
  failCallback = () => {},
  successCallback = () => {},
}: {
  channel: IpcChannels;
  failCallback?: GenericVoidFunction;
  successCallback?: GenericVoidFunction;
}) {
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

import { useCallback } from 'react';
import { GenericVoidFunction } from 'shared/types/generic';
import { IpcChannels, IpcInputConditional } from 'shared/types/ipc';
import { getReplyChannel } from 'shared/utils/getReplyChannel';
import { useListenIpc } from './useListenIpc';

/**
 * Used to send an IPC request with a payload and handle its success/failure reply.
 * @param options.channel - The IPC channel to read.
 * @param options.failCallback - Callback to be invoked on failure.
 * @param options.successCallback - Callback to be invoked on success.
 * @param options.payload - optional payload attached to request
 * @returns A callback function to send a message with payload through IPC.
 */
export function useWriteIpc<P extends IpcChannels>({
  channel,
  payload,
  failCallback,
  successCallback,
}: {
  channel: P;
  payload: IpcInputConditional<P>;
  failCallback: GenericVoidFunction;
  successCallback: GenericVoidFunction;
}) {
  // ? Attach an IPC effect for handling success/failure events.
  useListenIpc({
    channel: getReplyChannel(channel) as IpcChannels,
    successCallback,
    failCallback,
  });

  // ? Returns a memoized callback function to send a message with payload through IPC.
  return useCallback(
    () => window.electron.ipc.send(channel as any, payload),
    [channel, payload],
  );
}

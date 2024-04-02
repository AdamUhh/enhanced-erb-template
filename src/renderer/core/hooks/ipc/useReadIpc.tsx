import { useCallback } from 'react';
import { noop } from 'shared/types/generic';
import { IpcChannels, IpcExpectedPayload } from 'shared/types/ipc';
import { useReplyListenIpc } from './useReplyListenIpc';

/**
 * Used to send an IPC request and handle its success/failure reply.
 * @param options.channel - The IPC channel to read.
 * @param options.failCallback - Callback to be invoked on failure.
 * @param options.successCallback - Callback to be invoked on success.
 * @returns A callback function to send a message through IPC.
 */
export function useReadIpc<P extends IpcChannels>({
  channel,
  failCallback = noop,
  successCallback = noop,
}: {
  channel: P;
  failCallback?: (msg: string, payload?: any) => void;
  successCallback?: (msg: string, payload: IpcExpectedPayload<P>) => void;
}) {
  // ? Attach an IPC reply listener for handling success/failure events.
  useReplyListenIpc({
    channel,
    successCallback,
    failCallback,
  });
  // ? Returns a memoized callback function to send a message through IPC.
  return useCallback(() => window.electron.ipc.send(channel as any), [channel]);
}

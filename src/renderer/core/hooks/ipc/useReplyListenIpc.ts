import { useEffect } from 'react';
import { noop } from 'shared/types/generic';
import {
  IpcChannels,
  IpcInvokeReturn,
  IpcExpectedPayload,
} from 'shared/types/ipc';
import { getReplyChannel } from 'shared/utils/getReplyChannel';

/** Used to listen to a `*-reply` channel and call a callback depending on the payload.success
 *
 * Automatically converts channel to a `*-reply` channel
 */
export function useReplyListenIpc<P extends IpcChannels>({
  channel,
  failCallback = noop,
  successCallback = noop,
}: {
  channel: P;
  failCallback?: (msg: string, payload?: any) => void;
  successCallback?: (msg: string, payload: IpcExpectedPayload<P>) => void;
}) {
  useEffect(() => {
    const replyChannel = getReplyChannel(channel);

    const callback = (_: any, data: IpcInvokeReturn<IpcExpectedPayload<P>>) => {
      const callbackFunction = data.success ? successCallback : failCallback;
      callbackFunction(data.msg || '', data.payload);
    };

    window.electron.ipc.on(replyChannel, callback);

    return () => window.electron.ipc.removeListener(replyChannel, callback);
  }, [channel, successCallback, failCallback]);
}

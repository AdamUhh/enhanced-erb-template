import { useEffect } from 'react';
import { noop } from 'shared/types/generic';
import {
  IpcChannels,
  IpcExpectedPayload,
  IpcInvokeReturn,
} from 'shared/types/ipc';

/** Used to listen to a channel and call a callback depending on the payload.success */
export function useListenIpc<P extends IpcChannels>({
  channel,
  failCallback = noop,
  successCallback = noop,
}: {
  channel: P;
  failCallback?: (msg: string, payload?: any) => void;
  successCallback?: (msg: string, payload?: IpcExpectedPayload<P>) => void;
}) {
  useEffect(() => {
    const callback = (_: any, data: IpcInvokeReturn<IpcExpectedPayload<P>>) => {
      const callbackFunction = data.success ? successCallback : failCallback;
      callbackFunction(data.msg || '', data.payload || undefined);
    };

    window.electron.ipc.on(channel, callback);

    return () => window.electron.ipc.removeListener(channel, callback);
  }, [channel, successCallback, failCallback]);
}

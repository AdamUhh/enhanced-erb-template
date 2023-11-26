import { useCallback } from 'react';

import { GenericVoidFunction, IpcChannels } from 'shared/types';
import { getFailChannel, getSuccessChannel } from 'shared/utils/ipc';
import { useIpcEffect } from './utils';

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
}) {
  useIpcEffect(getSuccessChannel(channel), successCallback);
  useIpcEffect(getFailChannel(channel), failCallback);

  return useCallback(
    () => window.electron.ipc.send(channel, payload),
    [channel, payload],
  );
}

export { useWriteIpc };

import { useCallback } from 'react';

import { GenericVoidFunction, IpcChannels } from 'shared/types';
import { getFailChannel, getSuccessChannel } from 'shared/utils/ipc';
import { useIpcEffect } from './utils';

function useReadIpc({
  channel,
  failCallback,
  successCallback,
}: {
  channel: IpcChannels;
  failCallback?: GenericVoidFunction;
  successCallback?: GenericVoidFunction;
}) {
  useIpcEffect(getFailChannel(channel), failCallback);
  useIpcEffect(getSuccessChannel(channel), successCallback);

  return useCallback(() => window.electron.ipc.send(channel), [channel]);
}

export { useReadIpc };

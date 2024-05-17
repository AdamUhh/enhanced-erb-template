import { useCallback } from 'react';
import { IpcChannels, IpcExpectedInput } from 'shared/types/ipc';
import { FailCallbackType, SuccessCallbackType } from './type';
import useIpcListener from './useIpcListener';

type IpcSenderProps<P extends IpcChannels> = {
  channel: P;
  failCallback?: ({ msg, description, payload }: FailCallbackType<P>) => void;
  successCallback?: ({
    msg,
    description,
    payload,
  }: SuccessCallbackType<P>) => void;
};

/**
 * Sends an IPC message and handles its response via a reply channel, using provided success/failure callbacks
 *
 * Note: You can define successCallback as a useCallback for `better performance` as it `minimizes mounts & unmounts`.
 *
 * For useCallback parameter typesafety, you can use:
 *
 * `useCallback((_msg: string, payload: IpcSendPayloadOutput<IpcChannels.searchRequest>) => {...}`
 *
 * where IpcChannels is an identical channel as the one in your useIpcSender implementation
 */
export default function useIpcSender<P extends IpcChannels>({
  channel,
  failCallback,
  successCallback,
}: IpcSenderProps<P>) {
  useIpcListener({ channel, failCallback, successCallback });

  const sendMessage = useCallback(
    (payload: IpcExpectedInput<P>) => {
      if (payload) window.electron.ipc.send(channel as any, payload);
      else window.electron.ipc.send(channel as any);
    },
    [channel],
  );

  return { sendMessage };
}

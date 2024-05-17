import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import {
  IpcChannels,
  IpcReturnFormat,
  IpcSendPayloadOutput,
  IpcSendReturn,
} from 'shared/types/ipc';
import { getReplyChannel } from 'shared/utils/getReplyChannel';
import { FailCallbackType, SuccessCallbackType } from './type';

type IpcSenderProps<P extends IpcChannels> = {
  channel: P;
  failCallback?: ({ msg, description, payload }: FailCallbackType<P>) => void;
  successCallback?: ({
    msg,
    description,
    payload,
  }: SuccessCallbackType<P>) => void;
};

type IpcSenderStateProps<T, P extends IpcChannels> = Dispatch<
  SetStateAction<T | IpcReturnFormat<IpcSendPayloadOutput<P>> | null>
>;

/**
 * Listens for an IPC response on a `*-reply` channel
 *
 * Automatically converts channel to a `*-reply` channel
 */
export default function useIpcListener<T, P extends IpcChannels>(
  { channel, failCallback, successCallback }: IpcSenderProps<P>,
  setResponse?: IpcSenderStateProps<T, P>,
) {
  const listenerRef = useRef<((_: any, data: IpcSendReturn<P>) => void) | null>(
    null,
  );

  useEffect(() => {
    const replyChannel = getReplyChannel(channel);
    const callback = (
      _: any,
      data: IpcReturnFormat<IpcSendPayloadOutput<P>>,
    ) => {
      const callbackFunction = data.success ? successCallback : failCallback;
      if (callbackFunction)
        callbackFunction({
          msg: data.msg || '',
          description: data.description || '',
          payload: data.payload,
        });
      if (setResponse) setResponse(data);
    };

    if (!listenerRef.current) {
      // Add the listener only if it doesn't exist
      listenerRef.current = callback;
      window.electron.ipc.on(replyChannel, callback);
    }

    return () => {
      if (listenerRef.current) {
        window.electron.ipc.removeAllListeners(replyChannel);
        listenerRef.current = null;
      }
    };
  }, [channel, failCallback, setResponse, successCallback]);
}

import { useEffect } from 'react';
import {
  IpcChannels,
  IpcExpectedInput,
  IpcSendPayloadOutput,
} from 'shared/types/ipc';
import useIpcListener from './useIpcListener';

type IpcOnMountListenerProps<P extends IpcChannels> = {
  channel: P;
  payload?: IpcExpectedInput<P>; // Optional payload for IPC send
  failCallback?: (msg: string, payload?: any) => void;
  successCallback?: (msg: string, payload: IpcSendPayloadOutput<P>) => void;
};

/**
 * Sends an IPC message on mount and listens for a response on a reply channel
 */
export default function useIpcOnMountListener<P extends IpcChannels>({
  channel,
  payload,
  failCallback,
  successCallback,
}: IpcOnMountListenerProps<P>) {
  useIpcListener({
    channel,
    failCallback,
    successCallback,
  });

  useEffect(() => {
    // Send the IPC message on component mount
    if (payload) window.electron.ipc.send(channel as any, payload);
    else window.electron.ipc.send(channel as any);

    // Cleanup is handled by the useIpcListener's useEffect
  }, [channel, payload]);
}

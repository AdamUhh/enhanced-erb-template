import {
  IpcChannels,
  IpcPayloadOutput,
  IpcSendPayloadOutput,
} from 'shared/types/ipc';

export type FailCallbackType<P extends IpcChannels> = {
  msg: string;
  description?: string;
  payload?: IpcSendPayloadOutput<P>;
};

export type SuccessCallbackType<P extends IpcChannels> = {
  msg?: string;
  description?: string;
  payload: IpcSendPayloadOutput<P>;
};

export type FailCallbackInvokeType<P extends IpcChannels> = {
  msg: string;
  description?: string;
  payload?: IpcPayloadOutput<P>;
};

export type SuccessCallbackInvokeType<P extends IpcChannels> = {
  msg?: string;
  description?: string;
  payload: IpcPayloadOutput<P>;
};

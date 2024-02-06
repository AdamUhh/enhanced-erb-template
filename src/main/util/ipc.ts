import { IpcMainEvent, IpcMainInvokeEvent } from 'electron';
import { IpcChannels, IpcInvokeReturn } from '../../shared/types/ipc';

export const getReplyChannel = (channel: IpcChannels) => `${channel}-reply`;

export const replySuccess = (
  event: IpcMainEvent,
  channel: IpcChannels,
  payload?: any,
) => {
  event.reply(getReplyChannel(channel), {
    success: true,
    ...(payload && { payload }),
  });
};

export const replyFailure = (
  event: IpcMainEvent,
  channel: IpcChannels,
  payload?: any,
) => {
  event.reply(getReplyChannel(channel), {
    success: false,
    ...(payload && { payload }),
  });
};

export const replyInvokeSuccess = (
  event: IpcMainInvokeEvent,
  channel: IpcChannels,
  payload?: any,
) => {
  event.sender.send(getReplyChannel(channel), {
    success: true,
    ...(payload && { payload }),
  });
};

export const replyInvokeFailure = (
  event: IpcMainInvokeEvent,
  channel: IpcChannels,
  payload?: any,
) => {
  event.sender.send(getReplyChannel(channel), {
    success: false,
    ...(payload && { payload }),
  });
};

export const returnIpcInvokeError = (
  error: any,
  msg: string = 'Failed to update store',
): IpcInvokeReturn => {
  let errorStr: string = '';

  if (typeof error === 'string') {
    errorStr = error;
  } else if (error?.response?.data) {
    errorStr = JSON.stringify(error.response.data);
  } else if (error?.message || error instanceof Error) {
    errorStr = error.message;
  } else {
    errorStr = JSON.stringify(error);
  }

  return {
    success: false,
    msg,
    ...(errorStr && { payload: errorStr }),
  };
};

import { IpcMainEvent, IpcMainInvokeEvent } from 'electron';
import { IpcChannels } from 'shared/types';
import { IpcInvokeReturn } from 'shared/types/ipc';

const getFailChannel = (channel: IpcChannels) => `${channel}-fail`;

const getSuccessChannel = (channel: IpcChannels) => `${channel}-success`;

const getReplyChannel = (channel: IpcChannels) => `${channel}-reply`;

const replySuccess = (
  event: IpcMainEvent,
  channel: IpcChannels,
  payload?: any,
) => {
  event.reply(getReplyChannel(channel), {
    success: true,
    ...(payload && { payload }),
  });
};

const replyFailure = (
  event: IpcMainEvent,
  channel: IpcChannels,
  payload?: any,
) => {
  event.reply(getReplyChannel(channel), {
    success: false,
    ...(payload && { payload }),
  });
};

const replyInvokeSuccess = (
  event: IpcMainInvokeEvent,
  channel: IpcChannels,
  payload?: any,
) => {
  event.sender.send(getReplyChannel(channel), {
    success: true,
    ...(payload && { payload }),
  });
};

const replyInvokeFailure = (
  event: IpcMainInvokeEvent,
  channel: IpcChannels,
  payload?: any,
) => {
  event.sender.send(getReplyChannel(channel), {
    success: false,
    ...(payload && { payload }),
  });
};

const returnIpcInvokeError = (
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

export {
  getFailChannel,
  getSuccessChannel,
  getReplyChannel,
  replySuccess,
  replyFailure,
  replyInvokeSuccess,
  replyInvokeFailure,
  returnIpcInvokeError,
};

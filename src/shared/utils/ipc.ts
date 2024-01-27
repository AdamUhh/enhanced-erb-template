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

const returnIpcInvokeError = (error: unknown): IpcInvokeReturn => {
  if (typeof error === 'string')
    return {
      success: false,
      msg: 'Failed to updated store',
      payload: error,
    };
  if (error instanceof Error)
    return {
      success: false,
      msg: 'Failed to updated store',
      payload: error.message,
    };
  return {
    success: false,
    msg: 'Failed to updated store',
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

import { IpcMainEvent, IpcMainInvokeEvent } from 'electron';
import { IpcChannels } from 'shared/types';

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

export {
  getFailChannel,
  getSuccessChannel,
  getReplyChannel,
  replySuccess,
  replyFailure,
  replyInvokeSuccess,
  replyInvokeFailure,
};

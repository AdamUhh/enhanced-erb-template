import { IpcChannels } from 'shared/types/ipc';

/** Converts base channels to a `*-reply` channel */
export const getReplyChannel = (channel: IpcChannels) => `${channel}-reply`;

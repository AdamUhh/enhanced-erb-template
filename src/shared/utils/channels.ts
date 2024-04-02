import { IpcChannels } from '../types/ipc';
import { getReplyChannel } from './getReplyChannel';

export const baseValidChannels: IpcChannels[] = Object.values(IpcChannels);
export const replyValidChannels = baseValidChannels.map(getReplyChannel);
export const validChannels = [...baseValidChannels, ...replyValidChannels];

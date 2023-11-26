import { IpcChannels } from 'shared/types';

export const getFailChannel = (channel: IpcChannels) => `${channel}-fail`;

export const getSuccessChannel = (channel: IpcChannels) => `${channel}-success`;

// // ? This Ipc will

// import { useCallback } from 'react';

// import type { Dispatch } from '@reduxjs/toolkit';
// import { GenericVoidFunction } from 'shared/types';
// import { getFailChannel, getSuccessChannel } from 'shared/utils/ipc';
// import { useIpcEffect } from './utils';

// function useDispatchIpc<P = undefined>({
//   dispatch: _dispatch,
//   failCallback,
//   payload,
//   successCallback,
// }: {
//   dispatch: Dispatch;
//   payload?: P;
//   failCallback: GenericVoidFunction;
//   successCallback: GenericVoidFunction;
// }) {
//   useIpcEffect(getSuccessChannel(channel), successCallback);
//   useIpcEffect(getFailChannel(channel), failCallback);

//   dispatc;
// }

// export { useDispatchIpc };

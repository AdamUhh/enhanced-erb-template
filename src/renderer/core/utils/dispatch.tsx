import { Dispatch } from '@reduxjs/toolkit';

import {
  IpcChannels,
  IpcExpectedPayloadReturn,
  IpcInvokeErrorReturn,
  IpcReturn,
} from 'shared/types/ipc';
import { displayErrorToast, displaySuccessToast } from './displayToast';

/**
 * A function to dispatch an action and handle success and failure callbacks.
 * @param dispatch - The Redux dispatch function.
 * @param dispatchAction - The (dispatch) action to dispatch.
 * @param callbacks.successCallback - The callback function to invoke upon successful action dispatch.
 * @param callbacks.failCallback - The callback function to invoke upon failed action dispatch.
 */
export const dispatchInvokeWithCallback = <T extends IpcChannels>(
  dispatch: Dispatch,
  dispatchAction: any,
  {
    successCallback = displaySuccessToast,
    failCallback = displayErrorToast,
  }: {
    successCallback?: (
      msg: string,
      payload: IpcExpectedPayloadReturn<T>,
    ) => void;
    failCallback?: (error: string, payload?: string) => void;
  } = {},
) => {
  dispatch(dispatchAction)
    .then((res: { payload: IpcReturn<T> }) => {
      if (res.payload.success)
        return successCallback(res.payload.msg, res.payload.payload);
      return failCallback(
        res.payload.msg,
        (res.payload as IpcInvokeErrorReturn).payload,
      );
    })
    .catch((error: string) => failCallback(error));
};

/**
 * A function to dispatch an action and handle failure callbacks.
 * @param dispatch - The Redux dispatch function.
 * @param dispatchAction - The (dispatch) action to dispatch.
 * @param callbacks.failCallback - The callback function to invoke upon failed action dispatch.
 */
export const dispatchInvoke = (
  dispatch: Dispatch,
  dispatchAction: any,
  {
    failCallback = displayErrorToast,
  }: {
    failCallback?: (error: string, payload?: unknown) => void;
  } = {},
) => {
  dispatch(dispatchAction)
    .then((res: { payload: IpcInvokeErrorReturn }) => {
      if (!res.payload.success) {
        failCallback(
          res.payload.msg,
          (res.payload as IpcInvokeErrorReturn).payload,
        );
      }
    })
    .catch((error: string) => {
      failCallback(error);
    });
};

import { Dispatch } from '@reduxjs/toolkit';
import { displayErrorToast, displaySuccessToast } from './toast';

/**
 * A function to dispatch an action and handle success and failure callbacks.
 * @param dispatch - The Redux dispatch function.
 * @param dispatchAction - The (dispatch) action to dispatch.
 * @param callbacks.successCallback - The callback function to invoke upon successful action dispatch.
 * @param callbacks.failCallback - The callback function to invoke upon failed action dispatch.
 */
export const dispatchInvokeWithCallback = (
  dispatch: Dispatch,
  dispatchAction: any,
  {
    successCallback = displaySuccessToast,
    failCallback = displayErrorToast,
  }: {
    successCallback?: (msg: string, payload: any) => void;
    failCallback?: (error: string, payload?: any) => void;
  } = {},
) => {
  dispatch(dispatchAction)
    .then(
      (res: { payload: { success: boolean; msg: string; payload: any } }) => {
        if (res.payload.success)
          return successCallback(res.payload.msg, res.payload.payload);
        return failCallback(res.payload.msg, res.payload.payload);
      },
    )
    .catch((error: string) => failCallback(error));
};

/**
 * A function to dispatch an action and handle success and failure callbacks.
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
    failCallback?: (error: string, payload?: any) => void;
  } = {},
) => {
  dispatch(dispatchAction).catch((error: string) => failCallback(error));
};

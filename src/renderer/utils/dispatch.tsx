import { Dispatch } from '@reduxjs/toolkit';
import { displayErrorToast, displaySuccessToast } from './toast';

/**
 * A function to dispatch an action and handle success and failure callbacks.
 * @param dispatch - The Redux dispatch function.
 * @param dispatchAction - The action to dispatch.
 * @param callbacks.successCallback - The callback function to invoke upon successful action dispatch.
 * @param callbacks.failCallback - The callback function to invoke upon failed action dispatch.
 */
const dispatchInvoke = (
  dispatch: Dispatch,
  dispatchAction: any,
  {
    successCallback = displaySuccessToast,
    failCallback = displayErrorToast,
  }: {
    successCallback?: (msg: string) => void;
    failCallback?: (error: string) => void;
  } = {},
) => {
  dispatch(dispatchAction)
    .then(
      (res: { payload: { success: boolean; msg: string; payload: any } }) => {
        if (res.payload.success) return successCallback(res.payload.msg);
        return failCallback(res.payload.msg);
      },
    )
    .catch((error: string) => failCallback(error));
};

export { dispatchInvoke };

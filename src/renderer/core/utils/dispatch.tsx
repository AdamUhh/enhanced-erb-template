import { Dispatch } from '@reduxjs/toolkit';
import {
  IpcChannels,
  IpcErrorReturnFormat,
  IpcInvokeReturn,
  IpcPayloadOutput,
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
    successCallback?: ({
      msg,
      description,
      payload,
    }: {
      msg?: string;
      description?: string;
      payload: IpcPayloadOutput<T>;
    }) => void;
    failCallback?: ({
      msg,
      description,
      payload,
    }: {
      msg: string;
      description?: string;
      payload?: IpcPayloadOutput<T>;
    }) => void;
  } = {},
) => {
  dispatch(dispatchAction)
    .then((res: { payload: IpcInvokeReturn<T> }) => {
      if (res.payload.success)
        return successCallback({
          msg: res.payload.msg,
          description: res.payload.description,
          payload: res.payload.payload,
        });

      return failCallback({
        msg: res.payload.msg!,
        description: res.payload.description,
        payload: res.payload.payload,
      });
    })
    .catch((error: string) =>
      failCallback({
        msg: error,
      }),
    );
};

/**
 * A function to dispatch an action and handle failure callbacks.
 * @param dispatch - The Redux dispatch function.
 * @param dispatchAction - The (dispatch) action to dispatch.
 * @param callbacks.failCallback - The callback function to invoke upon failed action dispatch.
 */
export const dispatchInvoke = <T extends IpcChannels>(
  dispatch: Dispatch,
  dispatchAction: any,
  {
    failCallback = displayErrorToast,
  }: {
    failCallback?: ({
      msg,
      description,
      payload,
    }: {
      msg: string;
      description?: string;
      payload?: IpcPayloadOutput<T>;
    }) => void;
  } = {},
) => {
  dispatch(dispatchAction)
    .then((res: { payload: IpcErrorReturnFormat }) => {
      // eslint-disable-next-line promise/always-return
      if (!res.payload.success) {
        failCallback({
          msg: res.payload.msg!,
          description: res.payload.description,
          payload: res.payload.payload,
        });
      }
    })
    .catch((error: string) =>
      failCallback({
        msg: error,
      }),
    );
};

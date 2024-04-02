import { Dispatch } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { dispatchInvoke } from '../../utils/dispatch';

/**
 * Used to send a dispatch once on mount
 * @param dispatch - The Redux dispatch function.
 * @param dispatchAction - The (dispatch) action to dispatch.
 */
export const useDispatchOnMount = (dispatch: Dispatch, dispatchAction: any) => {
  useEffect(() => {
    dispatchInvoke(dispatch, dispatchAction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

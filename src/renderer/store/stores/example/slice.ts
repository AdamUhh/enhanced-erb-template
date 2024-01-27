/* eslint-disable default-param-last */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IpcChannels, SetStoreValuePayload } from 'shared/types';
// import { RootState } from 'types/store';

const initialState: { exampleVisibility: boolean } = {
  exampleVisibility: false,
};

const formatState = (state: any) =>
  ({
    key: 'exampleVisibility',
    state,
  }) as SetStoreValuePayload;

export const toggleWithNoficiationExampleVisibility = createAsyncThunk(
  'example/toggleWithNoficiationExampleVisibility',
  async (
    payload: { showBye?: boolean } | null = null,
    { getState },
  ): Promise<{ success: boolean; msg: string; payload: any } | undefined> => {
    const { example } = getState() as {
      example: typeof initialState;
    };

    const flipped =
      payload && payload.showBye ? payload.showBye : !example.exampleVisibility;

    const res = await window.electron.ipc.invoke<boolean>(
      IpcChannels.setStoreValue,
      {
        key: 'exampleVisibility',
        state: flipped,
      },
    );

    return res.success === true || res.success === false ? res : undefined;
  },
  // {
  //   prepare: (showBye?: boolean) => {
  //     // The 'prepare' callback allows you to modify the payload before it's passed to the thunk function
  //     return { payload: { showBye } ?? true };
  //   },
  // },
);

export const exampleSlice = createSlice({
  name: 'example',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setExampleVisibility: (
      state,
      { payload }: PayloadAction<{ showBye: boolean }>,
    ) => {
      window.electron.ipc.send(IpcChannels.setStoreValue, {
        key: 'exampleVisibility',
        state: payload.showBye,
      });
      state.exampleVisibility = payload.showBye;
    },
    toggleExampleVisibility: (state) => {
      window.electron.ipc.send(
        IpcChannels.setStoreValue,
        formatState(!state.exampleVisibility),
      );
      state.exampleVisibility = !state.exampleVisibility;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      toggleWithNoficiationExampleVisibility.fulfilled,
      (state, action) => {
        if (action.payload !== undefined)
          state.exampleVisibility = action.payload.payload;
      },
    );
  },
});

export const { setExampleVisibility, toggleExampleVisibility } =
  exampleSlice.actions;

export default exampleSlice.reducer;

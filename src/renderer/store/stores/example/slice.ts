/* eslint-disable import/no-cycle */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IpcChannels } from 'shared/types';

const initialState: { exampleVisibility: boolean } = {
  exampleVisibility: false,
};

export const exampleSlice = createSlice({
  name: 'example',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setExampleVisibility: (
      state,
      action: PayloadAction<{ _bool: boolean }>,
    ) => {
      const { payload } = action;
      window.electron.ipc.send(IpcChannels.setStoreValue, {
        key: 'exampleVisibility',
        state: payload._bool,
      });
      state.exampleVisibility = payload._bool;
    },
    toggleExampleVisibility: (state) => {
      window.electron.ipc.send(IpcChannels.setStoreValue, {
        key: 'exampleVisibility',
        state: !state.exampleVisibility,
      });
      state.exampleVisibility = !state.exampleVisibility;
    },
  },
});

export const { setExampleVisibility, toggleExampleVisibility } =
  exampleSlice.actions;

export default exampleSlice.reducer;

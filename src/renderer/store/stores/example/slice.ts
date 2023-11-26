/* eslint-disable import/no-cycle */
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { IpcChannels } from 'shared/types';

const initialState: { exampleVisibility: boolean } = {
  exampleVisibility: false,
};

export const exampleSlice = createSlice({
  name: 'fileExplorer',
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
        state: !current(state.exampleVisibility),
      });
      state.exampleVisibility = current(state.exampleVisibility);
    },
  },
});

export const { setExampleVisibility, toggleExampleVisibility } =
  exampleSlice.actions;

export default exampleSlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IpcChannels,
  IpcInvokeReturn,
  SetStoreValuePayload,
} from 'shared/types/ipc';
import { ExampleStoreConstants } from './constants';
import { ExampleElectronStore } from './types';

const initialState: ExampleElectronStore = {
  exampleVisibility: false,
};

const formatState = (state: any): SetStoreValuePayload => ({
  key: ExampleStoreConstants.EXAMPLE_VISIBILITY,
  state,
});

export const toggleWithNotificationExampleVisibility = createAsyncThunk(
  'exampleStore/toggleWithNoficiationExampleVisibility',
  async (
    payload: { showBye?: boolean } | null,
    { getState },
  ): Promise<IpcInvokeReturn> => {
    // ? its very important that `example` is the same name as
    // ? in your main store reducer (renderer/store/index.ts)
    const { exampleStore } = getState() as {
      exampleStore: typeof initialState;
    };

    const flipped =
      payload && payload.showBye
        ? payload.showBye
        : !exampleStore.exampleVisibility;

    const res = await window.electron.ipc.invoke<boolean>(
      IpcChannels.setStoreValue,
      {
        key: ExampleStoreConstants.EXAMPLE_VISIBILITY,
        state: flipped,
      },
    );

    return res;
  },
  // {
  //   prepare: (showBye?: boolean) => {
  //     // The 'prepare' callback allows you to modify the payload before it's passed to the thunk function
  //     return { payload: { showBye } ?? true };
  //   },
  // },
);

export const exampleSlice = createSlice({
  name: 'exampleStore',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setExampleVisibility: (
      state,
      { payload }: PayloadAction<{ showBye: boolean }>,
    ) => {
      window.electron.ipc.send(IpcChannels.setStoreValue, {
        key: ExampleStoreConstants.EXAMPLE_VISIBILITY,
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
      toggleWithNotificationExampleVisibility.fulfilled,
      (state, action) => {
        if (action.payload !== undefined && action.payload.success) {
          state.exampleVisibility = action.payload.payload;
        }
      },
    );
  },
});

export const { setExampleVisibility, toggleExampleVisibility } =
  exampleSlice.actions;

export default exampleSlice.reducer;

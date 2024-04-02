import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { appCreateAsyncThunk } from 'core/hooks/store';
import { IpcChannels, IpcReturn, SetStoreValuePayload } from 'shared/types/ipc';
import { ExampleStoreConstants } from './constants';
import { ExampleElectronStore } from './types';

const STORE_NAME = 'exampleStore';

const initialState: ExampleElectronStore = {
  exampleVisibility: false,
};

const formatState = (
  key: ExampleStoreConstants,
  state: any,
): SetStoreValuePayload => ({
  key,
  state,
});

export const toggleWithNotificationExampleVisibility = appCreateAsyncThunk(
  STORE_NAME,
  IpcChannels.toggleExampleVisibility,
  async (payload, { getState }) => {
    // ? its very important that `example` is the same name as
    // ? in your main store reducer (renderer/store/index.ts)
    const { exampleStore } = getState() as {
      exampleStore: typeof initialState;
    };

    const flipped =
      payload && payload.showBye
        ? payload.showBye
        : !exampleStore.exampleVisibility;

    await window.electron.ipc.invoke<IpcChannels.setStoreValue>(
      IpcChannels.setStoreValue,
      {
        key: ExampleStoreConstants.EXAMPLE_VISIBILITY,
        state: flipped,
      },
    );

    return {
      success: true,
      payload: flipped,
      msg: '',
    } satisfies IpcReturn<IpcChannels.toggleExampleVisibility>;
  },
  // {
  //   prepare: (showBye?: boolean) => {
  //     // The 'prepare' callback allows you to modify the payload before it's passed to the thunk function
  //     return { payload: { showBye } ?? true };
  //   },
  // },
);

export const toggleWithNotificationExampleFAIL = appCreateAsyncThunk(
  STORE_NAME,
  IpcChannels.toggleExampleVisibility,
  async () => {
    return {
      success: false,
      msg: 'Failed to toggle',
      payload: 'Failed to change electron store value and redux value',
    };
  },
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
        formatState(
          ExampleStoreConstants.EXAMPLE_VISIBILITY,
          !state.exampleVisibility,
        ),
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

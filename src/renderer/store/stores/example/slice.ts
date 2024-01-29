import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IpcChannels, SetStoreValuePayload } from 'shared/types';
import { IpcInvokeReturn } from 'shared/types/ipc';

const initialState: { exampleVisibility: boolean } = {
  exampleVisibility: false,
};

const formatState = (state: any) =>
  ({
    key: 'exampleVisibility',
    state,
  }) as SetStoreValuePayload;

export const toggleWithNotificationExampleVisibility = createAsyncThunk(
  'example/toggleWithNoficiationExampleVisibility',
  async (
    payload: { showBye?: boolean } | null,
    { getState },
  ): Promise<IpcInvokeReturn> => {
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

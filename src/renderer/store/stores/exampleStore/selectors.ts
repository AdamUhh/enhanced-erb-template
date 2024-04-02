import { RootState } from 'core/hooks/store';

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectSidebar = (state: RootState) => state.sidebar."propertyName";

export const selectExampleVisibility = (state: RootState) =>
  state.exampleStore.exampleVisibility;

// ? check out `createSelector` if you want to select a mutated state.store

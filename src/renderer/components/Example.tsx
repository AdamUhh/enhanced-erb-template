import { useAppDispatch, useAppSelector } from 'hooks/store';
import { Button } from 'shadcn/components/ui/button';
import { selectExampleVisibility } from 'store/example/selectors';
import {
  setExampleVisibility,
  toggleExampleVisibility,
  toggleWithNoficiationExampleVisibility,
} from 'store/example/slice';
import { dispatchInvoke } from 'utils/dispatch';
import { displayErrorToast, displaySuccessToast } from 'utils/toast';

export function ExampleToggleButtons() {
  const dispatch = useAppDispatch();

  // useReadIpc({
  //   channel: IpcChannels.setStoreValue,
  //   failCallback: (error: string) => displayErrorToast(error),
  //   successCallback: (msg: string) => displaySuccessToast(msg),
  // });

  return (
    <div className="grid grid-cols-2 gap-2">
      <Button
        variant="outline"
        onClick={() => {
          dispatch(toggleExampleVisibility());
        }}
      >
        Toggle
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          dispatch(setExampleVisibility({ showBye: true }));
        }}
      >
        Set to Bye (via payload)
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          dispatchInvoke(
            dispatch,
            toggleWithNoficiationExampleVisibility(null),
          );
        }}
      >
        Toggle with Notification
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          dispatchInvoke(
            dispatch,
            toggleWithNoficiationExampleVisibility({ showBye: true }),
          );
        }}
      >
        Set to Bye (via payload) with Notification
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          displaySuccessToast(
            'Successfully changed electron store value and redux value',
          )
        }
      >
        Success Notification
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          displayErrorToast(
            'Failed to change electron store value and redux value',
          )
        }
      >
        Fail Notification
      </Button>
    </div>
  );
}

export default function Example() {
  const exampleVisibility = useAppSelector(selectExampleVisibility);

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-2">
      <div>{exampleVisibility ? 'Bye' : 'Hi'}</div>
      <ExampleToggleButtons />
    </div>
  );
}

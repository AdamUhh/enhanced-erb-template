import useIpcListener from 'core/hooks/ipc/useIpcListener';
import {
  dispatchInvoke,
  dispatchInvokeWithCallback,
} from 'core/utils/dispatch';
import {
  displayErrorToast,
  displaySuccessToast,
} from 'core/utils/displayToast';
import { Button } from 'shadcn/components/ui/button';
import { IpcChannels } from 'shared/types/ipc';
import { selectExampleVisibility } from 'store/exampleStore/selectors';
import {
  setExampleVisibility,
  toggleExampleVisibility,
  toggleWithNotificationExampleFAIL,
  toggleWithNotificationExampleVisibility,
} from 'store/exampleStore/slice';
import { useAppDispatch, useAppSelector } from '../store';
import ShortcutSettings from './ShortcutSettings';

export function ExampleToggleButtons() {
  const dispatch = useAppDispatch();

  // useRegisterShortcut(
  //   {
  //     id: ShortcutKeybindingsAliases.toggleExample,
  //     action: () => dispatch(toggleExampleVisibility()),
  //   },
  //   {
  //     id: ShortcutKeybindingsAliases.toggleWithNotification,
  //     action: () =>
  //       dispatchInvokeWithCallback<IpcChannels.toggleExampleVisibility>(
  //         dispatch,
  //         toggleWithNotificationExampleVisibility(),
  //       ),
  //   },
  //   {
  //     id: ShortcutKeybindingsAliases.toggleWithByeNotification,
  //     action: () =>
  //       dispatchInvokeWithCallback<IpcChannels.toggleExampleVisibility>(
  //         dispatch,
  //         toggleWithNotificationExampleVisibility(true),
  //       ),
  //   },
  // );

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
          dispatch(setExampleVisibility(true));
        }}
      >
        Set to Bye (via payload)
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          dispatchInvokeWithCallback(
            dispatch,
            toggleWithNotificationExampleVisibility(),
          );
        }}
      >
        Toggle with Notification
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          dispatchInvokeWithCallback(
            dispatch,
            toggleWithNotificationExampleVisibility(true),
          );
        }}
      >
        Set to Bye (via payload) with Notification
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          displaySuccessToast({
            msg: 'Success!',
            description:
              'Successfully changed electron store value and redux value',
          })
        }
      >
        Success Notification
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          dispatchInvoke(dispatch, toggleWithNotificationExampleFAIL())
        }
      >
        Fail Notification
      </Button>
    </div>
  );
}

function ExampleContainer() {
  const exampleVisibility = useAppSelector(selectExampleVisibility);

  return (
    <h3 className="text-xl">{exampleVisibility ? 'Bye :(' : 'Hiya :D'}</h3>
  );
}

export default function Example() {
  useIpcListener({
    channel: IpcChannels.toggleRendererErrorDialog,
    failCallback: displayErrorToast,
  });

  return (
    <div className="mx-auto flex h-screen w-screen max-w-lg flex-col items-center justify-center gap-2">
      <ExampleContainer />
      <ExampleToggleButtons />
      <ShortcutSettings />
    </div>
  );
}

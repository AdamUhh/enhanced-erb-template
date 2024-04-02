import { useReplyListenIpc } from 'core/hooks/ipc/useReplyListenIpc';
import { useAppDispatch, useAppSelector } from 'core/hooks/store';
import { useRegisterShortcut } from 'core/hooks/useShortcutRegisterEffect';
import { ShortcutKeybindingsAliases } from 'core/keyboard/keybindingAliases';
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
import ShortcutSettings from './ShortcutSettings';

export function ExampleToggleButtons() {
  const dispatch = useAppDispatch();

  useRegisterShortcut(
    {
      id: ShortcutKeybindingsAliases.toggleExample,
      action: () => dispatch(toggleExampleVisibility()),
    },
    {
      id: ShortcutKeybindingsAliases.toggleWithNotification,
      action: () =>
        dispatchInvokeWithCallback(
          dispatch,
          toggleWithNotificationExampleVisibility(null),
        ),
    },
    {
      id: ShortcutKeybindingsAliases.toggleWithByeNotification,
      action: () =>
        dispatchInvokeWithCallback(
          dispatch,
          toggleWithNotificationExampleVisibility({ showBye: true }),
        ),
    },
  );

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
          dispatchInvokeWithCallback(
            dispatch,
            toggleWithNotificationExampleVisibility(null),
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
            toggleWithNotificationExampleVisibility({ showBye: true }),
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
          dispatchInvoke(dispatch, toggleWithNotificationExampleFAIL(null))
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
  useReplyListenIpc({
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

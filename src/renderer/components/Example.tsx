import useIpcListener from 'core/hooks/ipc/useIpcListener';
import {
  DefaultShortcutKeybindings,
  ShortcutKeybindingsAliases,
} from 'core/keyboard/defaults';
import { useRegisterShortcut } from 'core/keyboard/useRegisterShortcut';
import { useShortcutContext } from 'core/keyboard/useShortcutContext';
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

  useRegisterShortcut({
    alias: ShortcutKeybindingsAliases.toggleExample,
    handler: () => dispatch(toggleExampleVisibility()),
  });
  useRegisterShortcut({
    alias: ShortcutKeybindingsAliases.toggleWithNotification,
    handler: () =>
      dispatchInvokeWithCallback<IpcChannels.toggleExampleVisibility>(
        dispatch,
        toggleWithNotificationExampleVisibility(),
      ),
  });
  useRegisterShortcut({
    alias: ShortcutKeybindingsAliases.toggleWithByeNotification,
    handler: () =>
      dispatchInvokeWithCallback<IpcChannels.toggleExampleVisibility>(
        dispatch,
        toggleWithNotificationExampleVisibility(true),
        {
          successCallback({ msg, description, payload }) {
            displaySuccessToast({ msg, description, payload });
            console.log('Successfully toggled');
          },
        },
      ),
  });

  return (
    <div className="grid w-full grid-cols-2 gap-4">
      <Button
        onClick={() => {
          dispatch(toggleExampleVisibility());
        }}
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
      >
        Toggle Greeting
      </Button>
      <Button
        onClick={() => {
          dispatch(setExampleVisibility(true));
        }}
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
      >
        Set greeting to `Bye` (via dispatch payload)
      </Button>
      <Button
        onClick={() => {
          dispatchInvokeWithCallback(
            dispatch,
            toggleWithNotificationExampleVisibility(),
          );
        }}
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
      >
        Toggle greeting with Notification
      </Button>
      <Button
        onClick={() => {
          dispatchInvokeWithCallback(
            dispatch,
            toggleWithNotificationExampleVisibility(true),
          );
        }}
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
      >
        Set greeting to `Bye` with Notification & console log
      </Button>
      <Button
        className="col-span-2 rounded bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700"
        onClick={() =>
          dispatchInvoke(dispatch, toggleWithNotificationExampleFAIL())
        }
      >
        Notification Fail (via dispatch)
      </Button>
    </div>
  );
}

function ExampleContainer() {
  const exampleVisibility = useAppSelector(selectExampleVisibility);

  return (
    <h3 className="mb-8 text-4xl font-bold">
      {exampleVisibility ? 'Byeeee ✌️' : 'Hiyaaa 👋'}
    </h3>
  );
}

function ShortcutPreview() {
  const { shortcuts, waitingForChord } = useShortcutContext();
  return (
    <div className="mt-12 w-full">
      <div className="mb-4 flex justify-between">
        <h2 className="text-2xl font-semibold text-gray-500">
          Shortcut Preview
        </h2>
        <ShortcutSettings />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {shortcuts.map(([alias]) => (
          <div
            key={alias}
            className="flex items-center justify-between rounded-lg bg-black p-4"
          >
            <span className="font-semibold text-white/90">
              {DefaultShortcutKeybindings[alias].title}
            </span>
            <Button className="cursor-default rounded bg-white/20 px-3 py-1 font-bold text-white hover:bg-white/20">
              {DefaultShortcutKeybindings[alias].keybind}
            </Button>
          </div>
        ))}
      </div>
      <div className="flex h-8 w-full items-center text-center">
        {waitingForChord.chord
          ? waitingForChord.success
            ? `(${waitingForChord.chord}) was pressed. Waiting for second key of chord`
            : `The key combination (${waitingForChord.chord}) is not a command`
          : null}
      </div>
    </div>
  );
}

export default function Example() {
  useIpcListener({
    channel: IpcChannels.toggleRendererErrorDialog,
    failCallback: displayErrorToast,
  });

  return (
    <div className="mx-auto flex h-screen w-screen max-w-4xl flex-col items-center justify-center">
      <ExampleContainer />
      <ExampleToggleButtons />
      <ShortcutPreview />
    </div>
  );
}

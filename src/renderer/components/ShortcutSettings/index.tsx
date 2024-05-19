import { ShortcutContextTypes } from 'core/keyboard/ShortcutContext';
import { useShortcutContext } from 'core/keyboard/useShortcutContext';
import { Dispatch, SetStateAction, useState } from 'react';
import { Button } from 'shadcn/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'shadcn/components/ui/dialog';
import ShortcutTable from './ShortcutTable';

const enum DialogStates {
  settings = 0,
  reset = 1,
}

function ResetConfirmationDialog({
  resetShortcuts,
  setDialogState,
}: {
  resetShortcuts: () => void;
  setDialogState: Dispatch<SetStateAction<number | null>>;
}) {
  return (
    <>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>This cannot be undone.</DialogDescription>
      <div className="ml-auto flex gap-2">
        <Button
          variant="secondary"
          onClick={() => {
            resetShortcuts();
            setDialogState(DialogStates.settings);
          }}
        >
          Yes, reset keybinds
        </Button>
        <Button
          variant="destructive"
          onClick={() => setDialogState(DialogStates.settings)}
        >
          Cancel
        </Button>
      </div>
    </>
  );
}

function ShortcutSettingsDialog({
  shortcuts,
  changeShortcut,
  isModifyingShortcut,
  resetShortcuts,
}: Pick<
  ShortcutContextTypes,
  'shortcuts' | 'changeShortcut' | 'isModifyingShortcut' | 'resetShortcuts'
>) {
  const [dialogState, setDialogState] = useState<number | null>(null);

  return (
    <Dialog>
      <DialogTrigger
        asChild
        onClick={() => setDialogState(DialogStates.settings)}
      >
        <Button className="w-full bg-blue-500 hover:bg-blue-600">
          View/Change Shortcut Settings
        </Button>
      </DialogTrigger>
      <DialogContent>
        {dialogState === 0 ? (
          <>
            <DialogHeader>
              <DialogTitle>Keyboard Shortcuts</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Double click a row to change it&apos;s keybindings
            </DialogDescription>
            <ShortcutTable
              shortcuts={shortcuts}
              changeShortcut={changeShortcut}
              isModifyingShortcut={isModifyingShortcut}
            />
            <Button
              className="ml-auto"
              onClick={() => setDialogState(DialogStates.reset)}
            >
              Reset Keybindings
            </Button>
          </>
        ) : (
          dialogState === 1 && (
            <ResetConfirmationDialog
              resetShortcuts={resetShortcuts}
              setDialogState={setDialogState}
            />
          )
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function ShortcutSettings() {
  const { shortcuts, changeShortcut, isModifyingShortcut, resetShortcuts } =
    useShortcutContext();

  return (
    <div className="w-fit">
      <ShortcutSettingsDialog
        shortcuts={shortcuts}
        changeShortcut={changeShortcut}
        isModifyingShortcut={isModifyingShortcut}
        resetShortcuts={resetShortcuts}
      />
    </div>
  );
}

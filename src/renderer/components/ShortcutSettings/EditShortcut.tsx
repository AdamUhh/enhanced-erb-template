import { generateKeyCombination } from 'core/keyboard/generateKeyCombination';
import ShortcutManager from 'core/keyboard/shortcutManager';
import { Shortcut } from 'core/keyboard/types';
import { CheckCircle2Icon, XCircleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from 'shadcn/components/ui/button';
import { cn } from 'shadcn/lib/utils';

export default function EditShortcut({
  allShortcuts,
  shortcutManager,
  shortcut,
  handleShortcutEditFinished,
}: {
  allShortcuts: Shortcut[];
  shortcutManager: ShortcutManager;
  shortcut: Shortcut;
  handleShortcutEditFinished: () => void;
}) {
  const [newKey, setNewKey] = useState(shortcut.keybind);
  const [keyExists, setKeyExists] = useState(true);
  const [canSave, setCanSave] = useState(false);

  const handleSave = () => {
    if (shortcut.keybind !== newKey)
      shortcutManager.changeShortcut(shortcut.id, newKey);

    handleShortcutEditFinished();
  };

  useEffect(() => {
    shortcutManager.setUserIsChangingKeybinds(true);
    const handleKeyPress = (event: KeyboardEvent) => {
      const { newKey: _newKey, isValidKeyCombination } =
        generateKeyCombination(event);

      // ? does the key already exist/mapped to some other shortcut
      const hasExistingKey = allShortcuts.some((s) => s.keybind === _newKey);

      setNewKey(_newKey);

      // if (isValidKeyCombination) {
      //   // ? if it does not have an existing key
      //   if (!hasExistingKey) {
      //     setCanSave(true);
      //     setKeyExists(false);
      //   } else {
      //     // ? key already exists
      //     setCanSave(false);
      //     setKeyExists(true);
      //   }
      // } else {
      //   // ? not a valid key combination
      //   setCanSave(false);
      //   setKeyExists(false);
      // }
      setCanSave(!!(isValidKeyCombination && !hasExistingKey));
      setKeyExists(!!(hasExistingKey && isValidKeyCombination));
    };

    // Add event listener for keypress
    window.addEventListener('keydown', handleKeyPress);

    // Remove event listener on component unmount
    return () => {
      shortcutManager.setUserIsChangingKeybinds(false);
      handleShortcutEditFinished();
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [allShortcuts, handleShortcutEditFinished, shortcut.id, shortcutManager]);

  return (
    <>
      <div
        className={cn(
          'flex gap-1',
          keyExists && !canSave && newKey !== shortcut.keybind && 'my-4',
        )}
      >
        <div className="-ml-3 flex h-8 w-full items-center rounded-md border border-input/60 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:border-input">
          {newKey}
        </div>
        <Button
          variant="success-ghost"
          disabled={!canSave}
          className="h-8 px-1"
          onClick={handleSave}
        >
          <CheckCircle2Icon />
        </Button>
        <Button
          variant="destructive-ghost"
          className="h-8 px-1"
          onClick={handleShortcutEditFinished}
        >
          <XCircleIcon />
        </Button>
      </div>
      {keyExists && !canSave && newKey !== shortcut.keybind && (
        <span className="absolute bottom-0 left-4 font-semibold text-destructive">
          Key exists, binded to:{' '}
          {allShortcuts.find((f) => f.keybind === newKey)?.id}
        </span>
      )}
    </>
  );
}

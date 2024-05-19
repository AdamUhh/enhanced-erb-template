import { parseShortcut } from 'core/keyboard/ShortcutParser';
import { ShortcutRegistration } from 'core/keyboard/ShortcutRegistry';
import {
  DefaultShortcutKeybindings,
  ShortcutKeybindingsAliases,
} from 'core/keyboard/defaults';
import { capitalizeWordsInString } from 'core/utils/capitalizeWords';
import { CheckCircle2Icon, XCircleIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from 'shadcn/components/ui/button';
import { cn } from 'shadcn/lib/utils';

type KeyBindingStatusProps = {
  allShortcuts: [ShortcutKeybindingsAliases, ShortcutRegistration[]][];
  newKey: string;
  shortcutAlias: ShortcutKeybindingsAliases;
};

/**
 * Component to display the status of a key binding.
 * @param allShortcuts - Array of all existing shortcuts.
 * @param newKey - The new key combination to check.
 * @param shortcutAlias - The alias of the shortcut.
 */
function KeyBindingStatus({
  allShortcuts,
  newKey,
  shortcutAlias,
}: KeyBindingStatusProps) {
  // Find all existing shortcuts that match the new key combination
  const matchingShortcuts = allShortcuts.filter(([alias]) => {
    const obj = DefaultShortcutKeybindings[alias];
    const savedKeybind = obj.keybind.toLowerCase();
    const savedKeybindFirstChord = savedKeybind.split(',')[0];
    const fullChord = newKey.toLowerCase();
    const newFirstChord = fullChord.split(',')[0];

    // Check if the first chord or the full chord matches any existing keybind
    if (savedKeybindFirstChord === newFirstChord) return true;
    if (savedKeybind === fullChord) return true;
    return false;
  });

  // Function to get the status message based on the found shortcuts
  const getStatusMessage = () => {
    if (matchingShortcuts.length > 0) {
      // Collect titles of all matching shortcuts
      const matchingTitles = matchingShortcuts
        .map(([alias]) => DefaultShortcutKeybindings[alias].title)
        .filter(
          (title) => title !== DefaultShortcutKeybindings[shortcutAlias].title,
        );

      const exactMatch = matchingShortcuts.filter(
        ([alias]) =>
          DefaultShortcutKeybindings[alias].keybind.toLowerCase() ===
          newKey.toLowerCase(),
      );

      if (exactMatch.length === 1)
        return `Key exists, binded to: ${
          DefaultShortcutKeybindings[exactMatch[0][0]].title
        }.`;

      if (matchingShortcuts.length > 1) {
        return `First chord already exists, binded to: ${matchingTitles.join(
          ', ',
        )}. Please change ${
          matchingTitles.length > 1 ? 'those shortcuts' : 'that shortcut'
        } first.`;
      }

      // Error message if the full chord matches another keybind
      return `Key exists, binded to: ${matchingTitles.join(', ')}.`;
    }
    return 'Error, could not find shortcut alias.';
  };

  // Get the status message
  const statusMessage = getStatusMessage();

  // Render the status message if exists
  return statusMessage ? (
    <span className="absolute left-4 top-10 flex h-10 items-center font-semibold text-destructive">
      {statusMessage}
    </span>
  ) : null;
}

type EditShortcutProps = {
  allShortcuts: [ShortcutKeybindingsAliases, ShortcutRegistration[]][];
  shortcutAlias: ShortcutKeybindingsAliases;
  changeShortcut: (
    alias: ShortcutKeybindingsAliases,
    newKeybind: string,
  ) => void;
  handleShortcutEditFinished: () => void;
  isModifyingShortcut: (isModifying: boolean) => void;
};

function EditShortcut({
  allShortcuts,
  shortcutAlias,
  changeShortcut,
  handleShortcutEditFinished,
  isModifyingShortcut,
}: EditShortcutProps) {
  const [newKey, setNewKey] = useState(
    DefaultShortcutKeybindings[shortcutAlias].keybind,
  );
  const [keyExists, setKeyExists] = useState(false);
  const activeChordRef = useRef<string[]>([]);

  const handleSave = () => {
    if (DefaultShortcutKeybindings[shortcutAlias].keybind !== newKey) {
      changeShortcut(shortcutAlias, newKey);
    }
    handleShortcutEditFinished();
  };

  useEffect(() => {
    isModifyingShortcut(true);

    const handleKeyPress = (event: KeyboardEvent) => {
      if (activeChordRef.current.length === 2) activeChordRef.current = [];

      const shortcut = parseShortcut(event);

      if (shortcut) {
        activeChordRef.current = [...activeChordRef.current, shortcut];

        /**
         * Check if any existing keybind matches the new key combination.
         *
         * Race Conditions:
         * - If a key combination like Ctrl+Shift+S already exists and the user types Ctrl+Shift+S, it should trigger an error (duplicate). If it's on the same alias, only disable the button without showing an error message.
         * - If a key combination like Ctrl+Shift+S already exists and the user types Ctrl+Shift+S, Ctrl+A, it should result in a chord error. This is because if the user wants the latter shortcut, it will trigger 2 shortcuts, instead of just one.
         * - If key combinations like Ctrl+Shift+S, Ctrl+A exist, and the user types Ctrl+Shift+S, it should trigger an error. Same reason as above.
         * - If key combinations like Ctrl+Shift+S, Ctrl+A exist, and the user types Ctrl+Shift+S, Ctrl+A, it should result in a chord error (duplicate).
         */
        const doesKeybindExist = Object.values(DefaultShortcutKeybindings).some(
          (v) => {
            // Retrieve the saved keybind from the DefaultShortcutKeybindings object
            const defaultKeybind = v.keybind.toLowerCase();
            // Extract the first chord of the saved keybind
            const defaultKeybindFirstChord = defaultKeybind.split(',')[0];
            // Get the first chord of the new key combination
            const newFirstChord = activeChordRef.current[0];
            // Convert the new key combination to lowercase
            const fullChord = activeChordRef.current.join(', ').toLowerCase();
            // Split the new key combination into individual chords
            const newKeySplit = fullChord.split(',');
            // Get the original keybind for the current shortcut alias
            const originalKeybind =
              DefaultShortcutKeybindings[shortcutAlias].keybind.toLowerCase();

            // If the original keybind matches the saved keybind, skip
            if (originalKeybind === defaultKeybind) {
              return false;
            }

            // If the first chord of the saved keybind matches the first chord of the new key combination
            if (defaultKeybindFirstChord === newFirstChord) {
              // If the first chord of the saved keybind matches the full new key combination, return true
              if (defaultKeybindFirstChord === fullChord) return true;

              // If the new key combination has more than one chord and the first chord matches the saved keybind, return true
              if (
                activeChordRef.current.length > 1 &&
                defaultKeybind === newFirstChord
              )
                return true;

              // If the saved keybind does not match the full new key combination, return false
              if (defaultKeybind !== fullChord) return false;

              return true;
            }

            // If the saved keybind matches the full new key combination, return true
            if (defaultKeybind === fullChord) return true;

            // If the new key combination has more than one chord and the first chord matches the saved keybind, return true
            return newKeySplit.length > 1 && newKeySplit[0] === defaultKeybind;
          },
        );

        setKeyExists(doesKeybindExist);

        const formattedChord = capitalizeWordsInString(
          activeChordRef.current.join(', '),
        );

        setNewKey(formattedChord);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      handleShortcutEditFinished();
      isModifyingShortcut(false);
    };
  }, [handleShortcutEditFinished, isModifyingShortcut, shortcutAlias]);

  return (
    <>
      <div className={cn('flex gap-1', keyExists && 'mb-10')}>
        <div className="-ml-3 flex h-8 w-full items-center rounded-md border border-input/60 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:border-input">
          {newKey}
        </div>
        <Button
          variant="success-ghost"
          disabled={
            keyExists ||
            newKey.toLowerCase() ===
              DefaultShortcutKeybindings[shortcutAlias].keybind.toLowerCase()
          }
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
      {keyExists &&
        newKey !== DefaultShortcutKeybindings[shortcutAlias].keybind && (
          <KeyBindingStatus
            allShortcuts={allShortcuts}
            newKey={newKey}
            shortcutAlias={shortcutAlias}
          />
        )}
    </>
  );
}

export default EditShortcut;

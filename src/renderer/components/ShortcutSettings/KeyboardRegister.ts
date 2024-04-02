import { generateKeyCombination } from 'core/keyboard/generateKeyCombination';
import ShortcutManager from 'core/keyboard/shortcutManager';
import { useEffect } from 'react';

export default function KeyboardRegister({
  shortcutManager,
}: {
  shortcutManager: ShortcutManager;
}) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!shortcutManager.getUserIsChangingKeybinds) {
        const keyCombination = generateKeyCombination(event);
        shortcutManager.executeShortcut(keyCombination.newKey);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcutManager]);

  return null;
}

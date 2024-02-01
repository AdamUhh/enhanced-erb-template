import { useEffect } from 'react';
import ShortcutManager from 'shared/keyboard/shortcutManager';
import { generateKeyCombination } from 'utils/keyboard';

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

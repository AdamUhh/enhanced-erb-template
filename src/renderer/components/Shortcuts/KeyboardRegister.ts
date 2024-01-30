import { useEffect } from 'react';
import ShortcutManager from 'shared/keyboard/shortcutManager';

export function generateKeyCombination(event: KeyboardEvent): string {
  const key = event.key.toUpperCase();
  const isCtrl = event.ctrlKey;
  const isShift = event.shiftKey;
  const isAlt = event.altKey;

  const newKey = `${isCtrl ? 'Ctrl+' : ''}${isShift ? 'Shift+' : ''}${
    isAlt ? 'Alt+' : ''
  }${key}`;

  return newKey;
}

export default function KeyboardRegister({
  shortcutManager,
}: {
  shortcutManager: ShortcutManager;
}) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!shortcutManager.getUserIsChangingKeybinds) {
        const keyCombination = generateKeyCombination(event);
        shortcutManager.executeShortcut(keyCombination);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcutManager]);

  return null;
}

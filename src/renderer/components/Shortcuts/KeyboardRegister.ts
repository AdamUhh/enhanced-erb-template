import { useEffect } from 'react';
import ShortcutManager from 'shared/keyboard/shortcutManager';

export function generateKeyCombination(event: KeyboardEvent): {
  key: string;
  newKey: string;
  isValidKeyCombination: boolean;
} {
  const key = event.key.toUpperCase();
  const isCtrl = event.ctrlKey;
  const isShift = event.shiftKey;
  const isAlt = event.altKey;

  const newKey = `${isCtrl ? 'Ctrl+' : ''}${isShift ? 'Shift+' : ''}${
    isAlt ? 'Alt+' : ''
  }${key
    .replaceAll('CONTROL', '')
    .replaceAll('SHIFT', '')
    .replaceAll('ALT', '')}`;

  // Updated regular expression to include F keys without requiring Ctrl/Shift/Alt
  const isValidKeyCombination =
    isCtrl ||
    isShift ||
    isAlt ||
    (/^[A-Z0-9]$/.test(key) && (isCtrl || isShift || isAlt)) || // Requires at least one of Ctrl/Shift/Alt for single letters or numbers
    /^F[1-9]$|^F1[0-2]$/.test(key); // Accepts F1-F12 without requiring Ctrl/Shift/Alt

  return { key, newKey, isValidKeyCombination };
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

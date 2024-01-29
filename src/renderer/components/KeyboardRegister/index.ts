import { useEffect } from 'react';
import ShortcutManager from 'shared/keyboard/shortcutManager';

function generateKeyCombination(event: KeyboardEvent): string {
  const { key } = event;

  const modifiers = [];
  if (event.ctrlKey && key !== 'Control') modifiers.push('Ctrl');
  if (event.shiftKey && key !== 'Shift') modifiers.push('Shift');
  if (event.altKey && key !== 'Alt') modifiers.push('Alt');

  return modifiers.length > 0 ? `${modifiers.join('+')}+${key}` : key;
}

export default function KeyboardRegister({
  shortcutManager,
}: {
  shortcutManager: ShortcutManager;
}) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const keyCombination = generateKeyCombination(event);
      shortcutManager.executeShortcut(keyCombination);
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcutManager]);

  return null;
}

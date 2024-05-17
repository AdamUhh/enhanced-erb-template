const modifierKeys = ['Ctrl', 'Alt', 'Shift', 'Meta'];

function normalizeKey(key: string): string {
  const lowerKey = key.toLowerCase();
  switch (lowerKey) {
    case 'control':
    case 'shift':
    case 'alt':
    case 'meta':
      return '';
    default:
      // Allow function keys (f1-f12) to pass through
      if (/^f\d{1,2}$/i.test(key)) {
        return lowerKey; // Normalize function keys to lowercase (f1, f2, etc.)
      }
      return lowerKey;
  }
}

// Parse a keyboard event to get the shortcut string
export function parseShortcut(event: KeyboardEvent): string | null {
  // Get the modifier keys pressed
  const modifiers = modifierKeys
    .filter((key) => (event as any)[`${key.toLowerCase()}Key`])
    .map((key) => key.toLowerCase());

  const { key } = event;

  if (!key || (modifiers.length === 0 && !/^f\d{1,2}$/i.test(key))) {
    return null;
  }

  const normalizedKey = normalizeKey(key);

  if (!normalizedKey) return null;

  // Construct the shortcut string
  const shortcut = [...modifiers, normalizedKey].join(' + ');
  console.log(shortcut);
  return shortcut;
}

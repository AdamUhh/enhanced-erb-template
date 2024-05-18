const modifierKeys = ['Ctrl', 'Alt', 'Shift', 'Meta'];

// Normalize a key string to a standardized format
function normalizeKey(key: string): string {
  const lowerKey = key.toLowerCase();

  // If the key is a modifier key, return an empty string, as it has already been taken care of
  switch (lowerKey) {
    case 'control':
    case 'shift':
    case 'alt':
    case 'meta':
      return '';
    default:
      // Allow function keys (f1-f12) to pass through
      if (/^f\d{1,2}$/i.test(key)) {
        // Normalize function keys to lowercase (f1, f2, etc.)
        return lowerKey;
      }
      // Return the lowercase key for other keys
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

  // if (!key || (modifiers.length === 0 && !/^f\d{1,2}$/i.test(key)))

  // ? If no key or no function keys (F1-F12) pressed
  if (!key && !/^f\d{1,2}$/i.test(key)) return null;

  const normalizedKey = normalizeKey(key);

  if (!normalizedKey) return null;

  const shortcut = [...modifiers, normalizedKey].join(' + ');
  return shortcut;
}

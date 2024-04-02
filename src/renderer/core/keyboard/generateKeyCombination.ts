/**
 * Generates a key combination object based on the provided KeyboardEvent.
 * @param event - The KeyboardEvent from which to generate the key combination.
 * @returns An object containing the key, newKey, and isValidKeyCombination properties.
 */
export function generateKeyCombination(event: KeyboardEvent): {
  /**
   * The original key from the event, in uppercase.
   */
  key: string;
  /**
   * The new key combination string with modifiers (Ctrl/Shift/Alt) prefixed.
   */
  newKey: string;
  /**
   * Indicates whether the key combination is valid based on certain criteria.
   */
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

  // Determine if the key combination is valid
  const isValidKeyCombination =
    // Check if any modifier key (Ctrl/Shift/Alt) is pressed
    isCtrl ||
    isShift ||
    isAlt ||
    // Check if the key is a single letter or number and at least one modifier key is pressed
    (/^[A-Z0-9]$/.test(key) && (isCtrl || isShift || isAlt)) ||
    // Check if the key is an F key (F1 to F12)
    /^F[1-9]$|^F1[0-2]$/.test(key);

  return { key, newKey, isValidKeyCombination };
}

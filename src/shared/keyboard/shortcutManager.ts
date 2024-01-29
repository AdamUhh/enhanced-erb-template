import { ShortcutKeybindings, ShortcutKeybindingsAliases } from 'shared/types';

interface Shortcut {
  id: ShortcutKeybindingsAliases;
  key: string;
  action: (...args: any[]) => any;
}

class ShortcutManager {
  private shortcuts: Map<ShortcutKeybindingsAliases, Shortcut>;

  private keybindings: Record<ShortcutKeybindingsAliases, string>; // Object to map IDs to keyboard shortcuts

  constructor() {
    this.shortcuts = new Map();
    this.keybindings = ShortcutKeybindings;
  }

  public registerShortcut(
    id: ShortcutKeybindingsAliases,
    action: (...args: any[]) => any,
  ) {
    const key = this.keybindings[id];
    if (key) this.shortcuts.set(id, { id, key, action });
    // eslint-disable-next-line no-console
    else console.error(`Keyboard shortcut not found for ID: ${id}`);
  }

  public unregisterShortcut(id: ShortcutKeybindingsAliases) {
    this.shortcuts.delete(id);
  }

  public executeShortcut(keyCombination: string) {
    // Find the matching shortcut
    const matchingShortcut = Array.from(this.shortcuts.values()).find(
      (shortcut) => shortcut.key === keyCombination,
    );

    // Execute the action if a matching shortcut is found
    if (matchingShortcut) {
      matchingShortcut.action();
    }
  }

  public changeShortcut(id: ShortcutKeybindingsAliases, newKey: string) {
    this.keybindings[id] = newKey;
    const shortcut = this.shortcuts.get(id);
    if (shortcut) {
      shortcut.key = newKey;
      // Notify Electron about the change if needed
    }
  }
}

export default ShortcutManager;

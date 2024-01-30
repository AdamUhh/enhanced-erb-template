import {
  Shortcut,
  ShortcutEventListener,
  ShortcutKeybindings,
  ShortcutKeybindingsAliases,
} from 'shared/types';

/**
 * ShortcutManager class manages keyboard shortcuts.
 * It provides methods to register, unregister, execute, retrieve shortcuts, and emits changes when registering.
 */
class ShortcutManager {
  private shortcuts: Map<ShortcutKeybindingsAliases, Shortcut>;

  private keybindings: Record<ShortcutKeybindingsAliases, string>;

  private listeners: Map<number, ShortcutEventListener>; // Use Map instead of Set

  private listenerIdCounter: number;

  private userIsChangingKeybinds: boolean;

  /**
   * Constructs a new ShortcutManager instance.
   */
  constructor() {
    this.shortcuts = new Map();
    this.keybindings = ShortcutKeybindings;
    this.listeners = new Map();
    this.listenerIdCounter = 0;
    this.userIsChangingKeybinds = false;
  }

  /**
   * Adds a listener for shortcut events.
   * @param listener - The function to be called when a shortcut event occurs.
   * @returns The listener ID.
   */
  public addListener(listener: ShortcutEventListener): number {
    const listenerId = ++this.listenerIdCounter;
    this.listeners.set(listenerId, listener);
    this.emitEvent();
    return listenerId;
  }

  /**
   * Removes a listener for shortcut events.
   * @param listenerId - The ID of the listener to be removed.
   */
  public removeListener(listenerId: number) {
    this.listeners.delete(listenerId);
  }

  /**
   * Emits a shortcut event to all registered listeners.
   */
  private emitEvent() {
    this.listeners.forEach((listener) => listener());
  }

  /**
   * Registers a new keyboard shortcut.
   * @param id - The identifier for the shortcut.
   * @param action - The function to be executed when the shortcut is triggered.
   */
  public registerShortcut(
    id: ShortcutKeybindingsAliases,
    action: (...args: any[]) => any,
  ) {
    const key = this.keybindings[id];
    if (key) {
      this.shortcuts.set(id, { id, key, action });
    } else {
      console.error(`Keyboard shortcut not found for ID: ${id}`);
    }
  }

  /**
   * Unregisters a keyboard shortcut.
   * @param id - The identifier of the shortcut to be unregistered.
   */
  public unregisterShortcut(id: ShortcutKeybindingsAliases) {
    this.shortcuts.delete(id);
  }

  /**
   * Executes the action associated with a given key combination.
   * @param keyCombination - The key combination to be executed.
   */
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

  /**
   * Changes the key combination associated with a shortcut.
   * @param id - The identifier of the shortcut to be modified.
   * @param newKey - The new key combination for the shortcut.
   */
  public changeShortcut(id: ShortcutKeybindingsAliases, newKey: string) {
    this.keybindings[id] = newKey;
    const shortcut = this.shortcuts.get(id);
    if (shortcut) {
      shortcut.key = newKey;
      // Notify Electron about the change if needed
    }
  }

  /**
   * Retrieves all registered shortcuts.
   * @returns An array containing all registered shortcuts.
   */
  get getShortcuts(): Shortcut[] {
    return Array.from(this.shortcuts.values());
  }

  public setUserIsChangingKeybinds(_bool: boolean = false) {
    this.userIsChangingKeybinds = _bool;
  }

  get getUserIsChangingKeybinds(): boolean {
    return this.userIsChangingKeybinds;
  }
}

export default ShortcutManager;

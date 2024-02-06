import { GenericFunction, GenericVoidFunction } from 'shared/types/generic';
import { IpcChannels } from 'shared/types/ipc';
import { Shortcut } from 'shared/types/keybindings';
import { DefaultShortcutKeybindings } from './defaultKeybindings';
import { ShortcutKeybindingsAliases } from './keybindingAliases';

/**
 * ShortcutManager class manages keyboard shortcuts.
 *
 * Provides methods to register, unregister, execute, retrieve shortcuts, and emits changes when registering.
 */
class ShortcutManager {
  /**
   *  Used to relate a shortcut alias to a Shortcut object
   *  containing an action callback, title, description, etc.
   * */
  private shortcuts: Map<ShortcutKeybindingsAliases, Shortcut>;

  /** used to relate a shortcut alias to a sequence of key combinations (shortcut) */
  private keybindings: typeof DefaultShortcutKeybindings;

  private listeners: Map<number, GenericVoidFunction>;

  private listenerIdCounter: number;

  private userIsChangingKeybinds: boolean;

  private allShortcutsRegistered: boolean;

  constructor() {
    this.shortcuts = new Map();
    this.keybindings = DefaultShortcutKeybindings;
    this.listeners = new Map();
    this.listenerIdCounter = 0;
    this.userIsChangingKeybinds = false;
    this.allShortcutsRegistered = false;

    this.initializeSavedKeybindings();
  }

  /**
   * Initializes user shortcuts and replaces any current shortcuts/keybinds
   */
  private async initializeSavedKeybindings() {
    const res = await window.electron.ipc.invoke<
      {
        alias: ShortcutKeybindingsAliases;
        keybind: string;
      }[]
    >(IpcChannels.getStoreValue, 'coreUserKeybinds');
    if (res.success && !!res.payload) {
      res.payload.forEach(({ alias, keybind }) => {
        if (this.keybindings[alias]) {
          this.keybindings[alias].keybind = keybind;
          const shortcutValues = this.shortcuts.get(alias);
          if (shortcutValues)
            this.shortcuts.set(alias, { ...shortcutValues, keybind });
        }
      });
      setTimeout(() => {
        this.emitEvent();
      }, 100);
    }
  }

  // #region Listeners for keyboard register/emits

  /**
   * Adds a listener for shortcut events.
   * @param listener - The function to be called when a shortcut event occurs.
   * @returns The listener ID.
   */
  public addListener(listener: GenericVoidFunction): number {
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

  // #endregion Listeners for keyboard register/emits

  /**
   * Registers a new keyboard shortcut.
   * @param id - The identifier for the shortcut.
   * @param action - The function to be executed when the shortcut is triggered.
   */
  public registerShortcut(
    id: ShortcutKeybindingsAliases,
    action: GenericFunction,
  ) {
    const keybind = this.keybindings[id];
    if (keybind) {
      this.shortcuts.set(id, {
        id,
        keybind: keybind.keybind,
        title: keybind.title,
        description: keybind.description,
        action,
      });

      // Check if all keybind-shortcuts have been registered, then emit
      const allShortcutsRegistered = Object.keys(this.keybindings).every(
        (key) => this.shortcuts.has(key as ShortcutKeybindingsAliases),
      );
      if (allShortcutsRegistered && !this.allShortcutsRegistered) {
        this.allShortcutsRegistered = true;
        this.emitEvent();
      }
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
      (shortcut) => shortcut.keybind === keyCombination,
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
    const shortcut = this.shortcuts.get(id);
    if (shortcut) {
      shortcut.keybind = newKey;
      this.keybindings[id] = { ...this.keybindings[id], keybind: newKey };

      // ? save all keybinds to electron store
      window.electron.ipc.invoke(IpcChannels.setStoreValue, {
        key: 'coreUserKeybinds',
        state: Object.entries(this.keybindings).map(([key, value]) => ({
          alias: key as ShortcutKeybindingsAliases,
          keybind: value.keybind,
        })),
      });
      this.emitEvent();
    }
  }

  /**
   * Retrieves all registered shortcuts.
   * @returns An array containing all registered shortcuts.
   */
  get getShortcuts(): Shortcut[] {
    return Array.from(this.shortcuts.values());
  }

  /**
   * Used to check if user is currently changing keybindings. if it is,
   * halt all current shortcuts listeners for
   * @param _bool - Is the user changing keybinds
   */
  public setUserIsChangingKeybinds(_bool: boolean = false) {
    this.userIsChangingKeybinds = _bool;
  }

  /**
   * @returns A boolean on whether the user is currently changing keybinds
   */
  get getUserIsChangingKeybinds(): boolean {
    return this.userIsChangingKeybinds;
  }
}

export default ShortcutManager;

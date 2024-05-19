import {
  DefaultShortcutKeybindings,
  DefaultShortcutKeybindingsOG,
  ShortcutKeybindingsAliases,
} from './defaults';

type ShortcutHandler = () => void;

export type Registrations = {
  /** Shortcut alias to reference */
  alias: ShortcutKeybindingsAliases;
  /** Handler to callback */
  handler: ShortcutHandler;
  /** Indicates whether handler should be called within react component itself (via Events) */
  isEventSubscriber: boolean;
};

export interface ShortcutRegistration {
  /** Handler to callback */
  handler: ShortcutHandler;
  /**
   * Optional condition for determining if the callback can be executed.
   *
   * Useful in context-sensitive scenarios, such as allowing execution only when certain elements are focused.
   */
  when?: () => boolean;
  /** Indicates whether handler should be called within react component itself (via Events) */
  isEventSubscriber: boolean;
}

export class ShortcutRegistry {
  /** Map to store registered shortcuts and their handlers */
  private registry: Map<ShortcutKeybindingsAliases, ShortcutRegistration[]> =
    new Map();

  /** Register/save a new shortcut to registry */
  registerShortcut(
    alias: ShortcutKeybindingsAliases,
    handler: ShortcutHandler,
    when?: () => boolean,
    isEventSubscriber: boolean = false,
  ) {
    const registration: ShortcutRegistration = {
      handler,
      when,
      isEventSubscriber,
    };
    const existing = this.registry.get(alias) || [];
    this.registry.set(alias, [...existing, registration]);
  }

  /** Unregister shortcut from registry */
  unregisterShortcut(alias: ShortcutKeybindingsAliases) {
    this.registry.delete(alias);
  }

  runShortcut(alias: ShortcutKeybindingsAliases) {
    const registrations = this.registry.get(alias) || [];
    const matchingHandlers = registrations
      .filter((reg) => !reg.when || reg.when())
      .map((reg) => reg.handler);
    matchingHandlers.forEach((handler) => handler());
  }

  resetShortcuts() {
    Object.entries(DefaultShortcutKeybindings).forEach(([alias, shortcut]) => {
      shortcut.keybind =
        DefaultShortcutKeybindingsOG[
          alias as ShortcutKeybindingsAliases
        ].keybind;
    });
  }

  getShortcuts(): Map<ShortcutKeybindingsAliases, ShortcutRegistration[]> {
    return this.registry;
  }

  changeShortcut(alias: ShortcutKeybindingsAliases, newKeybind: string) {
    // Update the keybind in DefaultShortcutKeybindings
    DefaultShortcutKeybindings[alias].keybind = newKeybind;

    // // ? TODO: perhaps the below is not necessary? forgot to comment why I wrote it
    // // Get the existing registrations for the alias
    // const registrations = this.registry.get(alias) || [];

    // // Deregister the existing shortcut
    // this.unregisterShortcut(alias);

    // // Re-register the shortcut with the new keybind
    // registrations.forEach((registration) => {
    //   this.registerShortcut(
    //     alias,
    //     registration.handler,
    //     registration.when,
    //     registration.isEventSubscriber,
    //   );
    // });
  }

  private getAliasFromChord(
    normalizedChord: string,
  ): ShortcutKeybindingsAliases | null {
    const entry = Object.entries(DefaultShortcutKeybindings).find(
      ([, value]) => {
        return value.keybind.toLowerCase() === normalizedChord;
      },
    );

    return entry ? (entry[0] as ShortcutKeybindingsAliases) : null;
  }

  getDuplicateFirstChords(chord: string[]) {
    const normalizedChord = chord.join(', '); // ['ctrl + shift + a', 'ctrl + shift + s'] -> 'ctrl + shift + a, ctrl + shift + s'

    return Object.entries(DefaultShortcutKeybindings).filter(
      (d) => d[1].keybind.split(',')[0].toLowerCase() === normalizedChord,
    );
  }

  /** Get the registered obj for a given shortcut alias */
  getRegistrations(chord: string[]): Registrations[] {
    const normalizedChord = chord.join(', '); // ['ctrl + shift + a', 'ctrl + shift + s'] -> 'ctrl + shift + a, ctrl + shift + s'

    const alias = this.getAliasFromChord(normalizedChord);

    if (!alias) return [];

    const registrations = this.registry.get(alias) || [];

    return registrations
      .filter((reg) => !reg.when || reg.when())
      .map((reg) => ({
        alias,
        handler: reg.handler,
        isEventSubscriber: reg.isEventSubscriber,
      }));
  }
}

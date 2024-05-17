import {
  DefaultShortcutKeybindings,
  ShortcutKeybindingsAliases,
} from './defaults';

type ShortcutHandler = () => void;

type Registrations = {
  alias: ShortcutKeybindingsAliases;
  isEventSubscriber: boolean;
  handler: ShortcutHandler;
};

export interface ShortcutRegistration {
  handler: ShortcutHandler;
  when?: () => boolean;
  isEventSubscriber: boolean;
}

export class ShortcutRegistry {
  // Map to store registered shortcuts and their handlers
  private registry: Map<ShortcutKeybindingsAliases, ShortcutRegistration[]> =
    new Map();

  // Register a new shortcut
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

  // Deregister a shortcut
  deregisterShortcut(alias: ShortcutKeybindingsAliases) {
    this.registry.delete(alias);
  }

  private getAliasFromChord(
    normalizedAlias: string,
  ): ShortcutKeybindingsAliases | null {
    const entry = Object.entries(DefaultShortcutKeybindings).find(
      ([, value]) => {
        return value.keybind.toLowerCase() === normalizedAlias;
      },
    );

    return entry ? (entry[0] as ShortcutKeybindingsAliases) : null;
  }

  runShortcut(alias: ShortcutKeybindingsAliases) {
    const registrations = this.registry.get(alias) || [];
    const matchingHandlers = registrations
      .filter((reg) => !reg.when || reg.when())
      .map((reg) => reg.handler);
    matchingHandlers.forEach((handler) => handler());
  }

  getShortcuts(): Map<ShortcutKeybindingsAliases, ShortcutRegistration[]> {
    return this.registry;
  }

  // Get the handlers for a given shortcut alias
  getHandlers(chord: string[]): Registrations[] {
    const normalizedChord = chord.join(', '); // ['ctrl + shift + a', 'ctrl + shift + s'] -> 'ctrl + shift + a, ctrl + shift + s'
    console.log(normalizedChord);
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

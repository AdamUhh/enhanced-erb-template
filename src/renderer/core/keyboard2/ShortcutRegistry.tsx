type ShortcutHandler = () => void;

interface ShortcutRegistration {
  handler: ShortcutHandler;
  when?: () => boolean;
}

export class ShortcutRegistry {
  // Map to store registered shortcuts and their handlers
  private registry: Map<string, ShortcutRegistration[]> = new Map();

  // Register a new shortcut
  registerShortcut(
    alias: string,
    handler: ShortcutHandler,
    when?: () => boolean,
  ) {
    const registration: ShortcutRegistration = { handler, when };
    const existing = this.registry.get(alias) || [];
    this.registry.set(alias, [...existing, registration]);
  }

  // Deregister a shortcut
  deregisterShortcut(alias: string) {
    this.registry.delete(alias);
  }

  // Get the handlers for a given shortcut alias
  getHandlers(alias: string): ShortcutHandler[] {
    const registrations = this.registry.get(alias) || [];
    return registrations
      .filter((reg) => !reg.when || reg.when())
      .map((reg) => reg.handler);
  }
}

import { ShortcutKeybindingsAliases } from './keybindingAliases';

export const DefaultShortcutKeybindings: Record<
  ShortcutKeybindingsAliases,
  { keybind: string; title: string; description?: string }
> = {
  [ShortcutKeybindingsAliases.toggleExample]: {
    keybind: 'Ctrl+Shift+A',
    title: 'Toggle Example',
  },
  [ShortcutKeybindingsAliases.toggleWithNotification]: {
    keybind: 'Ctrl+Shift+S',
    title: 'Toggle With Notification',
  },
  [ShortcutKeybindingsAliases.toggleWithByeNotification]: {
    keybind: 'Ctrl+Shift+D',
    title: 'Toggle With Bye Notification',
  },
  [ShortcutKeybindingsAliases.toggleDeveloperTools]: {
    keybind: 'F12',
    title: 'Toggle Developer Tools',
    description:
      'Shortcut will not work if window is not active/developer tools is active instead',
  },
};

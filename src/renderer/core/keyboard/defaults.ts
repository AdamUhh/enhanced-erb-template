export enum ShortcutKeybindingsAliases {
  toggleExample = 'toggleExample',
  toggleWithNotification = 'toggleWithNotification',
  toggleWithByeNotification = 'toggleWithByeNotification',
  toggleDeveloperTools = 'toggleDeveloperTools',
}

export const DefaultShortcutKeybindingsOG: Record<
  ShortcutKeybindingsAliases,
  { keybind: string; title: string; description?: string }
> = {
  [ShortcutKeybindingsAliases.toggleExample]: {
    keybind: 'Ctrl + Shift + A',
    title: 'Toggle Example',
  },
  [ShortcutKeybindingsAliases.toggleWithNotification]: {
    keybind: 'Ctrl + Shift + S, S',
    title: 'Toggle With Notification',
  },
  [ShortcutKeybindingsAliases.toggleWithByeNotification]: {
    keybind: 'Ctrl + Shift + S, D',
    title: 'Toggle With Bye Notification',
  },
  [ShortcutKeybindingsAliases.toggleDeveloperTools]: {
    keybind: 'F12',
    title: 'Toggle Developer Tools',
    description:
      'Shortcut will not work if window is not active/developer tools is active instead',
  },
};

export const DefaultShortcutKeybindings = structuredClone(
  DefaultShortcutKeybindingsOG,
);

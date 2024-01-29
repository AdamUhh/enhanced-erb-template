enum ShortcutKeybindingsAliases {
  toggleExample = 'toggleExample',
  toggleWithNotification = 'toggleWithNotification',
  toggleWithByeNotification = 'toggleWithByeNotification',
}

const ShortcutKeybindings: Record<ShortcutKeybindingsAliases, string> = {
  [ShortcutKeybindingsAliases.toggleExample]: 'Alt+Shift+A',
  [ShortcutKeybindingsAliases.toggleWithNotification]: 'Ctrl+Shift+S',
  [ShortcutKeybindingsAliases.toggleWithByeNotification]: 'Ctrl+Shift+D',
};

export { ShortcutKeybindingsAliases, ShortcutKeybindings };

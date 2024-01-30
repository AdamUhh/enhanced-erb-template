// ? TODO: add title, description, order, groupby?, to shortcuts
// ? TODO: save shortcuts (to system). either use Store, or edit a JSON

enum ShortcutKeybindingsAliases {
  toggleExample = 'toggleExample',
  toggleWithNotification = 'toggleWithNotification',
  toggleWithByeNotification = 'toggleWithByeNotification',
}

const ShortcutKeybindings: Record<ShortcutKeybindingsAliases, string> = {
  [ShortcutKeybindingsAliases.toggleExample]: 'Ctrl+Shift+A',
  [ShortcutKeybindingsAliases.toggleWithNotification]: 'Ctrl+Shift+S',
  [ShortcutKeybindingsAliases.toggleWithByeNotification]: 'Ctrl+Shift+D',
};

interface Shortcut {
  id: ShortcutKeybindingsAliases;
  key: string;
  action: (...args: any[]) => any;
}

type ShortcutEventListener = (...args: any[]) => void;

export { ShortcutKeybindingsAliases, ShortcutKeybindings };

export type { Shortcut, ShortcutEventListener };

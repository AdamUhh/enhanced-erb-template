import { ShortcutKeybindingsAliases } from 'shared/keyboard/keybindingAliases';
import { GenericFunction } from './generic';

interface Shortcut {
  id: ShortcutKeybindingsAliases;
  keybind: string;
  title: string;
  description?: string;
  action: GenericFunction;
}

export type { Shortcut };

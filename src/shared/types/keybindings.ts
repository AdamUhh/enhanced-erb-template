import { ShortcutKeybindingsAliases } from 'shared/keyboard/keybindingAliases';
import { GenericFunction } from './generic';

export interface Shortcut {
  id: ShortcutKeybindingsAliases;
  keybind: string;
  title: string;
  description?: string;
  action: GenericFunction;
}

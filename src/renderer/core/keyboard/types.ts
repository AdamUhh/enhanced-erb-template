import { GenericFunction } from '../../../shared/types/generic';
import { ShortcutKeybindingsAliases } from './keybindingAliases';

export interface Shortcut {
  id: ShortcutKeybindingsAliases;
  keybind: string;
  title: string;
  description?: string;
  hideInMenu?: boolean;
  action: GenericFunction;
}

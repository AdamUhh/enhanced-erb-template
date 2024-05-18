import { useContext, useState, useEffect } from 'react';
import { ShortcutContext } from './ShortcutContext';
import { ShortcutRegistration } from './ShortcutRegistry';
import { ShortcutKeybindingsAliases } from './defaults';

export const useShortcutContext = () => {
  const { getShortcuts, runShortcut, changeShortcut, isModifyingShortcut } =
    useContext(ShortcutContext);
  const [shortcuts, setShortcuts] = useState<
    Map<ShortcutKeybindingsAliases, ShortcutRegistration[]>
  >(new Map());

  useEffect(() => {
    const s = getShortcuts();
    setShortcuts(s);
  }, [getShortcuts]);

  return {
    shortcuts: Array.from(shortcuts.entries()),
    runShortcut,
    changeShortcut,
    isModifyingShortcut,
  };
};

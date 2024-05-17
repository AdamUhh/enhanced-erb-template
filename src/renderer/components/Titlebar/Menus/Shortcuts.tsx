import { ShortcutContext } from 'core/keyboard2/ShortcutContext';
import { ShortcutRegistration } from 'core/keyboard2/ShortcutRegistry';
import {
  DefaultShortcutKeybindings,
  ShortcutKeybindingsAliases,
} from 'core/keyboard2/defaults';
import { useContext, useEffect, useState } from 'react';
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from 'shadcn/components/ui/custom/menubar';

export default function ShortcutsMenu() {
  const { getShortcuts, runShortcut } = useContext(ShortcutContext);
  const [shortcuts, setShortcuts] = useState<
    Map<ShortcutKeybindingsAliases, ShortcutRegistration[]>
  >(new Map());

  useEffect(() => {
    const s = getShortcuts();
    setShortcuts(s);
  }, [getShortcuts]);

  return (
    <MenubarMenu>
      <MenubarTrigger className="font-medium">Shortcuts</MenubarTrigger>
      <MenubarContent>
        {Array.from(shortcuts.entries()).map(([alias]) => (
          <MenubarItem key={alias} onClick={() => runShortcut(alias)}>
            {DefaultShortcutKeybindings[alias].title}
            <MenubarShortcut>
              {DefaultShortcutKeybindings[alias].keybind}
            </MenubarShortcut>
          </MenubarItem>
        ))}
      </MenubarContent>
    </MenubarMenu>
  );
}

import { DefaultShortcutKeybindings } from 'core/keyboard/defaults';
import { useShortcutContext } from 'core/keyboard/useShortcutContext';
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from 'shadcn/components/ui/custom/menubar';

export default function ShortcutsMenu() {
  const { shortcuts, runShortcut } = useShortcutContext();

  return (
    <MenubarMenu>
      <MenubarTrigger className="font-medium">Shortcuts</MenubarTrigger>
      <MenubarContent>
        {shortcuts.map(([alias]) => (
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

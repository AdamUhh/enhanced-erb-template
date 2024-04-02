import { useRegisterShortcut } from 'core/hooks/useShortcutRegisterEffect';
import { ShortcutKeybindingsAliases } from 'core/keyboard/keybindingAliases';
import { checkForupdates, clearStore, toggleDevTools } from 'core/utils/ipc';
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from 'shadcn/components/ui/custom/menubar';

export default function HelpMenu() {
  useRegisterShortcut({
    id: ShortcutKeybindingsAliases.toggleDeveloperTools,
    action: toggleDevTools,
  });

  return (
    <MenubarMenu>
      <MenubarTrigger className="font-medium">Help</MenubarTrigger>
      <MenubarContent>
        <MenubarItem onClick={toggleDevTools}>
          Toggle Developer Tools <MenubarShortcut>F12</MenubarShortcut>
        </MenubarItem>
        <MenubarItem onClick={clearStore}>Clear Store</MenubarItem>
        <MenubarItem onClick={checkForupdates}>Check for updates</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
}

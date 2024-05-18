import { ShortcutKeybindingsAliases } from 'core/keyboard/defaults';
import { useRegisterShortcut } from 'core/keyboard/useRegisterShortcut';
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
    alias: ShortcutKeybindingsAliases.toggleDeveloperTools,
    handler: toggleDevTools,
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

import { useShortcutRegisterEffect } from 'hooks/useShortcutRegisterEffect';
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from 'shadcn/components/ui/custom/menubar';
import { ShortcutKeybindingsAliases } from 'shared/types';
import { isDevelopment } from 'shared/utils/environment';
import { checkForupdates, clearStore, toggleDevTools } from 'utils/ipc';

export default function HelpMenu() {
  useShortcutRegisterEffect({
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
        {!isDevelopment && (
          <MenubarItem onClick={checkForupdates}>Check for updates</MenubarItem>
        )}
      </MenubarContent>
    </MenubarMenu>
  );
}

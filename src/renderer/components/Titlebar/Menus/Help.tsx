import { getEffectiveKeyBindings, useRegisterShortcut } from 'core/keyboard3';
import { checkForupdates, clearStore, toggleDevTools } from 'core/utils/ipc';
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from 'shadcn/components/ui/custom/menubar';

export default function HelpMenu() {
  // useRegisterShortcut({
  //   alias: 'Ctrl + B',
  //   handler: toggleDevTools,
  // });

  useRegisterShortcut({
    keys: getEffectiveKeyBindings().save,
    callback: () => toggleDevTools(),
    when: () => true, // This shortcut is always active
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

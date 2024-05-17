import { ShortcutKeybindingsAliases } from 'core/keyboard2/defaults';
import { useRegisterShortcut } from 'core/keyboard2/useRegisterShortcut';
import { checkForupdates, clearStore, toggleDevTools } from 'core/utils/ipc';
import { useState } from 'react';
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from 'shadcn/components/ui/custom/menubar';

export default function HelpMenu() {
  const [toggle, setToggle] = useState(true);

  function toggleSetToggle() {
    setToggle(true);
  }

  function toggleToggle() {
    toggleDevTools();
    setToggle(false);
  }

  useRegisterShortcut({
    alias: ShortcutKeybindingsAliases.toggleDeveloperTools,
    handler: toggleToggle,
    when() {
      return toggle;
    },
  });

  return (
    <MenubarMenu>
      <MenubarTrigger className="font-medium">Help</MenubarTrigger>
      <MenubarContent>
        <MenubarItem onClick={() => toggleSetToggle()}>
          TOGGLE <MenubarShortcut>F12</MenubarShortcut>
        </MenubarItem>
        <MenubarItem onClick={toggleDevTools}>
          Toggle Developer Tools <MenubarShortcut>F12</MenubarShortcut>
        </MenubarItem>
        <MenubarItem onClick={clearStore}>Clear Store</MenubarItem>
        <MenubarItem onClick={checkForupdates}>Check for updates</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
}

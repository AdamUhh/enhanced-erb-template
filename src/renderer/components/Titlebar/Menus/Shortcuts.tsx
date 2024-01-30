import { useShortcutListener } from 'hooks/useShortcutListener';
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from 'shadcn/components/ui/custom/menubar';

export default function ShortcutsMenu() {
  const { shortcuts } = useShortcutListener();

  return (
    <MenubarMenu>
      <MenubarTrigger className="font-medium">Shortcuts</MenubarTrigger>
      <MenubarContent>
        {shortcuts.map((s) => (
          <MenubarItem key={s.id} onClick={s.action}>
            {s.id} <MenubarShortcut>{s.key}</MenubarShortcut>
          </MenubarItem>
        ))}
      </MenubarContent>
    </MenubarMenu>
  );
}

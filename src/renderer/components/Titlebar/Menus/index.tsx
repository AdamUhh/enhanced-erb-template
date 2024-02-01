import { Menubar } from 'shadcn/components/ui/custom/menubar';
import HelpMenu from './Help';
import ShortcutsMenu from './Shortcuts';

export default function Menus() {
  return (
    <Menubar className="[-webkit-app-region:no-drag] [-webkit-user-select:auto]">
      <HelpMenu />
      <ShortcutsMenu />
    </Menubar>
  );
}

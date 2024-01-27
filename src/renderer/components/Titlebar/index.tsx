import { Minus, Square, X } from 'lucide-react';
import { Button } from 'shadcn/components/ui/button';
import { Menubar } from 'shadcn/components/ui/custom/menubar';
import logo from '../../../../assets/icon.png';
import { closeApp, maximizeApp, minimizeApp } from '../../utils/ipc';
import FileMenu from './Menus/File';
import HelpMenu from './Menus/Help';

export default function Titlebar() {
  return (
    <div className="h-8 items-center w-full text-sm pl-2 bg-background shadow shadow-white/10 [-webkit-app-region:drag] [-webkit-user-select:none] flex gap-2">
      <img src={logo} alt="VSTL" className="h-7" />
      <Menubar className="[-webkit-app-region:no-drag] [-webkit-user-select:auto]">
        <FileMenu />
        <HelpMenu />
      </Menubar>
      <div className="ml-auto grid grid-cols-3 w-28 h-full [-webkit-app-region:no-drag] [-webkit-user-select:auto]">
        <Button
          variant="ghost"
          className="p-0 h-full w-full rounded-none"
          onClick={minimizeApp}
        >
          <Minus size={20} />
        </Button>
        <Button
          variant="ghost"
          className="p-0 h-full w-full rounded-none"
          onClick={maximizeApp}
        >
          <Square size={16} />
        </Button>
        <Button
          variant="destructive-ghost"
          className="p-0 h-full w-full rounded-none"
          onClick={closeApp}
        >
          <X size={20} />
        </Button>
      </div>
    </div>
  );
}

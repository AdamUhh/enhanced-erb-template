import { Minus, Square, X } from 'lucide-react';
import { Button } from 'shadcn/components/ui/button';
import logo from '../../../../assets/icon.png';
import { closeApp, maximizeApp, minimizeApp } from '../../utils/ipc';
import Menus from './Menus';

export default function Titlebar() {
  return (
    <div className="flex h-8 w-full items-center gap-2 bg-background pl-2 text-sm shadow shadow-white/10 [-webkit-app-region:drag] [-webkit-user-select:none]">
      <img src={logo} alt="VSTL" className="h-7" />
      <Menus />
      <div className="ml-auto grid h-full w-28 grid-cols-3 [-webkit-app-region:no-drag] [-webkit-user-select:auto]">
        <Button
          variant="ghost"
          className="h-full w-full rounded-none p-0"
          onClick={minimizeApp}
        >
          <Minus size={20} />
        </Button>
        <Button
          variant="ghost"
          className="h-full w-full rounded-none p-0"
          onClick={maximizeApp}
        >
          <Square size={16} />
        </Button>
        <Button
          variant="destructive-ghost"
          className="h-full w-full rounded-none p-0"
          onClick={closeApp}
        >
          <X size={20} />
        </Button>
      </div>
    </div>
  );
}

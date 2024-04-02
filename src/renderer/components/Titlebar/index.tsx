import Menus from './Menus';
import WindowButtons from './WindowButtons';
import logo from '../../../../assets/icon.png';

export default function Titlebar() {
  return (
    <div className="flex h-8 w-full items-center gap-2 bg-background pl-2 text-sm shadow shadow-white/10 [-webkit-app-region:drag] [-webkit-user-select:none]">
      <img src={logo} alt="VSTL" className="h-7" />
      <Menus />
      <WindowButtons />
    </div>
  );
}

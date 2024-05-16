import useIpcOnMountListener from 'core/hooks/ipc/useIpcOnMountListener';
import { CopyIcon, Minus, Square, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from 'shadcn/components/ui/button';
import { IpcChannels } from 'shared/types/ipc';
import { closeApp, maximizeApp, minimizeApp } from '../../core/utils/ipc';

export default function WindowButtons() {
  const [isMaximized, setIsMaximized] = useState(false);

  // ? Send an Ipc request and listen to changes for whether window is maximized
  useIpcOnMountListener({
    channel: IpcChannels.isAppMaximized,
    successCallback: (_, payload) => setIsMaximized(payload),
  });

  return (
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
        {isMaximized ? <CopyIcon size={16} /> : <Square size={16} />}
      </Button>
      <Button
        variant="destructive-ghost"
        className="h-full w-full rounded-none p-0"
        onClick={closeApp}
      >
        <X size={20} />
      </Button>
    </div>
  );
}

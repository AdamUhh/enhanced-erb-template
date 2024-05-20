import useIpcListener from 'core/hooks/ipc/useIpcListener';
import {
  displayErrorToast,
  displaySuccessToast,
} from 'core/utils/displayToast';
import { quitAndInstall } from 'core/utils/ipc';
import { useState } from 'react';
import { Button } from 'shadcn/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from 'shadcn/components/ui/dialog';
import { IpcChannels } from 'shared/types/ipc';

export default function AppUpdaterListener() {
  const [showDialog, setShowDialog] = useState(false);

  const [updateInfo, setUpdateInfo] = useState({ msg: '', description: '' });

  const handleDialogVisibility = () => {
    setShowDialog(true);
  };

  useIpcListener({
    channel: IpcChannels.appUpdateInfo,
    successCallback({ msg, description, payload }) {
      setUpdateInfo({
        msg: msg || 'No release title',
        description: description || 'No release information',
      });
      displaySuccessToast({
        msg: 'Update Available',
        description: 'Ready to install?',
        payload,
        action: handleDialogVisibility,
        label: 'View More',
      });
    },
    failCallback({ msg, description, payload }) {
      displayErrorToast({ msg, description, payload });
    },
  });

  if (showDialog) {
    return (
      <Dialog open={showDialog} onOpenChange={(close) => setShowDialog(close)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Release Info</DialogTitle>
          </DialogHeader>
          <h3 className="text-lg">{updateInfo.msg}</h3>
          <DialogDescription>{updateInfo.description}</DialogDescription>
          <Button
            className="ml-auto"
            onClick={() => {
              quitAndInstall();
              setShowDialog(false);
            }}
          >
            Update & Restart Now
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return null;
}

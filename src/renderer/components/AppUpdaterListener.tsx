import useIpcListener from 'core/hooks/ipc/useIpcListener';
import {
  displayErrorToast,
  displaySuccessToast,
} from 'core/utils/displayToast';
import { IpcChannels } from 'shared/types/ipc';

export default function AppUpdaterListener() {
  useIpcListener({
    channel: IpcChannels.appUpdateInfo,
    successCallback({ msg, description, payload }) {
      displaySuccessToast({ msg, description, payload });
    },
    failCallback({ msg, description, payload }) {
      displayErrorToast({ msg, description, payload });
    },
  });

  return null;
}

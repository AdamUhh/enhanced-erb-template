import { useEffect } from 'react';

import { GenericVoidFunction } from 'shared/types';

const useIpcEffect = ({
  channel,
  failCallback = () => {},
  successCallback = () => {},
}: {
  channel: string;
  failCallback?: GenericVoidFunction;
  successCallback?: GenericVoidFunction;
}) => {
  useEffect(() => {
    const callback = (event: any, data: any) => {
      const callbackFunction = data.success ? successCallback : failCallback;
      const payload = data.payload || undefined;
      callbackFunction(payload);
    };

    window.electron.ipc.on(channel, callback);

    return () => {
      window.electron.ipc.removeListener(channel, callback);
    };
  }, [channel, successCallback, failCallback]);
};

export { useIpcEffect };

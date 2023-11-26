import { useEffect } from 'react';

import { GenericVoidFunction } from 'shared/types';

const useIpcEffect = (
  channel: string,
  callback: GenericVoidFunction = () => {},
) => {
  useEffect(() => {
    window.electron.ipc.on(channel, callback);

    return () => {
      window.electron.ipc.removeListener(channel, callback);
    };
  }, [channel, callback]);
};

export { useIpcEffect };

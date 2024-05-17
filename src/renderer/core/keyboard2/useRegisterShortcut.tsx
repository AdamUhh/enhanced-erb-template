import { useContext, useEffect } from 'react';
import { ShortcutContext } from './ShortcutContext';

// Custom hook to register a shortcut
export const useRegisterShortcut = ({
  alias,
  handler,
  when,
}: {
  alias: string;
  handler: () => void;
  when?: () => boolean;
}) => {
  const { registerShortcut, deregisterShortcut } = useContext(ShortcutContext);

  // Register the shortcut on mount and deregister on unmount
  useEffect(() => {
    registerShortcut(alias, handler, when);
    return () => {
      deregisterShortcut(alias);
    };
  }, [registerShortcut, deregisterShortcut, alias, handler, when]);
};

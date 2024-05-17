import { useContext, useEffect } from 'react';
import { ShortcutContext } from './ShortcutContext';
import { ShortcutKeybindingsAliases } from './defaults';

// Custom hook to register a shortcut
export const useRegisterShortcut = ({
  alias,
  handler,
  when,
}: {
  alias: ShortcutKeybindingsAliases;
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

export const useRegisterEventShortcut = ({
  alias,
  handler,
  when,
}: {
  alias: ShortcutKeybindingsAliases;
  handler: () => void;
  when?: () => boolean;
}) => {
  const { registerShortcut, deregisterShortcut, subscribe, unsubscribe } =
    useContext(ShortcutContext);

  // Register the shortcut on mount and deregister on unmount
  useEffect(() => {
    subscribe(alias, handler);
    registerShortcut(alias, handler, when, true);
    return () => {
      unsubscribe(alias, handler);
      deregisterShortcut(alias);
    };
  }, [
    registerShortcut,
    deregisterShortcut,
    alias,
    handler,
    when,
    subscribe,
    unsubscribe,
  ]);
};

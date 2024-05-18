import { useContext, useEffect } from 'react';
import { ShortcutContext } from './ShortcutContext';
import { ShortcutKeybindingsAliases } from './defaults';

type RegisterType = {
  /**
   * The alias for the shortcut keybinding (must be specified in defaults)
   */
  alias: ShortcutKeybindingsAliases;
  /**
   * The function to be executed when the shortcut is triggered
   */
  handler: () => void;
  /**
   * An optional boolean function that determines if the shortcut should be enabled or not
   */
  when?: () => boolean;
};

/**
 * Used to register a shortcut. When a key of chords are run, the provided handler is invoked.
 *
 * @param alias - The alias for the shortcut keybinding.
 * @param handler - The function to be executed when the shortcut is triggered.
 * @param when - An optional function that determines if the shortcut should be enabled or not.
 */
export const useRegisterShortcut = ({ alias, handler, when }: RegisterType) => {
  const { registerShortcut, unregisterShortcut } = useContext(ShortcutContext);

  // Register the shortcut on mount and deregister on unmount
  useEffect(() => {
    registerShortcut(alias, handler, when);
    return () => {
      unregisterShortcut(alias);
    };
  }, [registerShortcut, unregisterShortcut, alias, handler, when]);
};

/**
 * Used to register a shortcut. When a key of chords are run, an event is sent to directly invoke the provided handler from the react component.
 *
 * This is useful when your handler callback is unable to be saved/referenced to the registry properly.
 *
 * @param alias - The alias for the shortcut keybinding.
 * @param handler - The function to be executed when the shortcut is triggered.
 * @param when - An optional function that determines if the shortcut should be enabled or not.
 */
export const useRegisterEventShortcut = ({
  alias,
  handler,
  when,
}: RegisterType) => {
  const { registerShortcut, unregisterShortcut, subscribe, unsubscribe } =
    useContext(ShortcutContext);

  // Register the shortcut on mount and deregister on unmount
  useEffect(() => {
    subscribe(alias, handler);
    registerShortcut(alias, handler, when, true);
    return () => {
      unsubscribe(alias, handler);
      unregisterShortcut(alias);
    };
  }, [
    registerShortcut,
    unregisterShortcut,
    alias,
    handler,
    when,
    subscribe,
    unsubscribe,
  ]);
};

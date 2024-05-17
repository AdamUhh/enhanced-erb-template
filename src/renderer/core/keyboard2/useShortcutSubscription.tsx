import { ReactNode, useContext, useEffect, useState } from 'react';
import { ShortcutContext } from './ShortcutContext';

// Custom hook to subscribe to shortcut events
export const useShortcutSubscription = () => {
  const { activeShortcut } = useContext(ShortcutContext);
  const [subscription, setSubscription] = useState<ReactNode>(null);

  // Update the subscription whenever the active shortcut changes
  useEffect(() => {
    const handleShortcutChange = (shortcut: string | null) => {
      setSubscription(<div>Active shortcut: {shortcut || 'None'}</div>);
    };

    handleShortcutChange(activeShortcut);

    return () => {
      setSubscription(null);
    };
  }, [activeShortcut]);

  return subscription;
};

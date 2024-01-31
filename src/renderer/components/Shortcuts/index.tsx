import { useShortcutListener } from 'hooks/useShortcutListener';
import { CheckCircle2Icon, XCircleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from 'shadcn/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'shadcn/components/ui/custom/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'shadcn/components/ui/dialog';
import { cn } from 'shadcn/lib/utils';
import ShortcutManager from 'shared/keyboard/shortcutManager';
import { Shortcut } from 'shared/types';
import { generateKeyCombination } from './KeyboardRegister';

function EditShortcut({
  allShortcuts,
  shortcutManager,
  shortcut,
  handleShortcutEditFinished,
}: {
  allShortcuts: Shortcut[];
  shortcutManager: ShortcutManager;
  shortcut: Shortcut;
  handleShortcutEditFinished: () => void;
}) {
  const [newKey, setNewKey] = useState(shortcut.keybind);
  const [keyExists, setKeyExists] = useState(true);
  const [canSave, setCanSave] = useState(false);

  const handleSave = () => {
    if (shortcut.keybind !== newKey)
      shortcutManager.changeShortcut(shortcut.id, newKey);

    handleShortcutEditFinished();
  };

  useEffect(() => {
    shortcutManager.setUserIsChangingKeybinds(true);
    const handleKeyPress = (event: KeyboardEvent) => {
      const { newKey: _newKey, isValidKeyCombination } =
        generateKeyCombination(event);

      // ? does the key already exist/mapped to some other shortcut
      const hasExistingKey = allShortcuts.some((s) => s.keybind === _newKey);

      setNewKey(_newKey);

      // if (isValidKeyCombination) {
      //   // ? if it does not have an existing key
      //   if (!hasExistingKey) {
      //     setCanSave(true);
      //     setKeyExists(false);
      //   } else {
      //     // ? key already exists
      //     setCanSave(false);
      //     setKeyExists(true);
      //   }
      // } else {
      //   // ? not a valid key combination
      //   setCanSave(false);
      //   setKeyExists(false);
      // }
      setCanSave(!!(isValidKeyCombination && !hasExistingKey));
      setKeyExists(!!(hasExistingKey && isValidKeyCombination));
    };

    // Add event listener for keypress
    window.addEventListener('keydown', handleKeyPress);

    // Remove event listener on component unmount
    return () => {
      shortcutManager.setUserIsChangingKeybinds(false);
      handleShortcutEditFinished();
      window.removeEventListener('keydown', handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allShortcuts, shortcut.id, shortcutManager]);

  return (
    <>
      <div
        className={cn(
          'flex gap-1',
          keyExists && !canSave && newKey !== shortcut.keybind && 'my-4',
        )}
      >
        <div className="-ml-3 flex items-center h-8 w-full rounded-md border border-input/60 focus-visible:border-input bg-background px-3 py-2 text-sm ring-offset-background">
          {newKey}
        </div>
        <Button
          variant="success-ghost"
          disabled={!canSave}
          className="h-8 px-1"
          onClick={handleSave}
        >
          <CheckCircle2Icon />
        </Button>
        <Button
          variant="destructive-ghost"
          className="h-8 px-1"
          onClick={handleShortcutEditFinished}
        >
          <XCircleIcon />
        </Button>
      </div>
      {keyExists && !canSave && newKey !== shortcut.keybind && (
        <span className="text-destructive font-semibold absolute bottom-0 left-4">
          Key exists, binded to:{' '}
          {allShortcuts.find((f) => f.keybind === newKey)?.id}
        </span>
      )}
    </>
  );
}

export default function ShortcutSettings() {
  const { shortcuts, shortcutManager } = useShortcutListener();
  const [selectedShortcut, setSelectedShortcut] = useState<Shortcut | null>(
    null,
  );

  const handleShortcutEdit = (shortcut: Shortcut) => {
    setSelectedShortcut(shortcut);
  };

  const handleShortcutEditFinished = () => {
    setSelectedShortcut(null);
  };

  const handleRowDoubleClick = (shortcut: Shortcut) => {
    handleShortcutEdit(shortcut);
  };

  return (
    <div className="mt-5 w-full">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full" onClick={() => {}}>
            View/Change Shortcut Settings
          </Button>
        </DialogTrigger>
        <DialogContent
          onClick={() => {
            if (selectedShortcut) handleShortcutEditFinished();
          }}
        >
          <DialogHeader>
            <DialogTitle>Keyboard Shortcuts</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Double click a row to change it&apos;s keybindings
          </DialogDescription>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%]">Commands</TableHead>
                <TableHead>Keybindings</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shortcuts.map((s: Shortcut) => (
                <TableRow
                  key={s.id}
                  onDoubleClick={() => handleRowDoubleClick(s)}
                  className="relative"
                >
                  <TableCell className="whitespace-pre-wrap">{s.id}</TableCell>
                  <TableCell>
                    {selectedShortcut === s ? (
                      <EditShortcut
                        allShortcuts={shortcuts}
                        shortcut={s}
                        shortcutManager={shortcutManager}
                        handleShortcutEditFinished={handleShortcutEditFinished}
                      />
                    ) : (
                      s.keybind
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </div>
  );
}

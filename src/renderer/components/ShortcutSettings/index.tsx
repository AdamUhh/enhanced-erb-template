import {
  DefaultShortcutKeybindings,
  ShortcutKeybindingsAliases,
} from 'core/keyboard/defaults';
import { useShortcutContext } from 'core/keyboard/useShortcutContext';
import { useState } from 'react';
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
import EditShortcut from './EditShortcut';

export default function ShortcutSettings() {
  const { shortcuts, changeShortcut, isModifyingShortcut, resetShortcuts } =
    useShortcutContext();

  const [dialogState, setDialogState] = useState<number | null>(null);

  const [selectedShortcut, setSelectedShortcut] =
    useState<ShortcutKeybindingsAliases | null>(null);

  const handleShortcutEdit = (shortcut: ShortcutKeybindingsAliases) => {
    setSelectedShortcut(shortcut);
  };

  const handleShortcutEditFinished = () => {
    setSelectedShortcut(null);
  };

  const handleRowDoubleClick = (shortcut: ShortcutKeybindingsAliases) => {
    handleShortcutEdit(shortcut);
  };

  return (
    <div className="w-fit">
      <Dialog>
        <DialogTrigger asChild onClick={() => setDialogState(0)}>
          <Button
            className="w-full bg-blue-500 hover:bg-blue-600"
            onClick={() => {}}
          >
            View/Change Shortcut Settings
          </Button>
        </DialogTrigger>
        {dialogState === 0 ? (
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
                {shortcuts
                  .slice() // Create a shallow copy of the array to avoid mutating the original
                  .sort(([aliasA], [aliasB]) =>
                    DefaultShortcutKeybindings[aliasA].title.localeCompare(
                      DefaultShortcutKeybindings[aliasB].title,
                    ),
                  )
                  .map(([alias]) => (
                    <TableRow
                      key={alias}
                      onDoubleClick={() => handleRowDoubleClick(alias)}
                      className="relative"
                    >
                      <TableCell
                        title={DefaultShortcutKeybindings[alias].description}
                        className="whitespace-pre-wrap pt-3 align-top"
                      >
                        {DefaultShortcutKeybindings[alias].title}
                        <br />
                      </TableCell>
                      <TableCell>
                        {selectedShortcut === alias ? (
                          <EditShortcut
                            allShortcuts={shortcuts}
                            shortcutAlias={alias}
                            changeShortcut={changeShortcut}
                            handleShortcutEditFinished={
                              handleShortcutEditFinished
                            }
                            isModifyingShortcut={isModifyingShortcut}
                          />
                        ) : (
                          DefaultShortcutKeybindings[alias].keybind
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <Button className="ml-auto" onClick={() => setDialogState(1)}>
              Reset Keybindings
            </Button>
          </DialogContent>
        ) : (
          dialogState === 1 && (
            <DialogContent>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>This cannot be undone.</DialogDescription>
              <div className="ml-auto flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => {
                    resetShortcuts();
                    setDialogState(0);
                  }}
                >
                  Yes, reset keybinds
                </Button>
                <Button variant="destructive" onClick={() => setDialogState(0)}>
                  Cancel
                </Button>
              </div>
            </DialogContent>
          )
        )}
      </Dialog>
    </div>
  );
}

import { useShortcutListener } from 'core/hooks/useShortcutListener';
import { Shortcut } from 'core/keyboard/types';
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

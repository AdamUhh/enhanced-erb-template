import { ShortcutContextTypes } from 'core/keyboard/ShortcutContext';
import { DefaultShortcutKeybindings } from 'core/keyboard/defaults';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'shadcn/components/ui/custom/table';
import EditShortcut from './EditShortcut';

export default function ShortcutTable({
  shortcuts,
  changeShortcut,
  isModifyingShortcut,
}: Pick<
  ShortcutContextTypes,
  'shortcuts' | 'changeShortcut' | 'isModifyingShortcut'
>) {
  const [selectedShortcut, setSelectedShortcut] = useState<string | null>(null);

  const handleShortcutEdit = (shortcut: string) => {
    setSelectedShortcut(shortcut);
  };

  const handleShortcutEditFinished = () => {
    setSelectedShortcut(null);
  };

  const handleRowDoubleClick = (shortcut: string) => {
    handleShortcutEdit(shortcut);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50%]">Commands</TableHead>
          <TableHead>Keybindings</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {shortcuts
          .slice()
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
                    handleShortcutEditFinished={handleShortcutEditFinished}
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
  );
}

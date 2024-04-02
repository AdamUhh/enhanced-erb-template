import { Menu, MenuItemConstructorOptions, WebContents } from 'electron';

/**
 * This dummy menu is needed just to prevent default windows behaviour,
 * such as preventing Ctrl+W from closing the app - instead, it will be used to close the tab
 */
export default function DummyMenu(webContents: WebContents | null) {
  const menuTemplate: MenuItemConstructorOptions[] = [
    {
      label: 'Dummy',
      submenu: [
        {
          label: 'Close',
          accelerator: 'CmdOrCtrl+W', // This sets the shortcut for Ctrl+W (CmdOrCtrl for cross-platform support)
          click: () => {},
        },
        // ? TODO: Add this to a command palette
        {
          label: '&Reload',
          accelerator: 'CmdOrCtrl+R',
          click: () => {
            webContents?.reload();
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}

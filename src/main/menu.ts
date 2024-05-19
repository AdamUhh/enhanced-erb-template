import { Menu, MenuItemConstructorOptions, WebContents } from 'electron';

/**
 * This dummy menu is needed just to prevent default windows behaviour,
 * such as preventing Ctrl+W from closing the app
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

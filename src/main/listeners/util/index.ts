import { dialog } from 'electron';

export function delayedErrorDialog(
  title: string,
  message: string,
  delay: number = 1000,
) {
  setTimeout(() => {
    dialog.showMessageBox({
      type: 'error',
      title,
      message: message.toString(),
    });
  }, delay);
}

import { dialog } from 'electron';

function delayedErrorDialog(
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

export { delayedErrorDialog };

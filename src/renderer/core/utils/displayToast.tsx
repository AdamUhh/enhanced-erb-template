import { toast } from 'sonner';

enum ToastType {
  default = 'success',
  error = 'error',
}

const displayToast = (
  description: string,
  payload: string | null,
  type: ToastType = ToastType.default,
): void => {
  if (payload !== null) {
    toast[type](description, { description: payload });
    return;
  }
  toast[type](description);
};

export const displaySuccessToast = (msg: string, payload?: any | null) => {
  if (payload !== null) {
    let payloadStr: string;

    if (typeof payload === 'string') {
      payloadStr = payload;
    } else if (payload?.response?.data) {
      payloadStr = JSON.stringify(payload.response.data);
    } else if (payload?.message) {
      payloadStr = payload.message;
    } else {
      payloadStr = JSON.stringify(payload);
    }

    displayToast(msg, payloadStr, ToastType.default);
  } else {
    displayToast(msg, null, ToastType.default);
  }
};

export const displayErrorToast = (title: any, message?: any | null) => {
  let titleStr: string;

  if (typeof title === 'string') {
    titleStr = title;
  } else if (title?.response?.data) {
    titleStr = JSON.stringify(title.response.data);
  } else if (title?.message) {
    titleStr = title.message;
  } else {
    titleStr = JSON.stringify(title);
  }

  if (message !== null) {
    let messageStr: string;

    if (typeof message === 'string') {
      messageStr = message;
    } else if (message?.response?.data) {
      messageStr = JSON.stringify(message.response.data);
    } else if (message?.message) {
      messageStr = message.message;
    } else {
      messageStr = JSON.stringify(message);
    }

    displayToast(titleStr, messageStr, ToastType.error);
    return;
  }

  displayToast(titleStr, null, ToastType.error);
};

export const loadStoreFailToast = (_: any, errorMessage: string) => {
  displayErrorToast(`Could not load store data: ${errorMessage}`);
};

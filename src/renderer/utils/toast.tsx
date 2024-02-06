import { toast } from 'shadcn/components/ui/use-toast';

enum ToastType {
  default = 'default',
  error = 'destructive',
}

const displayToast = (
  description: string,
  payload: string | null,
  type: ToastType = ToastType.default,
): void => {
  if (payload !== null) {
    toast({
      variant: type,
      title: description,
      description: payload,
    });
    return;
  }
  toast({
    variant: type,
    description,
  });
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

export const displayErrorToast = (error: any, payload?: any | null) => {
  let errorStr: string;

  if (typeof error === 'string') {
    errorStr = error;
  } else if (error?.response?.data) {
    errorStr = JSON.stringify(error.response.data);
  } else if (error?.message) {
    errorStr = error.message;
  } else {
    errorStr = JSON.stringify(error);
  }

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

    displayToast(errorStr, payloadStr, ToastType.error);
    return;
  }

  displayToast(errorStr, null, ToastType.error);
};

export const loadStoreFailToast = (_: any, errorMessage: string) => {
  displayErrorToast(`Could not load store data: ${errorMessage}`);
};

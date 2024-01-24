import { toast } from 'shadcn/components/ui/use-toast';

enum ToastType {
  default = 'default',
  error = 'destructive',
}

const displayToast = (
  description: string,
  type: ToastType = ToastType.default,
): void => {
  toast({
    variant: type,
    description,
  });
};

const displaySuccessToast = (msg: any) => {
  let msgStr: string;

  if (typeof msg === 'string') {
    msgStr = msg;
  } else if (msg?.response?.data) {
    msgStr = JSON.stringify(msg.response.data);
  } else if (msg?.message) {
    msgStr = msg.message;
  } else {
    msgStr = JSON.stringify(msg);
  }

  displayToast(msgStr, ToastType.default);
};

const displayErrorToast = (error: any) => {
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

  displayToast(errorStr, ToastType.error);
};

const loadStoreFailToast = (_: any, errorMessage: string) => {
  displayErrorToast(`Could not load store data: ${errorMessage}`);
};

export { displaySuccessToast, displayErrorToast, loadStoreFailToast };

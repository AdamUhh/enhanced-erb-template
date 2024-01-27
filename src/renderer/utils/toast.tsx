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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const displaySuccessToast = (msg: string, payload?: any) => {
  // let msgStr: string;

  // if (typeof payload === 'string') {
  //   msgStr = payload;
  // } else if (payload?.response?.data) {
  //   msgStr = JSON.stringify(payload.response.data);
  // } else if (payload?.message) {
  //   msgStr = payload.message;
  // } else {
  //   msgStr = JSON.stringify(payload);
  // }

  displayToast(msg, ToastType.default);
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

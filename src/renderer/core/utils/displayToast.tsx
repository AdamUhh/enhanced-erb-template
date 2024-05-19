import { ReactNode } from 'react';
import { stringifyObj } from 'shared/utils/stringifyObj';
import { toast } from 'sonner';

enum ToastType {
  default = 'success',
  error = 'error',
}

const displayToast = (
  msg: string,
  description: ReactNode | null,
  type: ToastType = ToastType.default,
): void => {
  toast[type](msg, { description });
};

export const displaySuccessToast = ({
  msg = '',
  description = '',
  // action
  payload,
}: {
  msg?: string;
  description?: string;
  payload?: any;
}) => {
  const payloadStr =
    payload !== undefined && payload !== null ? stringifyObj(payload) : '';
  const _description =
    description && payloadStr
      ? `<div>
        ${description}
        <br />
        ${payloadStr}
      </div>`
      : payloadStr || description;

  displayToast(msg, _description || null);
};

export const displayErrorToast = ({
  msg,
  description = '',
  payload,
}: {
  msg: string;
  description?: string;
  payload?: any;
}) => {
  const payloadStr =
    payload !== undefined && payload !== null ? stringifyObj(payload) : '';

  const _description =
    description && payloadStr
      ? `<div>
        ${description}
        <br />
        ${payloadStr}
      </div>`
      : payloadStr || description;

  displayToast(msg, _description || null, ToastType.error);
};

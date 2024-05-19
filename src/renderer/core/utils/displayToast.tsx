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
  action: (() => void) | undefined,
  label: string | undefined,
  type: ToastType = ToastType.default,
): void => {
  if (!action) toast[type](msg, { description });
  else
    toast[type](msg, {
      actionButtonStyle: { backgroundColor: '#008A2E' },
      description,
      action: {
        onClick: action,
        label: label!,
      },
    });
};

export const displaySuccessToast = ({
  msg = '',
  description = '',
  payload,
  action,
  label,
}: {
  msg?: string;
  description?: string;
  payload?: any;
  action?: () => void;
  label?: string;
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

  displayToast(msg, _description || null, action, label);
};

export const displayErrorToast = ({
  msg,
  description = '',
  payload,
  action,
  label,
}: {
  msg: string;
  description?: string;
  payload?: any;
  action?: () => void;
  label?: string;
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

  displayToast(msg, _description || null, action, label, ToastType.error);
};

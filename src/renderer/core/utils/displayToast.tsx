import { ReactNode } from 'react';
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

const getPayloadString = (payload: any): string => {
  if (typeof payload === 'string') {
    return payload;
  }
  if (payload?.response?.data) {
    return JSON.stringify(payload.response.data);
  }
  if (payload?.message) {
    return payload.message;
  }
  return JSON.stringify(payload);
};

export const displaySuccessToast = ({
  msg = '',
  description = '',
  payload,
}: {
  msg?: string;
  description?: string;
  payload?: any;
}) => {
  const payloadStr =
    payload !== undefined && payload !== null ? getPayloadString(payload) : '';
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
    payload !== undefined && payload !== null ? getPayloadString(payload) : '';

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

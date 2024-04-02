export function stringifyError(error: any): string {
  let errorStr: string = '';

  if (typeof error === 'string') {
    errorStr = error;
  } else if (error?.response?.data) {
    errorStr = JSON.stringify(error.response.data);
  } else if (error?.message || error instanceof Error) {
    errorStr = error.message;
  } else {
    errorStr = JSON.stringify(error);
  }

  return errorStr;
}

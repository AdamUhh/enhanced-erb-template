export function stringifyObj(obj: any): string {
  if (typeof obj === 'string') return obj;

  if (obj?.response?.data) return JSON.stringify(obj.response.data);

  if (obj?.message) return obj.message;

  return JSON.stringify(obj);
}

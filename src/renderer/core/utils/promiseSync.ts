/**
 * Executes asynchronous operations sequentially for each element of an array.
 *
 * Since it's sequential, you can completely halt the application by adding a Promise inside the callback, that can only continue after resolving/rejecting
 *
 * i.e. await new Promise<void>((resolve, reject) => {})
 *
 * @param arr - The array of elements.
 * @param callback - The callback function to execute for each element.
 */
export function promiseSync<T>(
  arr: T[],
  callback: (data: T) => void,
): Promise<void> {
  return arr.reduce(
    async (promise, data) => promise.then(async () => callback(data)),
    Promise.resolve(),
  );
}

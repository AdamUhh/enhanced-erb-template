/**
 * Executes asynchronous operations sequentially for each element of an array.
 *
 * Since it's sequential, you can completely halt the application by adding a Promise inside the callback, that can only continue after resolving/rejecting
 *
 * i.e. await new Promise<void>((resolve, reject) => {})
 *
 * @param {T[]} arr - The array of elements.
 * @param {(data: T) => void} callback - The callback function to execute for each element.
 * @returns {Promise<void>} A Promise that resolves when all operations are complete.
 */
export function promiseSync<T>(arr: T[], callback: (data: T) => void) {
  return arr.reduce(
    async (promise, data) => promise.then(async () => callback(data)),
    Promise.resolve(),
  );
}

export type GenericFunctionConstructor<T> = (...args: any[]) => T;

export type GenericFunction = GenericFunctionConstructor<any>;

export type GenericVoidFunction =
  GenericFunctionConstructor<void | Promise<void>>;

/**
 * This is basically Lodash _.noop() method,
 * which is used to return “undefined” irrespective of the arguments passed to it.
 */
export function noop(): void {
  // A simple function that does nothing
}

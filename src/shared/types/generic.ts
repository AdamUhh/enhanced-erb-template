type GenericFunctionConstructor<T> = (...args: any[]) => T;

type GenericFunction = GenericFunctionConstructor<any>;

type GenericVoidFunction = GenericFunctionConstructor<void | Promise<void>>;

/**
 * This is basically Lodash _.noop() method,
 * which is used to return “undefined” irrespective of the arguments passed to it.
 */
function noop(): void {
  // A simple function that does nothing
}

export {
  GenericFunction,
  GenericVoidFunction,
  GenericFunctionConstructor,
  noop,
};

export const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

interface INavigator {
  userAgent: string;
  maxTouchPoints?: number;
  language: string;
}

// Check if 'navigator' is available (browser environment)
declare const navigator: INavigator | undefined;

let userAgent = '';
if (typeof navigator !== 'undefined') {
  // 'navigator' is available, access its properties safely
  userAgent = navigator.userAgent;
}

export const isWindows =
  typeof process === 'object'
    ? process.platform === 'win32'
    : typeof navigator === 'object'
    ? userAgent.indexOf('Windows') >= 0
    : false;
export const isMacintosh =
  typeof process === 'object'
    ? process.platform === 'darwin'
    : typeof navigator === 'object'
    ? userAgent.indexOf('Macintosh') >= 0
    : false;
export const isLinux =
  typeof process === 'object'
    ? process.platform === 'linux'
    : typeof navigator === 'object'
    ? userAgent.indexOf('Linux') >= 0
    : false;

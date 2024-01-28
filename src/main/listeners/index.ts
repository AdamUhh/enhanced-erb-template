import titlebar from './titlebar';
import store from './store';

export const initializeListeners = () => {
  titlebar();
  store();
};

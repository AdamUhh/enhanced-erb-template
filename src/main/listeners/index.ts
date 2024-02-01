import titlebar from './titlebar';
import store from './store';
import misc from './misc';

export const initializeListeners = () => {
  titlebar();
  store();
  misc();
};

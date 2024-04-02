import misc from './misc';
import store from './store';
import titlebar from './titlebar';

const initializeListeners = () => {
  titlebar();
  store();
  misc();
};

initializeListeners();

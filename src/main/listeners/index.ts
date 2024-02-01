import titlebar from './titlebar';
import store from './store';
import misc from './misc';

const initializeListeners = () => {
  titlebar();
  store();
  misc();
};

initializeListeners();

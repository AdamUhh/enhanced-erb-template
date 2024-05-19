import AppUpdaterListener from 'components/AppUpdaterListener';
import Example from 'components/Example';
import Titlebar from 'components/Titlebar';
import ShortcutManager from 'core/keyboard/ShortcutManager';
import { Provider } from 'react-redux';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { store } from './store';

export default function App() {
  return (
    <Provider store={store}>
      <ShortcutManager>
        <Titlebar />
        <Toaster richColors closeButton />
        <AppUpdaterListener />
        <Router>
          <Routes>
            <Route path="/" element={<Example />} />
          </Routes>
        </Router>
      </ShortcutManager>
    </Provider>
  );
}

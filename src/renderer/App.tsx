import Example from 'components/Example';
import Titlebar from 'components/Titlebar';
import { Provider } from 'react-redux';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ShortcutProvider } from './core/context/shortcutContext';
import { store } from './store';

export default function App() {
  return (
    <Provider store={store}>
      <ShortcutProvider>
        <Titlebar />
        <div>
          <Toaster richColors closeButton />
          <Router>
            <Routes>
              <Route path="/" element={<Example />} />
            </Routes>
          </Router>
        </div>
      </ShortcutProvider>
    </Provider>
  );
}

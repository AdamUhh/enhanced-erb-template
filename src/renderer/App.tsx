import Example from 'components/Example';
import Titlebar from 'components/Titlebar';
import { Provider } from 'react-redux';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import { Toaster } from 'shadcn/components/ui/toaster';
import { ShortcutProvider } from './context/shortcutContext';
import { store } from './store';

export default function App() {
  return (
    <Provider store={store}>
      <ShortcutProvider>
        <Titlebar />
        <div>
          <Toaster />
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

import { Provider } from 'react-redux';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import { Toaster } from 'shadcn/components/ui/toaster';
import ExampleToggleButtons from './components/Example';
import { store } from './store';
import { useAppSelector } from './hooks/store';
import { selectExampleVisibility } from './store/stores/example/selectors';

function Hello() {
  const exampleVisibility = useAppSelector(selectExampleVisibility);
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col">
      <div className="">{exampleVisibility ? 'Hi' : 'Bye'}</div>
      <ExampleToggleButtons />
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<Hello />} />
        </Routes>
      </Router>
    </Provider>
  );
}

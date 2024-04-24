import './App.css'; // You cannot defeat my shtyle!

import Form from './components/Form';

import Submissions from './components/Submissions';
import { SubmissionsProvider } from './contexts/SubmissionsContext';

/**
 * Root component serving as the app's entry point.
 * It contains the main Form component and a title header.
 *
 * @component
 * @example
 * return (
 *   <App />
 * )
 */

const App = () => {
  return (
    <div className="App">
      <SubmissionsProvider>
        <Form />
        <Submissions />
      </SubmissionsProvider>
    </div>
  );
};

export default App;

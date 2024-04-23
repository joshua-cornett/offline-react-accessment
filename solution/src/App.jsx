import Submissions from './components/Submissions';
import Form from './components/Form';

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
      <Form />
      <Submissions />
    </div>
  );
};

export default App;

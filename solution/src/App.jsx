import EntriesTable from './components/EntriesTable';
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
      <EntriesTable />
    </div>
  );
};

export default App;

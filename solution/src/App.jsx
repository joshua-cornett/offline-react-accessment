import './App.css'; // You cannot defeat my shtyle!

import Form from './components/Form';

import Submissions from './components/Submissions';
import { useSubmissions } from './hooks/useSubmissions';

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
  const { submissions, addSubmission } = useSubmissions();
  return (
    <div className="App">
      <Form onNewSubmission={addSubmission} />
      <Submissions entries={submissions} />
    </div>
  );
};

export default App;

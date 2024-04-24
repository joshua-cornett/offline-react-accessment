import { useSubmissions } from '../contexts/SubmissionsContext';

/**
 * Submissions component that displays prior submissions of names and locations.
 * Fetches and displays prior submission data, reflecting updates to entries.
 *
 * @component
 * @param {Array} entries - Array of submission objects to display.
 * @returns {JSX.Element} Table displaying each submission's name and location.
 */
const Submissions = () => {
  const { submissions } = useSubmissions();

  return (
    <div className="submissions-table">
      <table>
        <thead>
          <tr>
            {/* The sub headers (Name, Location)*/}
            <th>Name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {/* Populate table with submissions */}
          {submissions.map((entry, index) => (
            <tr key={index}>
              <td>{entry.name}</td>
              <td>{entry.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Submissions;

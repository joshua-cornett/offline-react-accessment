/**
 * Table component that displays entries of names and locations.
 * Fetches and displays prior submission data, reflecting updates to entries.
 *
 * @component
 * @example
 * return (
    <div className="App">
      <h1>Awesome Form</h1>
      <Form />
      <h2>Prior Submissions</h2>
      <EntriesTable />
    </div>
  )
 */
const EntriesTable = () => {
  return (
    <table>
      <thead>
        <tr>
          <th colSpan="2">Prior Submissons</th>
        </tr>
        <tr>
          <th>Name</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {/** @todo Map over entries to populate rows (will likely use caching) */}
      </tbody>
    </table>
  );
};

export default EntriesTable;

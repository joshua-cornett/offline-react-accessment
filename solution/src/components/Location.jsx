/**
 * Dropdown component for selecting a location.
 * Populated by the mock API.
 * Utilizes context to handle submission.
 *
 * @component
 * @param {{locations: Array<{id: string, name: string}>, loading: boolean}} props - Props object.
 * @param {Array<{id: string, name: string}>} props.locations - Array of available locations.
 * @param {boolean} props.loading - Locations loading status
 * @example
 * return (
    <form onSubmit={handleSubmit}>
        <Location locations={[]} loading={true} />
    </form>
  )
 */
const Location = (locations, loading) => {
  return (
    <div>
      <label htmlFor="location">Location:</label>
      {loading ? (
        <p>In development</p>
      ) : (
        <select id="location" name="location">
          {/**@todo Map over locations passed in props */}
        </select>
      )}
    </div>
  );
};

export default Location;

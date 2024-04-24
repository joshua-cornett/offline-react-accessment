/**
 * Location selection component that uses a custom hook to fetch and display locations.
 *
 * @component
 * @param {Array} locations - Array of location strings to populate the dropdown.
 * @param {string} selectedLocation - The currently selected location in the dropdown.
 * @param {function} setSelectedLocation - Function to update the selected location state.
 * @returns {JSX.Element} The dropdown menu component for location selection.
 */
const Location = ({ locations, selectedLocation, setSelectedLocation }) => {
  return (
    <div>
      <label htmlFor="location-select">Choose a location:</label>
      <select
        id="location-select"
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
      >
        {/* Default empty option, also set on clear */}
        {selectedLocation === '' && (
          <option value="" disabled>
            Select a location...
          </option>
        )}
        {/* Option elements for each location */}
        {locations.map((location, index) => (
          <option key={index} value={location}>
            {location}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Location;

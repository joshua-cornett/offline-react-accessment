import { useLocations } from '../hooks/useLocations';

/**
 * Location selection component that uses a custom hook to fetch and display locations.
 *
 * @returns {JSX.Element} Dropdown menu for selecting a location.
 */
const Location = () => {
  const { locations, selectedLocation, setSelectedLocation } = useLocations();

  return (
    <div>
      <label htmlFor="location-select">Choose a location:</label>
      <select
        id="location-select"
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
      >
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

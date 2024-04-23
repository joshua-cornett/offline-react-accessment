import { useState, useEffect } from 'react';
import { getLocations } from '../mock-api/apis'; // Import function from mock API

/**
 * Custom hook for fetching and managing locations.
 *
 * @returns {object} Object containing the list of locations and the selected location setter and getter.
 */
export const useLocations = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    /**
     * Fetches a list of predefined locations and initializes the state.
     */
    const fetchLocations = async () => {
      try {
        const locs = await getLocations(); // Call the mock API to get locations
        setLocations(locs);
        setSelectedLocation(locs[0]); // Default to the first location
      } catch (error) {
        console.error('Failed to fetch locations:', error);
      }
    };

    fetchLocations();
  }, []);

  return {
    locations,
    selectedLocation,
    setSelectedLocation,
  };
};

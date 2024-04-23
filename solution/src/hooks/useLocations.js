import { useState, useEffect } from 'react';
import { getLocations } from '../mock-api/apis'; // Import function from mock API

/**
 * Custom hook for fetching and managing locations.
 *
 * @returns {object} Object containing:
 *  - locations (string[]): An array of valid locations.
 *  - selectedLocation (string): The currently selected location.
 *  - setSelectedLocation (function): Sets the selected location.
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
        setSelectedLocation(''); // Default to empty
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

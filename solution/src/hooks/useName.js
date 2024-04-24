import { useState, useEffect } from 'react';
import { isNameValid as API_validateName } from '../mock-api/apis';
import { useDebounce } from './useDebouncing';
import { useSubmissions } from '../contexts/SubmissionsContext';

/**
 * Custom hook for managing the name input's validation and availability.
 * It performs debouncing to minimize excessive validation requests and directly
 * checks name availability against stored submissions.
 *
 * @returns {object} Contains the current name state, validation status, availability,
 * and flags for ongoing validation.
 */
export const useName = () => {
  // State to store the current name value
  const [name, setName] = useState('');
  // State to store the validation status of the current name
  const [isNameValid, setIsNameValid] = useState(null);
  // State to store the availability status of the current name
  const [isNameAvailable, setIsNameAvailable] = useState(true);
  // State to indicate whether validation is currently being performed
  const [validating, setValidating] = useState(false);
  // The debounced version of the name, used to reduce frequency of validation calls
  const debouncedName = useDebounce(name, 300);
  // Utilize the checkNameAvailability function from useSubmissions hook
  const { checkNameAvailability } = useSubmissions();

  // Additional state to manually control the status message
  const [manualStatus, setManualStatus] = useState(null);

  // Function to determine the status message and color based on current validation state
  const getStatusMessage = () => {
    if (!debouncedName) {
      return { message: 'Please enter a name', color: 'gray' }; // Guidance when input is empty
    }
    if (validating) {
      return { message: 'Checking...', color: 'blue' };
    }
    if (!isNameValid && debouncedName) {
      return { message: 'Invalid', color: 'red' }; // Invalid state when there's some input
    }
    if (!isNameAvailable) {
      return { message: 'Unavailable', color: 'orange' };
    }
    if (isNameValid && isNameAvailable) {
      return { message: 'Available', color: 'green' };
    }
    return { message: '', color: 'black' }; // Default case
  };

  useEffect(() => {
    if (manualStatus) {
      return; // If manual status is set, skip the automatic status setting
    }

    // If debouncedName is falsy, reset validation and availability
    if (!debouncedName) {
      setIsNameValid(null); // Avoid setting as 'Invalid'
      setIsNameAvailable(true);
      setValidating(false);
      setManualStatus({ message: 'Please enter a name', color: 'gray' });

      return;
    }

    // Start validating when name changes
    setValidating(true);

    // Perform the validation via API
    API_validateName(debouncedName)
      .then((isValid) => {
        setIsNameValid(isValid); // Update the validity
        setIsNameAvailable(checkNameAvailability(debouncedName)); // Directly check availability
        setValidating(false); // Mark the end of the validation
        setManualStatus(null); // Clear manual status once validation completes
      })
      .catch((error) => {
        // Handle any errors during validation
        console.error('Validation error:', error);
        setIsNameValid(false);
        setValidating(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedName]); // This effect depends on debouncedName, which updates on name change

  // Determine if the name is ready for submission
  const ready = !validating && isNameValid && isNameAvailable;

  return {
    name,
    setName,
    ready,
    status: manualStatus || getStatusMessage(),
    setManualStatus,
  };
};

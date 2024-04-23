import { useState, useEffect } from 'react';
import { isNameValid as API_validateName } from '../mock-api/apis'; // Import mock API functionality
import { useDebounce } from './useDebouncing'; // Import custom debouncer hook

/**
 * Custom hook to validate name with a mock API call.
 * Handles and maintains validation state.
 *
 * @returns {object} An object containing:
 * - name (string): Current 'name' input value.
 * - setName (Function): 'name' setter.
 * - isNameValid (boolean|null): Validation status
 * - validating (boolean): Flag for whether the validation process is running.
 * - validateName (Function): Function to trigger validation.
 */
export const useValidateName = () => {
  const [name, setName] = useState('');
  const [isNameValid, setIsNameValid] = useState(null);
  const [validating, setValidating] = useState(false);
  const debouncedName = useDebounce(name, 500); // Debounce name input

  useEffect(() => {
    if (name) {
      // Indicate validating state as soon as user types
      setValidating(true);
    }
  }, [name]); // Triggers on every change to 'name'

  useEffect(() => {
    if (debouncedName) {
      // Perform the validation only after the debounce period
      const performValidation = async () => {
        try {
          const result = await API_validateName(debouncedName); // mock API call
          setIsNameValid(result); // Update validity with result
        } catch (error) {
          console.error('Error validating name:', error);
          setIsNameValid(false); // Negate validity on error
        } finally {
          setValidating(false); // Indicate validation end
        }
      };

      performValidation();
    } else {
      // Handle case where debouncedName is an empty string, indicating no input
      setIsNameValid(null);
      setValidating(false);
    }
  }, [debouncedName]);

  /**
   * Validates a name input by making a mock API call
   * @param {string} nameToValidate - The name input to be validated.
   */
  const validateName = async (nameToValidate) => {
    setValidating(true); // Indicate validation start
    try {
      const result = await API_validateName(nameToValidate); // mock API name validation call
      setIsNameValid(result); // Update status
    } catch (error) {
      console.error('Error validating name:', error);
      setIsNameValid(false); // Negate status in case of error
    } finally {
      setValidating(false); // Indicate validation end
    }
  };

  return {
    name,
    setName,
    isNameValid,
    validating,
    validateName,
  };
};

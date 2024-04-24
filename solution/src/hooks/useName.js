import { useState, useEffect, useRef } from 'react';
import { isNameValid as API_validateName } from '../mock-api/apis';
import { useDebounce } from './useDebouncing';
import { useSubmissions } from './useSubmissions';

/**
 * Custom hook for name input validation and management.
 * Implements debouncing and out-of-order validation aborts
 *
 * @returns {object} Object containing:
 *  - name (string): The current name.
 *  - setName (Function): Setter for the name.
 *  - isNameValid (boolean|null): The validation status, null without input.
 *  - validating (boolean): Flag indicating if currently validating
 */
export const useName = () => {
  // State management and custom hooks
  const [name, setName] = useState('');
  const [isNameValid, setIsNameValid] = useState(null);
  const [isNameAvailable, setIsNameAvailable] = useState(true);
  const [validating, setValidating] = useState(false);
  const debouncedName = useDebounce(name, 100); // Debouncing the name input to reduce frequency of validation calls.
  const validationSeq = useRef(0); // Sequence number to track the latest validation request.
  const { checkNameAvailability } = useSubmissions(); // Assume this method is available

  useEffect(() => {
    const controller = new AbortController(); // AbortController to manage fetch cancellations.
    const currentSeq = ++validationSeq.current; // Increment sequence number for new validation requests.

    // Function to perform name input validation.
    const performValidation = async () => {
      if (!debouncedName) {
        // If no debounce, stop validating.
        setIsNameValid(null);
        setIsNameAvailable(checkNameAvailability(debouncedName));

        setValidating(false);
        return;
      }

      setValidating(true); // Indicate validation start (prevents apparent feedback lag)
      setIsNameAvailable(true); // Empty name is not a duplicate by default

      try {
        const result = await API_validateName(debouncedName, {
          signal: controller.signal,
        }); // Perform the validation call with an abort signal.
        if (currentSeq === validationSeq.current) {
          // Finalize validation
          setIsNameValid(result); // Set the validation result.
          setValidating(false); // Reset the validating flag once validation is complete.
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          // Handle errors that are not aborts.
          console.error('Error validating name:', error);
          if (currentSeq === validationSeq.current) {
            // Stop validation on error.
            setIsNameValid(false);
            setValidating(false);
          }
        }
      }
    };

    performValidation(); // Execute the validation function.

    return () => {
      controller.abort(); // Abort fetch on change or unmount.
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedName]); // Effect triggered by debounce

  return {
    name,
    setName,
    isNameValid,
    isNameAvailable,
    validating,
  };
};

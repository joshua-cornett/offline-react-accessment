import { useState, useEffect, useRef } from 'react';
import { isNameValid as API_validateName } from '../mock-api/apis';
import { useDebounce } from './useDebouncing';

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
  const [validating, setValidating] = useState(false);
  const debouncedName = useDebounce(name, 100); // Debouncing the name input to reduce frequency of validation calls.
  const validationSeq = useRef(0); // Sequence number to track the latest validation request.

  useEffect(() => {
    const controller = new AbortController(); // AbortController to manage fetch cancellations.
    const currentSeq = ++validationSeq.current; // Increment sequence number for new validation requests.

    // Function to perform name input validation.
    const performValidation = async () => {
      if (!debouncedName) {
        // If no debounce, stop validating.
        setIsNameValid(null);
        setValidating(false);
        return;
      }

      setValidating(true); // Indicate validation start (prevents apparent feedback lag)

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
          // Handle errors that are not abort errors.
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
  }, [debouncedName]); // Effect triggered by debounce

  return {
    name,
    setName,
    isNameValid,
    validating,
  };
};

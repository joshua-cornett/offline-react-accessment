import { useEffect, useState } from 'react';

/**
 * Custom hook for creating debounced values.
 *
 * @param {any} value Value to debounce.
 * @param {number} delay Debounce delay in milliseconds.
 * @returns {any} Debounced value.
 */
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clear/reset the timeout on change
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // restart the debounce timer on change

  return debouncedValue;
}

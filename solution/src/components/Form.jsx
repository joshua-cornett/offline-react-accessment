import React from 'react';
import Name from './Name';
import Location from './Location';
import { useName } from '../hooks/useName';
import { useLocations } from '../hooks/useLocations';

/**
 * Form component for name, location, clearing, and submission
 *
 * Ensures that submissions are only processed when validations are passed.
 * Will only clear when input is present.
 *
 * @returns {JSX.Element} The complete form which contains:
 * -- Name input component
 * -- Locations input component
 * -- Clear and Submit buttons
 */
const Form = () => {
  // State and methods from custom hooks
  const { name, setName, isNameValid, validating } = useName(); // Updated to use useName
  const { locations, selectedLocation, setSelectedLocation } = useLocations();

  /**
   * Handles changes to the name input field, triggering validation.
   *
   * @param {string} newName - The new name entered by the user.
   */
  const handleNameChange = (newName) => {
    setName(newName); // Update name state, which triggers debounced validation
  };

  /**
   * Handles the form submission event. Validates the state before processing submission.
   * Alerts the user if submission cannot proceed due to validation or if it succeeds.
   *
   * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validating || !isNameValid) {
      console.log(
        'Validation in progress or name is invalid. Please correct the errors before submitting.',
      );
      return;
    }
    console.log(
      `Form submitted successfully with Name: ${name} and Location: ${selectedLocation}`,
    );
  };

  /**
   * Clears all inputs and resets the form state.
   */
  const handleClear = () => {
    setName('');
    setSelectedLocation('');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Name input component with validation */}
      <Name
        name={name}
        onChange={handleNameChange}
        isValid={isNameValid}
        validating={validating}
      />
      {/* Location selection dropdown */}
      <Location
        locations={locations}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />
      {/* Clear button, disabled if no input */}
      <button
        type="button"
        onClick={handleClear}
        disabled={!name && !selectedLocation}
      >
        Clear
      </button>
      {/* Submit button, disabled if name is still validating */}
      <button type="submit" disabled={validating}>
        Add
      </button>
    </form>
  );
};

export default Form;

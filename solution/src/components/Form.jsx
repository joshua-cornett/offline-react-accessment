import React from 'react';
import Name from './Name';
import Location from './Location';
import { useName } from '../hooks/useName';
import { useLocations } from '../hooks/useLocations';

/**
 * Form component for name, location, clearing, and submission.
 * Validates and processes submissions based on user input and validation status.
 *
 * @param {function} onNewSubmission - Callback function to handle form submission data.
 * @returns {JSX.Element} The complete form including input components for name and location, and control buttons.
 */
const Form = ({ addSubmission }) => {
  const { name, setName, isNameValid, isNameAvailable, validating } = useName();
  const { locations, selectedLocation, setSelectedLocation } = useLocations();
  const isLocationValid = selectedLocation !== ''; // Ensure the location is not empty

  const handleNameChange = (newName) => {
    setName(newName); // Update name state and trigger validation
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validating && isNameValid && isLocationValid && isNameAvailable) {
      addSubmission({ name, location: selectedLocation });
    } else {
      console.log(
        'Validation in progress, or inputs are invalid. Submission not allowed.',
      );
    }
  };

  const handleClear = () => {
    setName('');
    setSelectedLocation('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Name
        name={name}
        onChange={handleNameChange}
        isValid={isNameValid}
        isAvailable={isNameAvailable}
        validating={validating}
      />
      <Location
        locations={locations}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />
      <button
        type="button"
        onClick={handleClear}
        disabled={!name && !selectedLocation}
      >
        Clear
      </button>
      <button
        type="submit"
        disabled={validating || !isNameValid || !isLocationValid}
      >
        Add
      </button>
    </form>
  );
};

export default Form;

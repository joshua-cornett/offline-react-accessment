import { useSubmissions } from '../contexts/SubmissionsContext';
import Name from './Name';
import Location from './Location';
import { useName } from '../hooks/useName';
import { useLocations } from '../hooks/useLocations';

/**
 * Form component for name, location, clearing, and submission.
 * Validates and processes submissions based on user input and validation status.
 *
 * @returns {JSX.Element} The complete form including input components for name and location, and control buttons.
 */
const Form = () => {
  const { addSubmission, clearSubmissions } = useSubmissions();

  const {
    name,
    setName,
    ready: isNameReady,
    status: nameStatus,
    setManualStatus,
  } = useName();

  const { locations, selectedLocation, setSelectedLocation } = useLocations();

  const handleNameChange = (newName) => {
    setName(newName); // Update name state and trigger validation
    setManualStatus(); // Reset status when user types again
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isNameReady && selectedLocation !== '') {
      addSubmission({ name, location: selectedLocation });
      setManualStatus({ message: 'Submitted', color: 'magenta' }); // Set status to "Submitted" on successful submission
    } else {
      console.error(
        'Validation in progress, or inputs are invalid. Submission not allowed.',
      );
    }
  };

  const handleClear = () => {
    clearSubmissions();
    setName('');
    setSelectedLocation('');
    setManualStatus({ message: 'Please enter a name.', color: '' }); // Set status to "Submitted" on successful submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <Name name={name} onChange={handleNameChange} status={nameStatus} />

        <Location
          locations={locations}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
      </div>
      <div className="buttons">
        <button type="button" onClick={handleClear} disabled={false}>
          Clear
        </button>
        <button type="submit" disabled={!isNameReady || !selectedLocation}>
          Add
        </button>
      </div>
    </form>
  );
};

export default Form;

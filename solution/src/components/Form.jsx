import Name from './Name';
import Location from './Location';
import { useValidateName } from '../hooks/useValidateName';

/**
 * Main form component.
 * Handles form structure and submission logic.
 *
 * @component
 */
const Form = () => {
  const { name, setName, isNameValid, validating } = useValidateName();

  // Destructure name input data/validation from custom hook

  /**
   * @todo Destructure location data from a custom hook
   */

  const handleNameChange = (newName) => {
    setName(newName);
  };

  /**
   * Handles form submission, preventing default behavior and ensuring validation.
   *
   * @param {React.FormEvent<HTMLFormElement>} event - Form submission event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isNameValid) {
      console.log('Please correct the errors before submitting.');
      return;
    }
    console.log(
      `Submitting Name: ${name} with Location: ${/**@todo Track location selection */ ''}`,
    );
  };

  return (
    <div className="App">
      <h1>Awesome Form</h1>
      <form onSubmit={handleSubmit}>
        <Name
          name={name}
          onChange={handleNameChange}
          isValid={isNameValid}
          validating={validating}
        />
        <Location
          locations={/**@todo Populate list of locations from custom hook */ []}
          loading={true}
        />
        <button type="clear">Clear</button>
        <button
          type="submit"
          disabled={
            validating /**@todo Also ensure locations loaded and selected */
          }
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;

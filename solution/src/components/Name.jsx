/**
 * Name input component with asynchronous validation.
 *
 * @component
 * @param {string} name - Current name value.
 * @param {function} onChange - Handler to update name.
 * @param {boolean} isValid - Current validation state.
 * @param {boolean} validating - Flag to indicate if currently validating.
 * @returns {JSX.Element} - Input element with validation
 */
const Name = ({ name, onChange, isValid, isAvailable, isValidating }) => {
  return (
    <div>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => onChange(e.target.value)}
      />
      {/* Name validation status */}
      <p style={{ color: isValidating ? 'blue' : isValid ? 'green' : 'red' }}>
        {isValidating ? 'Checking Validity...' : isValid ? 'Valid' : 'Invalid'}
      </p>
      {/* Name availability status */}
      <p style={{ color: isAvailable ? 'red' : 'green' }}>
        {isValid ? 'Available' : 'Unavailable'}
      </p>
    </div>
  );
};

export default Name;

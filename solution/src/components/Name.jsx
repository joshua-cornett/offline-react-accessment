/**
 * Name input component with asynchronous validation.
 *
 * @param {string} name - Current name value.
 * @param {function} onChange - Handler to update name.
 * @param {boolean} isValid - Current validation state.
 * @param {boolean} validating - Flag to indicate if currently validating.
 * @component
 */
const Name = ({ name, onChange, isValid, validating }) => {
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
      <p style={{ color: validating ? 'blue' : isValid ? 'green' : 'red' }}>
        {validating ? 'Checking...' : isValid ? 'Valid' : 'Invalid'}
      </p>
    </div>
  );
};

export default Name;

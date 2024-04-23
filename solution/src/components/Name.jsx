/**
 * Component for inputting user's name with asynchronous validation.
 *
 * @param {string} name - Current name value.
 * @param {function} onChange - Handler to update name.
 * @param {boolean} isValid - Current validation state.
 * @param {boolean} validating - Indicates if validation is in progress.
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
      <p style={{ color: validating ? 'blue' : isValid ? 'green' : 'red' }}>
        {validating ? 'Validating...' : isValid ? 'Valid' : 'Invalid'}
      </p>
    </div>
  );
};

export default Name;

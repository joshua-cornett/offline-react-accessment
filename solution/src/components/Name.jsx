import React from 'react';

/**
 * Name input component with asynchronous validation and availability check.
 *
 * @param {string} name - Current name value.
 * @param {function} onChange - Handler to update name.
 * @param {object} status - Object containing status info: message and corresponding color
 * @returns {JSX.Element} Input element for name and status messages.
 */
const Name = ({ name, onChange, status }) => {
  return (
    <div className="input-group">
      <label htmlFor="name">Name:</label>
      <div className="text-field">
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => onChange(e.target.value)}
          className={!name ? 'flash-grey' : ''}
          placeholder="Enter name"
        />
        {status.message && (
          <p className="status-message" style={{ color: status.color }}>
            {status.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Name;

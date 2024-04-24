import { useState } from 'react';

/**
 * Location selection component that uses a custom hook to fetch and display locations.
 *
 * @component
 * @param {Array} locations - Array of location strings to populate the dropdown.
 * @param {string} selectedLocation - The currently selected location in the dropdown.
 * @param {function} setSelectedLocation - Function to update the selected location state.
 * @returns {JSX.Element} The dropdown menu component for location selection.
 */
const Location = ({ locations, selectedLocation, setSelectedLocation }) => {
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility

  const handleDropdownToggle = (e) => {
    e.preventDefault(); // Prevent unwanted submission
    setIsOpen(!isOpen); // toggle dropdown
  };

  const handleOptionSelect = (e, location) => {
    e.preventDefault(); // Prevent unwanted submission

    setSelectedLocation(location);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="input-group">
      <div className="location-label">Location </div>
      <div className={'dropdown-field'}>
        <button
          // Toggle 'open' class based on state
          className={`dropdown-toggle ${isOpen ? 'open' : ''} ${!selectedLocation ? 'flash-grey' : ''}`}
          onClick={(e) => handleDropdownToggle(e)}
        >
          {/* Default empty option, also set on clear */}
          {selectedLocation || 'Select a location...'}
        </button>
        {isOpen && (
          <div className="dropdown-menu">
            {/* Option elements for each location */}

            {locations.map((location) => (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
              <div
                key={location}
                className="dropdown-item"
                onClick={(e) => handleOptionSelect(e, location)}
                aria-haspopup="true" // Accessibility: Indicates that this button has a popup menu
                aria-expanded={isOpen} // Accessibility: Indicates whether the dropdown is currently open or closed
              >
                {location}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Location;

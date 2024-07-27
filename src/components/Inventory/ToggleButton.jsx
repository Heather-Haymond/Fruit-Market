// src/components/ToggleButton/ToggleButton.jsx
import React from 'react';
import PropTypes from 'prop-types';

const ToggleButton = ({ isToggled, onToggle }) => {
  return (
    <button onClick={onToggle}>
      {isToggled ? 'Hide All Users Inventory' : 'Show All Users Inventory'}
    </button>
  );
};

ToggleButton.propTypes = {
  isToggled: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default ToggleButton;

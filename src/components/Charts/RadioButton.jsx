// RadioButton.js
import React from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';

const RadioButton = ({ chartType, onChange }) => {
  return (
    <FormControl component="fieldset">
      <RadioGroup row aria-label="chart type" name="row-radio-buttons-group" value={chartType} onChange={(e) => onChange(e.target.value)}>
        <FormControlLabel value="bar" control={<Radio />} label="Bar Chart" />
        <FormControlLabel value="line" control={<Radio />} label="Line Chart" />
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButton;


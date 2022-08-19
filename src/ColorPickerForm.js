import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import { Button } from '@mui/material';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

function ColorPickerForm({ colors, paletteIsFull, addNewColor }) {
  const [currentColor, setCurrentColor] = useState('teal');
  const [newColorName, setNewName] = useState('');

  ValidatorForm.addValidationRule('isColorNameUnique', (value) =>
    colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
  );
  ValidatorForm.addValidationRule('isColorUnique', () =>
    colors.every(({ color }) => color !== currentColor)
  );

  const updateCurrentColor = (newColor) => {
    setCurrentColor(newColor.hex);
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    if (name === 'newColorName') {
      setNewName(value);
    }
  };

  const handleSubmit = () => {
    const newColor = {
      color: currentColor,
      name: newColorName,
    };
    setNewName('');
    addNewColor(newColor);
  };

  return (
    <div>
      <ChromePicker
        color={currentColor}
        onChangeComplete={updateCurrentColor}
      />
      <ValidatorForm onSubmit={handleSubmit}>
        <TextValidator
          value={newColorName}
          name='newColorName'
          onChange={handleChange}
          validators={['required', 'isColorNameUnique', 'isColorUnique']}
          errorMessages={[
            'Color name is required',
            'Color name must be unique',
            'Color already used',
          ]}
        />
        <Button
          variant='contained'
          type='submit'
          color='primary'
          disabled={paletteIsFull}
          style={{ backgroundColor: paletteIsFull ? 'grey' : currentColor }}
        >
          {paletteIsFull ? 'Palette Full' : 'Add Color'}
        </Button>
      </ValidatorForm>
    </div>
  );
}

export default ColorPickerForm;

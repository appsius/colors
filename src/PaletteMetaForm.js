import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

function PaletteMetaForm({ palettes, handleSubmit, hideForm }) {
  const [newPaletteName, setNewPaletteName] = useState('');
  const [open, setOpen] = useState(true);

  ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
    palettes.every(
      ({ paletteName }) =>
        paletteName.toLocaleLowerCase() !== value.toLocaleLowerCase()
    )
  );

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    if (name === 'newPaletteName') {
      setNewPaletteName(value);
    }
  };

  return (
    <Dialog open={open} onClose={hideForm}>
      <DialogTitle>Choose a Palette Name</DialogTitle>
      <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your new beautiful palette. Make sure it's
            unique!
          </DialogContentText>
          <Picker
            // data={data}
            // onEmojiSelect={addEmoji}
            // style={{
            //   position: 'absolute',
            //   marginTop: '465px',
            //   marginLeft: -40,
            //   maxWidth: '320px',
            //   borderRadius: '20px',
            // }}
            theme='dark'
          />
          <TextValidator
            label='Palette Name'
            name='newPaletteName'
            value={newPaletteName}
            fullWidth
            variant='standard'
            margin='normal'
            onChange={handleChange}
            validators={['required', 'isPaletteNameUnique']}
            errorMessages={[
              'Palette name is required',
              'Palette name must unique',
            ]}
          />
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={hideForm} color='error'>
            Cancel
          </Button>
          <Button variant='contained' color='primary' type='submit'>
            Save Palette
          </Button>
        </DialogActions>
      </ValidatorForm>
    </Dialog>
  );
}

export default PaletteMetaForm;

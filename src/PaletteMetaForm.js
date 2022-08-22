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

function PaletteMetaForm({ palettes, hideForm, handleSubmit }) {
  const [newPaletteName, setNewPaletteName] = useState('');
  const [stage, setStage] = useState('form');

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

  const showEmojiPicker = () => {
    setStage('emoji');
  };

  const savePalette = ({ native }) => {
    console.log(native);
    const newPalette = {
      paletteName: newPaletteName,
      emoji: native,
    };
    handleSubmit(newPalette);
  };

  return (
    <div>
      <Dialog open={stage === 'emoji'} onClose={hideForm}>
        <DialogTitle>Choose a Palette Emoji</DialogTitle>
        <Picker
          data={data}
          onEmojiSelect={savePalette}
          title='Pick a palette emoji'
        />
      </Dialog>
      <Dialog open={stage === 'form'} onClose={hideForm}>
        <DialogTitle>Choose a Palette Name</DialogTitle>
        <ValidatorForm onSubmit={showEmojiPicker}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new beautiful palette. Make sure it's
              unique!
            </DialogContentText>

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
    </div>
  );
}

export default PaletteMetaForm;
// export default withStyles(styles)(PaletteMetaForm);

import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { Link } from 'react-router-dom';

function PaletteFormNav({
  classes,
  open,
  palettes,
  AppBar,
  handleSubmit,
  handleDrawerOpen,
}) {
  const [newPaletteName, setNewPaletteName] = useState('');

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
    <div>
      <CssBaseline />
      <AppBar position='fixed' open={open} color='default'>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div'>
            Persistent drawer
          </Typography>
          <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
            <TextValidator
              label='Palette Name'
              name='newPaletteName'
              value={newPaletteName}
              onChange={handleChange}
              validators={['required', 'isPaletteNameUnique']}
              errorMessages={[
                'Palette name is required',
                'Palette name must unique',
              ]}
            />
            <Button variant='contained' color='primary' type='submit'>
              Save Palette
            </Button>
            <Link to='/'>
              <Button variant='contained' color='error'>
                Go Back
              </Button>
            </Link>
          </ValidatorForm>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default PaletteFormNav;

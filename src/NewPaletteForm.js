import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { ChromePicker } from 'react-color';
import { Button, colors } from '@mui/material';
import DraggableColorBox from './DraggableColorBox';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useNavigate } from 'react-router';

const drawerWidth = 400;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const ColorBoxes = styled('ul')(() => ({
  height: 'calc(100vh - 64px)',
}));

export default function NewPaletteForm(props) {
  const { palettes, savePalette } = props;
  const [open, setOpen] = useState(true);
  const [currentColor, setCurrentColor] = useState('teal');
  const [newColorName, setNewName] = useState('');
  const [newPaletteName, setNewPaletteName] = useState('');
  const [colors, setColors] = useState([{ color: 'blue', name: 'blue' }]);
  const navigate = useNavigate();

  ValidatorForm.addValidationRule('isColorNameUnique', (value) =>
    colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
  );
  ValidatorForm.addValidationRule('isColorUnique', () =>
    colors.every(({ color }) => color !== currentColor)
  );
  ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
    palettes.every(
      ({ paletteName }) =>
        paletteName.toLocaleLowerCase() !== value.toLocaleLowerCase()
    )
  );

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const updateCurrentColor = (newColor) => {
    setCurrentColor(newColor.hex);
  };

  const addNewColor = () => {
    const newColor = {
      color: currentColor,
      name: newColorName,
    };
    setColors([...colors, newColor]);
    setNewName('');
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    if (name === 'newColorName') {
      setNewName(value);
    } else if (name === 'newPaletteName') {
      setNewPaletteName(value);
    }
  };

  const handleSubmit = () => {
    let newName = newPaletteName;
    const newPalette = {
      id: newName.toLocaleLowerCase().replace(/ /g, '-'),
      paletteName: newName,
      colors: colors,
    };
    savePalette(newPalette);
    navigate(`/`);
  };

  return (
    <Box sx={{ display: 'flex' }}>
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
          <ValidatorForm onSubmit={handleSubmit}>
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
          </ValidatorForm>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant='persistent'
        anchor='left'
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Typography variant='h4'>Design Your Palette</Typography>
        <div>
          <Button variant='contained' color='error'>
            Clear Palette
          </Button>
          <Button variant='contained' color='primary'>
            Random Color
          </Button>
        </div>
        <ChromePicker
          color={currentColor}
          onChangeComplete={updateCurrentColor}
        />
        <ValidatorForm onSubmit={addNewColor}>
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
            style={{ backgroundColor: currentColor }}
          >
            Add Color
          </Button>
        </ValidatorForm>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <ColorBoxes>
          {colors.map((c) => {
            const { color, name } = c;
            return <DraggableColorBox color={color} name={name} />;
          })}
        </ColorBoxes>
      </Main>
    </Box>
  );
}

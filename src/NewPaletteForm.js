import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import DraggableColorList from './DraggableColorList';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import { withStyles } from '@mui/styles';
import styles from './styles/NewPaletteFormStyles';
import { DRAWER_WIDTH } from './constants';
import { seedColors } from './seedColors';

const drawerWidth = DRAWER_WIDTH;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
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

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function NewPaletteForm({ palettes, savePalette, classes }) {
  const [open, setOpen] = useState(true);
  const [colors, setColors] = useState(seedColors[0].colors);
  const maxColors = 20;
  const paletteIsFull = colors.length >= maxColors;
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const addNewColor = (newColor) => {
    setColors([...colors, newColor]);
  };

  const handleSubmit = ({ paletteName, emoji }) => {
    const id = paletteName.toLocaleLowerCase().replace(/ /g, '-');
    const newPalette = {
      id,
      paletteName,
      emoji,
      colors,
    };
    savePalette(newPalette);
    navigate(`/`);
  };

  const removeColor = (colorName) => {
    const filteredColors = colors.filter(({ name }) => name !== colorName);
    setColors(filteredColors);
  };
  const clearColors = () => {
    setColors([]);
  };

  const addRandomColor = () => {
    const allColors = palettes.map((p) => p.colors).flat();
    const rand = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[rand];
    const newColors = [...colors, randomColor];
    setColors(newColors);
  };

  const onSortEnd = ({ oldIndex: oldI, newIndex: newI }) => {
    const movingColor = colors[oldI];
    const backwards = oldI > newI;
    let newOrder;
    if (backwards) {
      newOrder = [
        ...colors.slice(0, newI),
        movingColor,
        ...colors.slice(newI, oldI),
        ...colors.slice(oldI + 1),
      ];
    } else {
      newOrder = [
        ...colors.slice(0, oldI),
        ...colors.slice(oldI + 1, newI + 1),
        movingColor,
        ...colors.slice(newI + 1),
      ];
    }
    setColors(newOrder);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <PaletteFormNav
        open={open}
        palettes={palettes}
        handleSubmit={handleSubmit}
        handleDrawerOpen={handleDrawerOpen}
      />
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
        <div className={classes.container}>
          <Typography variant='h4' gutterBottom>
            Design Your Palette
          </Typography>
          <div className={classes.buttons}>
            <Button
              className={classes.button}
              variant='contained'
              color='error'
              onClick={clearColors}
            >
              Clear Palette
            </Button>
            <Button
              className={classes.button}
              variant='contained'
              color='primary'
              onClick={addRandomColor}
              disabled={paletteIsFull}
            >
              Random Color
            </Button>
          </div>
          <ColorPickerForm
            colors={colors}
            paletteIsFull={paletteIsFull}
            addNewColor={addNewColor}
          />
        </div>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <DraggableColorList
          colors={colors}
          removeColor={removeColor}
          axis='xy'
          onSortEnd={onSortEnd}
          distance={20}
        />
      </Main>
    </Box>
  );
}

export default withStyles(styles)(NewPaletteForm);

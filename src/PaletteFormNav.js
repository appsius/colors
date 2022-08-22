import React, { useState } from 'react';
import MuiAppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { withStyles } from '@mui/styles';
import PaletteMetaForm from './PaletteMetaForm';
import styles from './styles/PaletteFormNavStyles';
import { DRAWER_WIDTH } from './constants';

const drawerWidth = DRAWER_WIDTH;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '64px',
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

function PaletteFormNav({
  open,
  palettes,
  classes,
  handleSubmit,
  handleDrawerOpen,
}) {
  const [formShowing, setFormShowing] = useState(false);

  const showForm = () => {
    setFormShowing(true);
  };

  const hideForm = () => {
    setFormShowing(false);
  };

  return (
    <div className={classes.root}>
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
            <AddToPhotosIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div'>
            Persistent drawer
          </Typography>
        </Toolbar>
        <div className={classes.navBtns}>
          <Link to='/'>
            <Button
              variant='contained'
              color='error'
              className={classes.button}
            >
              Go Back
            </Button>
          </Link>
          <Button
            variant='contained'
            className={classes.button}
            onClick={() => showForm()}
          >
            Save Palette
          </Button>
        </div>
      </AppBar>
      {formShowing && (
        <PaletteMetaForm
          palettes={palettes}
          handleSubmit={handleSubmit}
          hideForm={hideForm}
        />
      )}
    </div>
  );
}

export default withStyles(styles)(PaletteFormNav);

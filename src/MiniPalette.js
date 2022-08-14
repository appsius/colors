import { withStyles } from '@mui/styles';
import React from 'react';

const styles = {
  root: {
    backgroundColor: 'white',
    height: '20vh',
    border: '1px solid black',
    borderRadius: '4px',
    padding: '0.5rem',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': { cursor: 'pointer' },
  },
  colors: {
    backgroundColor: '#dae1e4',
    height: '15vh',
    width: '100%',
    borderRadius: '5px',
    overflow: 'hidden',
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0',
    color: 'black',
    paddingTop: '0.5rem',
    fontSize: '0.85rem',
    position: 'relative',
  },
  emoji: {
    marginLeft: '0.5rem',
    fontSize: '1.5rem',
  },
  miniColor: {
    height: '25%',
    width: '20%',
    display: 'inline-block',
    margin: '0 auto',
    position: 'relative',
    marginBottom: '-4.5px',
  },
};

function MiniPalette(props) {
  const { classes, paletteName, emoji, colors, handleClick } = props;
  const miniBoxes = colors.map((color) => (
    <div
      className={classes.miniColor}
      style={{ backgroundColor: color.color }}
      key={color.name}
    ></div>
  ));

  return (
    <div className={classes.root} onClick={handleClick}>
      <div className={classes.colors}>
        {/* Mini Color Boxes */}
        {miniBoxes}
      </div>
      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);

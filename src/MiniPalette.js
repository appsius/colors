import React from 'react';
import { withStyles } from '@mui/styles';
import { styles } from './styles/MiniPaletteStyles';
import DeleteIcon from '@mui/icons-material/Delete';

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
      <div>
        <DeleteIcon
          className={classes.deleteIcon}
          style={{
            transition: 'all .3s ease-in-out',
          }}
        />
      </div>
      <div className={classes.colors}>{miniBoxes}</div>
      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);

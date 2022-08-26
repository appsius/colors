import React from 'react';
import { withStyles } from '@mui/styles';
import { styles } from './styles/MiniPaletteStyles';
import DeleteIcon from '@mui/icons-material/Delete';

const MiniPalette = React.memo(
  (props) => {
    const { id, paletteName, emoji, colors, classes, goToPalette, openDialog } =
      props;
    const miniBoxes = colors.map((color) => (
      <div
        className={classes.miniColor}
        style={{ backgroundColor: color.color }}
        key={color.name}
      ></div>
    ));

    const deletePalette = (e) => {
      e.stopPropagation();
      openDialog(id);
    };

    const handleClick = () => {
      goToPalette(id);
    };

    console.log('Mini palette', paletteName);

    return (
      <div className={classes.root} onClick={handleClick}>
        <DeleteIcon
          className={classes.deleteIcon}
          style={{
            transition: 'all .3s ease-in-out',
          }}
          onClick={deletePalette}
        />
        <div className={classes.colors}>{miniBoxes}</div>
        <h5 className={classes.title}>
          {paletteName} <span className={classes.emoji}>{emoji}</span>
        </h5>
      </div>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.CSSTransition === nextProps.CSSTransition) {
      return true;
    }
    return false;
  }
);

export default withStyles(styles)(MiniPalette);

import React from 'react';
import { withStyles } from '@mui/styles';
import { styles } from './styles/MiniPaletteStyles';
import { useNavigate } from 'react-router';
import DeleteIcon from '@mui/icons-material/Delete';

function MiniPalette(props) {
  const { id, paletteName, emoji, colors, classes, handleClick, handleDelete } =
    props;
  const navigate = useNavigate();
  const miniBoxes = colors.map((color) => (
    <div
      className={classes.miniColor}
      style={{ backgroundColor: color.color }}
      key={color.name}
    ></div>
  ));

  const deletePalette = (e) => {
    e.stopPropagation();
    handleDelete(id);
    navigate('/');
  };

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
}

export default withStyles(styles)(MiniPalette);

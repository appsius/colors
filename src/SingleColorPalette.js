import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { seedColors } from './seedColors';
import { generatePalette } from './ColorHelpers';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import { withStyles } from '@mui/styles';
import { styles } from './styles/PaletteStyles';

function SingleColorPalette(props) {
  const { classes } = props;
  const [format, setFormat] = useState('hex');
  const { paletteId, colorId } = useParams();
  const palette = generatePalette(findPalette(paletteId));
  const { paletteName, emoji } = palette;
  const _shades = gatherShades(palette, colorId);
  const colorBoxes = _shades.map((color) => (
    <ColorBox
      key={color.name}
      name={color.name}
      background={color[format]}
      showingFullPalette={false}
    />
  ));

  function findPalette(id) {
    return seedColors.find(function (palette) {
      return palette.id === id;
    });
  }

  function gatherShades(palette, colorToFilterBy) {
    // return all shades of color
    let shades = [];
    let allColors = palette.colors;
    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter((color) => color.id === colorToFilterBy)
      );
    }
    return shades.slice(1);
  }

  function changeFormat(val) {
    setFormat(val);
  }

  return (
    <div className={`Single-color-palette ${classes.Palette}`}>
      <Navbar handleChange={changeFormat} showingFullPalette={false} />
      <div className={classes.colors}>
        {colorBoxes}
        <div className={classes.goBack}>
          <Link to={`/palette/${paletteId}`}>GO BACK</Link>
        </div>
      </div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  );
}

export default withStyles(styles)(SingleColorPalette);

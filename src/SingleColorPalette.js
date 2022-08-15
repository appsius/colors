import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { seedColors } from './seedColors';
import { generatePalette } from './ColorHelpers';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import { withStyles } from '@mui/styles';

const styles = {
  Palette: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  colors: {
    height: '90%',
  },
  goBack: {
    width: '20%',
    height: '50%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-5px',
    opacity: 1,
    backgroundColor: 'black',
    '& a': {
      color: 'white',
      width: '100px',
      height: '30px',
      position: 'absolute',
      display: 'inline-block',
      top: '50%',
      left: '50%',
      marginLeft: '-50px',
      marginTop: '-15px',
      textAlign: 'center',
      outline: 'none',
      background: 'rgba(255, 255, 255, 0.3)',
      fontSize: '1rem',
      lineHeight: '30px',
      textTransform: 'uppercase',
      textDecoration: 'none',
      border: 'none',
    },
  },
};

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

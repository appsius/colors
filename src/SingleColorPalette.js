import React, { useState } from 'react';
import { useParams } from 'react-router';
import { seedColors } from './seedColors';
import { generatePalette } from './ColorHelpers';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';

export default function SingleColorPalette() {
  const [format, setFormat] = useState('hex');
  const { paletteId, colorId } = useParams();
  const palette = generatePalette(findPalette(paletteId));
  const { paletteName, emoji } = palette;
  const _shades = gatherShades(palette, colorId);
  const colorBoxes = _shades.map((color) => (
    <ColorBox
      key={color.id}
      name={color.name}
      background={color[format]}
      showLink={false}
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
    <div className='Palette'>
      <Navbar handleChange={changeFormat} showingAllColors={false} />
      <h1>Single Color Palette</h1>
      <div className='Palette-colors'>{colorBoxes}</div>;
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  );
}

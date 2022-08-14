import React from 'react';
import { useParams } from 'react-router';
import { seedColors } from './seedColors';
import { generatePalette } from './ColorHelpers';
import ColorBox from './ColorBox';

export default function SingleColorPalette() {
  const { paletteId, colorId } = useParams();
  const palette = generatePalette(findPalette(paletteId));
  const _shades = gatherShades(palette, colorId);

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

  console.log(_shades);

  const colorBoxes = _shades.map((color) => (
    <ColorBox
      key={color.id}
      name={color.name}
      background={color.hex}
      showLink={false}
    />
  ));

  return (
    <div className='Palette'>
      <h1>Single Color Palette</h1>
      <div className='Palette-colors'>{colorBoxes}</div>;
    </div>
  );
}

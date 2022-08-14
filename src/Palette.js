import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Palette.css';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import { seedColors } from './seedColors';
import { generatePalette } from './ColorHelpers';
import PaletteFooter from './PaletteFooter';

export default function Palette() {
  const { paletteId } = useParams();
  const [level, setLevel] = useState(500);
  const [format, setFormat] = useState('hex');
  const palette = generatePalette(findPalette(paletteId));
  const { paletteName, emoji } = palette;

  const colorBoxes = palette.colors[level].map((color) => (
    <ColorBox
      background={color[format]}
      name={color.name}
      key={color.id}
      moreUrl={`/palette/${paletteId}/${color.id}`}
      showingFullPalette
    />
  ));

  function findPalette(id) {
    return seedColors.find(function (palette) {
      return palette.id === id;
    });
  }
  function changeLevel(level) {
    setLevel(level);
  }
  function changeFormat(val) {
    setFormat(val);
  }

  return (
    <div className='Palette'>
      <Navbar
        level={level}
        changeLevel={changeLevel}
        handleChange={changeFormat}
        showingFullPalette={true}
      />
      <div className='Palette-colors'>{colorBoxes}</div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  );
}

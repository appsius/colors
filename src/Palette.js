import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Palette.css';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import { seedColors } from './seedColors';
import { generatePalette } from './ColorHelpers';

export default function Palette(props) {
  const { paletteId } = useParams();
  const [level, setLevel] = useState(500);
  const [format, setFormat] = useState('hex');

  const findPalette = (id) => {
    return seedColors.find(function (palette) {
      return palette.id === id;
    });
  };
  const changeLevel = (level) => {
    setLevel(level);
  };
  const changeFormat = (val) => {
    setFormat(val);
  };

  const palette = generatePalette(findPalette(paletteId));
  const colorBoxes = palette.colors[level].map((color) => (
    <ColorBox background={color[format]} name={color.name} key={color.id} />
  ));

  return (
    <div className='Palette'>
      <Navbar
        level={level}
        changeLevel={changeLevel}
        handleChange={changeFormat}
      />
      <div className='Palette-colors'>{colorBoxes}</div>
      <footer className='Palette-footer'>
        {palette.paletteName}
        <span className='emoji'>{palette.emoji}</span>
      </footer>
    </div>
  );
}

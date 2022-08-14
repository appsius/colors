import React from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';

export default function PaletteList(props) {
  const { palettes } = props;
  return (
    <div>
      <MiniPalette />
      <h1>React Colors</h1>
      {palettes.map((palette) => (
        <MiniPalette {...palette} />
        // <p>
        //   <Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link>
        // </p>
      ))}
    </div>
  );
}

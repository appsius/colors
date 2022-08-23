import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import { seedColors } from './seedColors';

import './App.css';

export default function App() {
  const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
  const [palettes, setPalettes] = useState(savedPalettes || seedColors);

  const savePalette = (newPalette) => {
    setPalettes([...palettes, newPalette]);
  };

  const deletePalette = (id) => {
    const filteredPalettes = palettes.filter((p) => p.id !== id);
    setPalettes(filteredPalettes);
  };

  useEffect(() => {
    if (palettes.length === 0) {
      window.localStorage.setItem('palettes', JSON.stringify(seedColors));
    } else {
      window.localStorage.setItem('palettes', JSON.stringify(palettes));
    }
  }, [palettes]);

  return (
    <Routes>
      <Route
        exact
        path='/palette/new'
        element={
          <NewPaletteForm palettes={palettes} savePalette={savePalette} />
        }
      />
      <Route
        exact
        path='/'
        element={
          <PaletteList palettes={palettes} deletePalette={deletePalette} />
        }
      />
      <Route
        exact
        path='/palette/:paletteId'
        element={<Palette palettes={palettes} />}
      />
      <Route
        exact
        path='/palette/:paletteId/:colorId'
        element={<SingleColorPalette palettes={palettes} />}
      />
    </Routes>
  );
}

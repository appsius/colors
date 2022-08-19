import React, { Component, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import { seedColors } from './seedColors';

import './App.css';

export default function App() {
  const [palettes, setPalettes] = useState(seedColors);
  const savePalette = (newPalette) => {
    setPalettes([...palettes, newPalette]);
  };

  return (
    <Routes>
      <Route
        exact
        path='/palette/new'
        element={<NewPaletteForm savePalette={savePalette} />}
      />
      <Route exact path='/' element={<PaletteList palettes={palettes} />} />
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

import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import { seedColors } from './seedColors';

import './App.css';

export default function App() {
  return (
    <Routes>
      <Route exact path='/palette/new' element={<NewPaletteForm />} />
      <Route exact path='/' element={<PaletteList palettes={seedColors} />} />
      <Route exact path='/palette/:paletteId' element={<Palette />} />
      <Route
        exact
        path='/palette/:paletteId/:colorId'
        element={<SingleColorPalette />}
      />
    </Routes>
  );
}

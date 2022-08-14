import React, { Component } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import { seedColors } from './seedColors';
import SingleColorPalette from './SingleColorPalette';

export default function App() {
  return (
    <Routes>
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

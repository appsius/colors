import React, { Component } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Palette from './Palette';

export default class App extends Component {
  render() {
    return (
      <Routes>
        <Route exact path='/' element={<h1>Palette List Goes Here</h1>} />
        <Route exact path='/palette/:paletteId' element={<Palette />} />
      </Routes>
    );
  }
}

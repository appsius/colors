import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './ColorHelpers';

export default class App extends Component {
  render() {
    return (
      <Routes>
        <Route exact path='/' element={<h1>Palette List Goes Here</h1>} />
        <Route
          exact
          path='/palette/:id'
          element={<h1>Individual Palette</h1>}
        />
      </Routes>
      // <div>
      //   <Palette palette={generatePalette(seedColors[4])} />
      // </div>
    );
  }
}

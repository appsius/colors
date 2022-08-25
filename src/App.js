import React, { useEffect, useState, Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import { seedColors } from './seedColors';
import './App.css';
import { Switch } from '@mui/material';

export default function App() {
  const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
  const [palettes, setPalettes] = useState(savedPalettes || seedColors);
  const location = useLocation();

  console.log(location);

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
    <Fragment>
      <TransitionGroup>
        <CSSTransition key={location.key} classNames='fade' timeout={1000}>
          <Routes location={location}>
            <Route
              exact
              path='/palette/new'
              element={
                <div className='page'>
                  <NewPaletteForm
                    palettes={palettes}
                    savePalette={savePalette}
                  />
                </div>
              }
            />
            <Route
              exact
              path='/'
              element={
                <div className='page'>
                  <PaletteList
                    palettes={palettes}
                    deletePalette={deletePalette}
                  />
                </div>
              }
            />
            <Route
              exact
              path='/palette/:paletteId'
              element={
                <div className='page'>
                  <Palette palettes={palettes} />
                </div>
              }
            />
            <Route
              exact
              path='/palette/:paletteId/:colorId'
              element={
                <div className='page'>
                  <SingleColorPalette palettes={palettes} />
                </div>
              }
            />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </Fragment>
  );
}

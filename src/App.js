import React, { useEffect, useState, Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { seedColors } from './seedColors';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import Page from './Page';

export default function App() {
  const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
  const [palettes, setPalettes] = useState(savedPalettes || seedColors);
  const location = useLocation();

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
        <CSSTransition key={location.key} classNames='page' timeout={500}>
          <Routes location={location}>
            <Route
              exact
              path='/palette/new'
              element={
                <Page>
                  <NewPaletteForm
                    palettes={palettes}
                    savePalette={savePalette}
                  />
                </Page>
              }
            />
            <Route
              exact
              path='/'
              element={
                <Page>
                  <PaletteList
                    palettes={palettes}
                    deletePalette={deletePalette}
                  />
                </Page>
              }
            />
            <Route
              exact
              path='/palette/:paletteId'
              element={
                <Page>
                  <Palette palettes={palettes} />
                </Page>
              }
            />
            <Route
              exact
              path='/palette/:paletteId/:colorId'
              element={
                <Page>
                  <SingleColorPalette palettes={palettes} />
                </Page>
              }
            />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </Fragment>
  );
}

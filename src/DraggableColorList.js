import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import { styled } from '@mui/material/styles';
import DraggableColorBox from './DraggableColorBox';

const ColorBoxes = styled('ul')(() => ({
  marginTop: '0',
  paddingLeft: '0',
  height: 'calc(100vh - 60px)',
}));

const DraggableColorList = SortableContainer(({ colors, removeColor }) => {
  return (
    <ColorBoxes>
      {colors.map((c, i) => {
        const { color, name } = c;
        return (
          <DraggableColorBox
            index={i}
            key={name}
            color={color}
            name={name}
            handleClick={() => removeColor(name)}
          />
        );
      })}
    </ColorBoxes>
  );
});

export default DraggableColorList;

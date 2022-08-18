import React from 'react';
import { withStyles } from '@mui/styles';

const styles = {
  root: {
    width: '20%',
    height: '25%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-5px',
  },
};

function DraggableColorBox(props) {
  const { color, classes } = props;

  return (
    <div className={classes.root} style={{ backgroundColor: color }}>
      {color}
    </div>
  );
}

export default withStyles(styles)(DraggableColorBox);

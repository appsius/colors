import React from 'react';
import { withStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import { styles } from './styles/PaletteListStyles';

function PaletteList(props) {
  const { palettes, classes } = props;
  const navigate = useNavigate();

  const goToPalette = (id) => {
    navigate(`/palette/${id}`);
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1>React Colors</h1>
        </nav>
        <div className={classes.palettes}>
          {palettes.map((palette) => (
            <MiniPalette
              {...palette}
              key={palette.id}
              handleClick={() => goToPalette(palette.id)}
            />
            // <p>
            //   <Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link>
            // </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(PaletteList);

import sizes from './sizes';

const styles = {
  PaletteFooter: {
    backgroundColor: 'white',
    height: '4vh',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontWeight: 'bold',
    [sizes.down('xs')]: {
      height: '2vh',
      justifyContent: 'center',
      fontWeight: '600',
    },
  },
  emoji: {
    fontSize: '1.5rem',
    margin: '0 1rem',
  },
};

export { styles };

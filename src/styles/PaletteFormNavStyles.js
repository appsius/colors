import sizes from './sizes';

const styles = {
  root: { display: 'flex' },
  navBtns: {
    marginRight: '1rem',
    '& a': {
      textDecoration: 'none',
    },
    [sizes.down('xs')]: {
      width: '10rem',
      marginRight: '-1rem',
    },
  },
  button: {
    marginRight: '0.5rem !important',
    [sizes.down('xs')]: {
      margin: '0 0 !important',
      marginRight: '0.2rem !important',
      padding: '0.25rem !important',
      fontSize: '.75rem !important',
    },
  },
  title: {
    fontSize: '2rem',
    [sizes.down('xs')]: {
      fontSize: '0.5rem',
    },
  },
};

export default styles;

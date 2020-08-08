const useStyles = (theme) => ({
  formControl: {
    width: 125,
    marginRight: 15,
    textAlign: 'left',
  },

  logo: {
    width: 128,
  },

  container: {
    height: 450,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#888',
  },

  orderParams: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 40,
    textAlign: 'right',
  },

  icon: {
    fontSize: 72,
    marginBottom: 15,
  },

  welcomeMessage: {
    fontSize: 48,
    fontWeight: 'bold',
  },

  instructionsMessage: {
    paddingTop: 20,
    fontSize: 20,
  },

  root: {
    display: 'flex',
    justifyContent: 'center',
    padding: 20,
    '& > *': {
      margin: theme.spacing(1),
    },
  },

  cardWrapper: {
    padding: 20,
    paddingTop: 0,
    display: 'grid',
    gridGap: 20,
    gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
  },

  card: {
    width: '90%',
    maxWidth: 900,
    height: 450,
    fontSize: 18,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#aaa',
  },

  inputButton: {
    display: 'none',
  },
});

export default useStyles;

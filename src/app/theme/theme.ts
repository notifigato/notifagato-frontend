import { Theme as MuiTheme, createTheme } from '@mui/material';

export const Theme = createTheme({
  shape: {
    borderRadius: 8,
  },
  palette: {
    background: {
      default: '#eceff1',
      paper: '#cfd8dc',
    },
    primary: {
      50: '#e0f2f1',
      100: '#b2dfdb',
      200: '#80cbc4',
      300: '#4db6ac',
      400: '#26a69a',
      500: '#009688',
      600: '#00897b',
      700: '#00796b',
      800: '#00695c',
      900: '#004d40',
    },
    text: {
      primary: '#263238',
    },
  },
});

declare module '@mui/material/styles' {
  interface DefaultTheme extends MuiTheme {}
}

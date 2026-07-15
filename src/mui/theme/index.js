import { responsiveFontSizes } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import shadows from './shadows';
import { light, dark } from './palette';

const getTheme = (mode, themeToggler) =>
  responsiveFontSizes(
    createTheme({
      palette: mode === 'light' ? light : dark,
      shadows: shadows(mode),
      typography: {
        fontFamily: '"Inter", system-ui, sans-serif',
        h1: { fontWeight: 800, letterSpacing: '-0.02em' },
        h2: { fontWeight: 800, letterSpacing: '-0.02em' },
        h3: { fontWeight: 700, letterSpacing: '-0.01em' },
        h4: { fontWeight: 700, letterSpacing: '-0.01em' },
        h5: { fontWeight: 700 },
        h6: { fontWeight: 700 },
        button: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
      zIndex: {
        appBar: 1200,
        drawer: 1300,
      },
      components: {
        MuiButton: {
          defaultProps: {
            disableElevation: true,
          },
          styleOverrides: {
            root: {
              fontWeight: 600,
              borderRadius: 12,
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 20,
              paddingRight: 20,
            },
            containedSecondary: mode === 'light' ? { color: 'white' } : {},
            sizeLarge: {
              paddingTop: 13,
              paddingBottom: 13,
              paddingLeft: 26,
              paddingRight: 26,
            },
          },
        },
        MuiInputBase: {
          styleOverrides: {
            root: {
              borderRadius: 10,
            },
          },
        },
        MuiOutlinedInput: {
          styleOverrides: {
            root: {
              borderRadius: 10,
            },
            input: {
              borderRadius: 10,
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              borderRadius: 16,
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            rounded: {
              borderRadius: 16,
            },
          },
        },
      },
      themeToggler,
    }),
  );

export default getTheme;

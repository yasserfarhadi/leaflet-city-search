import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          ':focus-visible': { outline: 'none' },
          ':focus': { outline: 'none' },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '100%',
          fieldSet: { border: 'none' },
          label: { fontSize: '16px' },
        },
      },
    },
  },
});

const MuiTheme: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MuiTheme;

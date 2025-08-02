import { GlobalStyles as MuiGlobalStyles } from '@mui/material';

const GlobalStyles = () => (
  <MuiGlobalStyles
    styles={{
      '*': {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0,
      },
      html: {
        height: '100%',
      },
      body: {
        backgroundColor: '#f5f5f5',
        lineHeight: 1.5,
        height: '100%',
        margin: 0,
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      },
      '#root': {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      },
      a: {
        textDecoration: 'none',
        color: 'inherit',
      },
    }}
  />
);

export default GlobalStyles;
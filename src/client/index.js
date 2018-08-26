import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'react-jss';
import Main from './Main';
import theme from '../shared/styles/theme';

ReactDOM.hydrate(
  (
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider>
  ),
  document.getElementById('root')
);

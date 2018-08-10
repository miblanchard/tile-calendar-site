import express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import {
  SheetsRegistry,
  createGenerateClassName,
  JssProvider,
  ThemeProvider
} from 'react-jss/lib';
import configureStore from '../client/redux/configureStore';
// import rootSaga from '../sagas/index';
import renderFullPage from './renderFullPage';
import App from '../client/containers/App';

const app = express();

app.use(express.static(path.resolve(__dirname, '../build')));

const theme = {
  colorPrimary: '#ffa31a',
  colorSecondary: '#ff9933'
};

app.get('/', (req, res) => {
  const sheetsRegistry = new SheetsRegistry();
  const store = configureStore();
  const reduxState = store.getState();
  const generateClassName = createGenerateClassName();
  const css = sheetsRegistry.toString();
  const jsx = ( //eslint-disable-line
    <Provider store={store}>
      <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </JssProvider>
    </Provider>
  ); //eslint-disable-line

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(renderFullPage(renderToString(jsx), reduxState, css));
  // res.end(renderFullPage(renderToString(jsx), reduxState));
  // store.close();
});

app.listen(8080, () => {
  console.log('Started server, listening on http://localhost:8080');
});

import express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import {
  SheetsRegistry,
  createGenerateClassName,
  JssProvider,
  ThemeProvider
} from 'react-jss/lib';
import renderFullPage from './renderFullPage';
import App from '../client/containers/App';

const app = express();

app.use(express.static(path.resolve(__dirname, '../build')));

const theme = {
  colorPrimary: '#ffa31a',
  colorSecondary: '#ff9933'
};

app.get('/*', (req, res) => {
  const sheetsRegistry = new SheetsRegistry();
  const generateClassName = createGenerateClassName();
  const css = sheetsRegistry.toString();
  const context = {};
  const jsx = ( //eslint-disable-line
    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
      <ThemeProvider theme={theme}>
        <StaticRouter
          location={req.url}
          context={context}
        >
          <App />
        </StaticRouter>
      </ThemeProvider>
    </JssProvider>
  ); //eslint-disable-line

  // console.log('context', context)
  // console.log('req.url', req.url)

  if (context.url) {
    res.writeHead(301, {
      Location: context.url
    });
    res.end();
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(renderFullPage(renderToString(jsx), css));
  }
});

app.listen(8080, () => {
  console.log('Started server, listening on http://localhost:8080');
});

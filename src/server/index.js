import express from 'express';
import compression from 'compression';
// import cors from 'cors';
import React from 'react';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
import { StaticRouter } from 'react-router';
import {
  SheetsRegistry,
  createGenerateClassName,
  JssProvider,
  ThemeProvider
} from 'react-jss/lib';
import App from '../shared/App';
import renderFullPage from './renderFullPage';
import { fetchInitialData } from '../shared/api';
import theme from '../shared/styles/theme';

const app = express();

// app.use(cors());

// Remove annoying Express header addition.
app.disable('x-powered-by');

// Compress (gzip) assets in production.
app.use(compression());

app.use(express.static('./src/build'));

app.get('/', (req, res, next) => {
  const sheetsRegistry = new SheetsRegistry();
  const generateClassName = createGenerateClassName();
  const context = {};

  fetchInitialData()
    .then((data) => {
      const jsx = renderToString(
        <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
          <ThemeProvider theme={theme}>
            <StaticRouter location={req.url} context={context}>
              <App data={data} />
            </StaticRouter>
          </ThemeProvider>
        </JssProvider>
      );

      // if (context.url) {
      //   res.writeHead(301, {
      //     Location: context.url
      //   });
      //   res.end();
      // } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(renderFullPage(jsx, serialize(data), sheetsRegistry.toString()));
      // }
    }).catch((e) => {
      console.log(e);
      response.status(500).json({ error: e.message, stack: e.stack });
    });
});

app.get('/*', (req, res, next) => {
  res.redirect(301, '/');
  // res.writeHead(301, {
  //     Location: context.url
  // });
  // res.end();
});

app.listen(3000, () => {
  console.log('Server is listening on port: 3000');
});

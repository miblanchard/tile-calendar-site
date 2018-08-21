import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'react-jss';
import { BrowserRouter } from 'react-router-dom';
import App from './containers/App';

class Main extends React.Component {
  // Remove the server-side injected CSS.
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
  }
}

const theme = {
  colorPrimary: '#ffa31a',
  colorSecondary: '#ff9933'
};

const jsx = (
  <ThemeProvider theme={theme}>
    <Main />
  </ThemeProvider>
);

ReactDOM.hydrate(jsx, document.getElementById('root'));

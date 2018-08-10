import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'react-jss';
import App from './containers/App';
// import rootSaga from './sagas/index';
import configureStore from './redux/configureStore';

class Main extends React.Component {
  // Remove the server-side injected CSS.
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return <App />;
  }
}

const theme = {
  colorPrimary: '#ffa31a',
  colorSecondary: '#ff9933'
};

const store = configureStore(window.REDUX_DATA);
// store.runSaga(rootSaga);

const jsx = (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider>
  </Provider>
);

ReactDOM.hydrate(jsx, document.getElementById('root'));

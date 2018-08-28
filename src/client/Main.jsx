
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from '../shared/App';

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
        <App data={window.__INITIAL_DATA__} />
      </BrowserRouter>
    );
  }
}

export default Main;

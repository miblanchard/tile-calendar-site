import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'react-jss';
import { BrowserRouter } from 'react-router-dom';
import App from '../shared/App';
import theme from '../shared/styles/theme';

// class Main extends React.Component {
//   // Remove the server-side injected CSS.
//   componentDidMount() {
// const jssStyles = document.getElementById('jss-server-side');
// if (jssStyles && jssStyles.parentNode) {
//   jssStyles.parentNode.removeChild(jssStyles);
// }
//   }

//   render() {
//     return (
//       <BrowserRouter>
//         <App data={window.__INITIAL_DATA__} />
//       </BrowserRouter>
//     )
//   }
// }

const jsx = (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App data={window.__INITIAL_DATA__} />
    </BrowserRouter>
  </ThemeProvider>
);

ReactDOM.hydrate(jsx, document.getElementById('root'));

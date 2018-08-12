import React, { Component, StrictMode } from 'react';
import injectSheet from 'react-jss';
import axios from 'axios';
import path from 'path';
import shortId from 'shortid';
import PropTypes from 'prop-types';
import DateList from './DateList';
import ajaxErrorHandler from '../utils/ajaxErrorHandler';
import ActTile from '../components/ActTile';

// JSS using lifecycle methods not compatible with React 17
const styles = theme => ({
  '@global': {
    body: {
      font: '100% Helvetica, sans-serif',
      backgroundColor: '#fffff4',
    },
    ul: {
      'list-style': 'none'
    }
  },
  wrapper: {
    display: 'flex',
    flexFlow: 'row wrap',
    height: '100%',
    justifyContent: 'space-around',
  }
});

class App extends Component {
  constructor(props) {
    super();

    this.state = {
      cachedData: null,
    };

    this.source = axios.CancelToken.source();
  }

  componentDidMount() {
    // initial data fetch
    axios.get(path.resolve(__dirname, 'data/dummy.json'), {
      cancelToken: this.source.token
    }).then((result) => {
      this.setState({
        cachedData: result.data,
      });
    }).catch(ajaxErrorHandler);
  }

  // cancels any pending network request from axios
  componentWillUnmount() {
    this.source.cancel();
  }

  render() {
    const { classes } = this.props;
    const actsArr = this.state.cachedData &&
      this.state.cachedData.acts &&
      this.state.cachedData.acts.map(act => (
        <ActTile
          key={shortId.generate()}
          id={act.id}
          name_first={act.name_first}
          name_last={act.name_last}
          headshot_url={act.headshot_url}
          maxTouchPoints={this.state.maxTouchPoints}
        >
          <DateList
            id={act.id}
            dates={act.dates}
          />
        </ActTile>
      ));

    return (
      <div>
        <StrictMode>
          <div className={classes.wrapper}>
            {actsArr}
          </div>
        </StrictMode>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(App);


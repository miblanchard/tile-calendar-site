import React, { Component, StrictMode } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import shortId from 'shortid';
import DateList from './DateList';
import ActTile from '../components/ActTile';
import dummy from '../../data/dummy.json';

import * as actions from '../actions/actions';

const mapStateToProps = store => ({
  // 
});

const mapDispatchToProps = dispatch => ({
  // 
});

// JSS using lifecycle methods not compatible with React 17
const styles = theme => ({
  '@global': {
    body: {
      font: '100% Helvetica, sans-serif',
      backgroundColor: '#fffff4',
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
  }

  render() {
    console.log('app render')
    const { classes } = this.props;
    const actsArr = dummy.acts.map(act => (
      <ActTile
        key={shortId.generate()}
        id={act.id}
        name_first={act.name_first}
        name_last={act.name_last}
        headshot_url={act.headshot_url}
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

export default connect(mapStateToProps, mapDispatchToProps)(injectSheet(styles)(App));


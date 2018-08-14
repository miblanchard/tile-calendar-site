import path from 'path';
import React, { Component, StrictMode } from 'react';
import { findDOMNode } from 'react-dom';
import { Route, Switch, Redirect } from 'react-router';
import injectSheet from 'react-jss';
import axios from 'axios';
import shortId from 'shortid';
import PropTypes from 'prop-types';
import ajaxErrorHandler from '../utils/ajaxErrorHandler';
import ActTile from '../components/ActTile';
import DateList from '../components/DateList';

// JSS using lifecycle methods not compatible with React 17
const styles = theme => ({
  '@global': {
    body: {
      font: '100% Helvetica, sans-serif',
      backgroundColor: '#fffff4',
    },
    a: {
      'text-decoration': 'none',
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
    overflow: 'hidden',
    margin: 0
  },
  'act-name': {
    'text-shadow': [
      ['1px', '1px', '#000'],
      ['-1px', '-1px', '#000'],
      ['-1px', '1px', '#000'],
      ['1px', '-1px', '#000']
    ],
    // position: 'absolute',
    color: '#f9f9f9',
    padding: '0.25rem 1rem',
    margin: 'auto',
  }
});

class App extends Component {
  constructor(props) {
    super();

    this.state = {
      cachedData: null,
      actTileUi: {},
      redirectHome: false
    };

    this.source = axios.CancelToken.source();
    this.handleTileClick = this.handleTileClick.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    // initial data fetch
    axios.get(path.resolve(__dirname, 'data/dummy.json'), {
      cancelToken: this.source.token
    }).then((result) => {
      this.setState((() => {
        let actTileUi = {};
        result.data.acts.forEach((act) => {
          actTileUi = Object.assign(actTileUi, { [act.id]: { active: false } });
        });
        return {
          cachedData: result.data,
          actTileUi
        };
      }));
    }).catch(ajaxErrorHandler);
  }

  componentDidUpdate() {
    if (this.state.redirectHome) {
      this.setState({
        redirectHome: false
      });
    }
  }

  componentWillUnmount() {
    // document.removeEventListener('click', this.handleClickOutside); // update this
    // cancels any pending network request from axios
    this.source.cancel();
  }

  setWrapperRef(node, id) {
    const key = `wrapperRef${id}`;
    this[key] = node;
  }

  handleClickOutside(e, id) {
    const key = `wrapperRef${id}`;
    const node = findDOMNode(this[key])
    console.log('event', e)
    console.log('key', key)
    console.log('this[key]', node)
    console.log('this[key].contains(e.target)', node.contains(e.target));
    console.log('e.target', e.target)
    if (node && !node.contains(e.target)) {
      this.setState({
        actTileUi: Object.assign(
          {},
          this.state.actTileUi,
          { [id]: { active: false } }
        ),
        redirectHome: true
      });
    }
  }

  handleTileClick(id) {
    if (!this.state.actTileUi[id].active) {
      console.log('handleTileClick')
      document.addEventListener('click', e => this.handleClickOutside(e, id), { once: true });
      this.setState({
        actTileUi: Object.assign(
          {},
          this.state.actTileUi,
          { [id]: { active: true } }
        ),
      });
    }
  }

  render() {
    const { classes } = this.props;
    if (this.state.redirectHome) return <Redirect to="/" />;

    const actsArr = this.state.cachedData &&
      this.state.cachedData.acts &&
      this.state.cachedData.acts.map((act) => {
        // const SlideOpenRoute = ({ component: Component, ...rest}) => (
        // )
        return (
          <ActTile
            key={shortId.generate()}
            ref={node => this.setWrapperRef(node, act.id)}
            id={act.id}
            active={this.state.actTileUi[act.id].active}
            name_first={act.name_first}
            name_last={act.name_last}
            headshot_url={act.headshot_url}
            handleClick={this.handleTileClick}
            >
            <Switch>
              <Route
                path={`/datelist/${act.id}`}
                render={props => (
                  <DateList
                    {...props}
                    id={act.id}
                    dates={act.dates}
                    name_first={act.name_first}
                    name_last={act.name_last}
                  />
                )}
              />
              <Route
                path="/"
                render={() => (
                  <h3 className="act-name">{`${act.name_first} ${act.name_last}`}</h3>
              )}
              />
            </Switch>
          </ActTile>
        );
      });

    return (
      <div>
        <div className={classes.wrapper}>
          {actsArr}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(App);


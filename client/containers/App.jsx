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
import Searchbar from '../components/Searchbar';

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
      actMap: [],
      actTileUi: {},
      searchText: '',
      redirectHome: false
    };

    this.source = axios.CancelToken.source();
    this.handleTileClick = this.handleTileClick.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  componentDidMount() {
    // initial data fetch
    axios.get(path.resolve(__dirname, 'data/dummy.json'), {
      cancelToken: this.source.token
    }).then((result) => {
      this.setState((() => {
        let actTileUi = {};
        const actMap = [];
        result.data.acts.forEach((act) => {
          actTileUi = Object.assign(actTileUi, { [act.id]: { active: false, display: true } });
          actMap.push([act.id, `${act.name_first} ${act.name_last}`]);
        });
        return {
          cachedData: result.data,
          actMap,
          actTileUi
        };
      }));
    }).catch(ajaxErrorHandler);
  }

  componentDidUpdate(prevProps, prevState) {
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

  handleSearchSubmit() {

  }

  handleSearchChange(e) {
    const { currentTarget } = e;
    const matches = [];
    const notMatches = [];
    this.state.actMap.forEach((act) => {
      if (act[1].toLowerCase().includes(currentTarget.value.toLowerCase())) {
        matches.push(act);
      } else {
        notMatches.push(act);
      }
    });

    this.setState((prevState) => {
      let actTileUi = Object.assign({}, prevState.actTileUi);
      matches.forEach((act) => {
        actTileUi = Object.assign(actTileUi, {
          [act[0]]: {
            ...actTileUi[act[0]],
            display: true
          }
        });
      });
      notMatches.forEach((act) => {
        actTileUi = Object.assign(actTileUi, {
          [act[0]]: {
            ...actTileUi[act[0]],
            display: false
          }
        });
      });
      return {
        searchText: currentTarget.value,
        actTileUi
      }
    });
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
    console.log(this.state)
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
            display={this.state.actTileUi[act.id].display}
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
        <Searchbar
          value={this.state.searchText}
          handleChange={this.handleSearchChange}
          handleSubmit={this.handleSearchSubmit}
        />
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


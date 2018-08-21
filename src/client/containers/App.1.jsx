import path from 'path';
import React, { Component, StrictMode } from 'react';
import { findDOMNode } from 'react-dom';
import { Route, Switch, Redirect } from 'react-router';
import injectSheet from 'react-jss';
import axios from 'axios';
import shortId from 'shortid';
import PropTypes from 'prop-types';
import ajaxErrorHandler from '../utils/ajaxErrorHandler';
import shuffle from '../utils/shuffle';
import months from '../utils/maps/months';
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
      redirectHome: false,
      datesTable: {},
      actKeysReordered: [],
      endIndex: 10
    };

    this.source = axios.CancelToken.source();
    this.handleTileClick = this.handleTileClick.bind(this);
    this.wrapperRef = React.createRef();
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.trackScrolling = this.trackScrolling.bind(this);
    this.setTileRef = (node) => {
      if (node) {
        const { id } = node.props;
        const key = `tileRef${id}`;
        this[key] = node;
        this[`${key}HandleClickOutside`] = this.nhco(id).bind(this);
      }
    };
  }

  componentDidMount() {
    document.addEventListener('scroll', this.trackScrolling);
    // initial data fetch
    axios.get(path.resolve(__dirname, 'data/data.json'), {
      cancelToken: this.source.token
    }).then((result) => {
      this.setState((() => {
        const actMap = [];
        const acts = Object.keys(result.data.acts);
        let actTileUi = {};
        let datesTable = {};
        acts.forEach((act) => {
          const actDatesTable = {};
          actTileUi = Object.assign(actTileUi, { [result.data.acts[act].id]: { active: false, display: true } });
          actMap.push([result.data.acts[act].id, `${act}`]);

          /*
            this datesTable codeblock needs to be moved to the server once mvp is reached 
          */
          result.data.acts[act].dates.sort(((a, b) => (
            new Date(a.date) - new Date(b.date)
          )));
          let dateCounter = new Date('January 1, 1970, 00:00:00');
          for (let i = 0; i < result.data.acts[act].dates.length; i++) {
            const date = new Date(result.data.acts[act].dates[i].date);
            // set initial date
            if (i === 0) {
              dateCounter = new Date(`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}, 04:00:00`);
              actDatesTable[`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`] = [];
            }
            // account for date change at midnight
            if ((date.getTime() / 1000 / 60 / 60) - (dateCounter.getTime() / 1000 / 60 / 60) >= 24) {
              // start time for new day is 4am to catch late night shows
              dateCounter = new Date(`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}, 04:00:00`);
              actDatesTable[`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`] = [];
              actDatesTable[`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`] = actDatesTable[`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`].concat(result.data.acts[act].dates[i]);
            } else if ((date.getTime() / 1000 / 60 / 60) - (dateCounter.getTime() / 1000 / 60 / 60) >= 20) {
              actDatesTable[`${months[date.getMonth()]} ${date.getDate() - 1}, ${date.getFullYear()}`] = actDatesTable[`${months[date.getMonth()]} ${date.getDate() - 1}, ${date.getFullYear()}`].concat(result.data.acts[act].dates[i]);
            } else {
              actDatesTable[`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`] = actDatesTable[`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`].concat(result.data.acts[act].dates[i]);
            }
          }

          datesTable = Object.assign(datesTable, { [result.data.acts[act].id]: actDatesTable });
        });

        return {
          cachedData: result.data,
          actMap,
          actTileUi,
          actKeysReordered: shuffle(Object.keys(result.data.acts)),
          datesTable
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
    for (let i = 0; i < actMap.length; i++) {
      const func = `tileRef${i}HandleClickOutside`
      document.removeEventListener('click', this[func]);
    }
    document.removeEventListener('scroll', this.trackScrolling);
    // cancels any pending network request from axios
    this.source.cancel();
  }

  trackScrolling() {
    function isBottom(el) {
      return el.getBoundingClientRect().bottom <= window.innerHeight;
    }

    const wrappedElement = this.wrapperRef.current;
    if (isBottom(wrappedElement)) {
      console.log('header bottom reached');
      document.removeEventListener('scroll', this.trackScrolling);
      this.setState(prevState => ({
        endIndex: prevState.endIndex + 10
      }));
      document.addEventListener('scroll', this.trackScrolling);
    }
  }

  nhco(id) {
    return (e) => {
      const key = `tileRef${id}`;
      const node = findDOMNode(this[key]);
      if (node && !node.contains(e.target)) {
        let redirectHome = false;
        if (this.wrapperRef.current.contains(e.target)) {
          redirectHome = true;
        }
        this.setState(prevState => ({
          actTileUi: Object.assign(
            {},
            prevState.actTileUi,
            { [id]: { ...prevState.actTileUi[id], active: false } }
          ),
          redirectHome
        }));
        document.removeEventListener('click', this[`${key}HandleClickOutside`]);
      }
    };
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
      };
    });
  }

  handleTileClick(id) {
    if (!this.state.actTileUi[id].active) {
      const func = `tileRef${id}HandleClickOutside`;
      document.addEventListener('click', this[func]);
      this.setState(prevState => ({
        actTileUi: Object.assign(
          {},
          prevState.actTileUi,
          { [id]: { ...prevState.actTileUi[id], active: true } }
        ),
      }));
    }
  }

  render() {
    const { classes } = this.props;
    if (this.state.redirectHome) return <Redirect to="/" />;

    const buildTiles = () => {
      const result = [];
      if (this.state.cachedData && this.state.cachedData.acts) {
        const lastIndex = this.state.endIndex < this.state.actKeysReordered.length ? this.state.endIndex : this.state.actKeysReordered.length;
        for (let i = 0; i < lastIndex; i++) {
          const act = this.state.cachedData.acts[this.state.actKeysReordered[i]];
          result.push(
            <ActTile
              key={act.id}
              ref={this.setTileRef}
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
                      dates={this.state.datesTable[act.id]}
                      name_first={act.name_first}
                      name_last={act.name_last ? act.name_last : ''}
                    />
                  )}
                />
                <Route
                  path="/"
                  render={() => (
                    <h3 className="act-name">{`${act.name_first} ${act.name_last ? act.name_last : ''}`}</h3>
                )}
                />
              </Switch>
            </ActTile>
          );
        }
      }
      return result;
    };

    const actsArr = buildTiles();
    return (
      <div>
        <Searchbar
          value={this.state.searchText}
          handleChange={this.handleSearchChange}
        />
        <div className={classes.wrapper} ref={this.wrapperRef}>
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


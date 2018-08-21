import React, { Component, StrictMode, Fragment } from 'react';
import { findDOMNode } from 'react-dom';
import { Route, Redirect } from 'react-router';
import injectSheet from 'react-jss';
import shortId from 'shortid';
import PropTypes from 'prop-types';
import ActTile from './components/ActTile';
import DateList from './components/DateList';
import Searchbar from './components/Searchbar';

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
    super(props);

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

    this.handleTileClick = this.handleTileClick.bind(this);
    this.wrapperRef = React.createRef();
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.trackScrolling = this.trackScrolling.bind(this);
    this.setTileRef = (node) => {
      if (node) {
        const { id } = node.props;
        const key = `tileRef${id}`;
        this[key] = node;
        this[`${key}HandleClickOutside`] = this.handleClickOutside(id).bind(this);
      }
    };
  }

  componentDidMount() {
    document.addEventListener('scroll', this.trackScrolling);
    this.setState(this.props.data);
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
  }

  trackScrolling() {
    function isBottom(el) {
      return el.getBoundingClientRect().bottom <= window.innerHeight;
    }

    const wrappedElement = this.wrapperRef.current;
    if (isBottom(wrappedElement)) {
      document.removeEventListener('scroll', this.trackScrolling);
      this.setState(prevState => ({
        endIndex: prevState.endIndex + 10
      }));
      document.addEventListener('scroll', this.trackScrolling);
    }
  }
  
  handleClickOutside(id) {
    return (e) => {
      console.log('hco', id, e)
      const key = `tileRef${id}`;
      const node = findDOMNode(this[key]);
      if (node && !node.contains(e.target)) {
        document.removeEventListener('click', this[`${key}HandleClickOutside`]);
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
    console.log('active state', this.state.actTileUi[id].active)
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
    console.log('this', this)
    const { classes } = this.props;
    if (this.state.redirectHome) return <Redirect to="/" />;
    const actsArr = [];

    if (this.state.cachedData && this.state.cachedData.acts) {
      const lastIndex = this.state.endIndex < this.state.actKeysReordered.length ? this.state.endIndex : this.state.actKeysReordered.length;
      for (let i = 0; i < lastIndex; i++) {
        const act = this.state.cachedData.acts[this.state.actKeysReordered[i]];
        actsArr.push(
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
            <Route
              path="/datelist/:id"
              children={({ match }) => {
                const id = match && parseInt(match.params.id);
                return (
                  <Fragment key={shortId.generate()}>
                    {id === act.id ?
                      <DateList
                        id={act.id}
                        dates={this.state.datesTable[act.id]}
                        name_first={act.name_first}
                        name_last={act.name_last ? act.name_last : ''}
                      /> :
                        <h3 className="act-name">
                          {`${act.name_first} ${act.name_last ? act.name_last : ''}`}
                        </h3>
                    }
                  </Fragment>
                );
              }}
            />
          </ActTile>);
      }
    }
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
    )
  }
}

export default injectSheet(styles)(App);

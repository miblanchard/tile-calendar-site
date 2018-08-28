
import React, { Component, Fragment } from 'react';
import { findDOMNode } from 'react-dom';
import { Route, Redirect } from 'react-router';
import injectSheet from 'react-jss';
import shortId from 'shortid';
import PropTypes from 'prop-types';
import ActTile from './components/ActTile';
import DateList from './components/DateList';
import Searchbar from './components/Searchbar';
import { banner, bannerInner, globalStyles, wrapper } from './styles/styles';

// TODO post mvp
/*
  Add needsUpdated images and twitter handles
  Serve image assets
  Lazy load actTiles
  Link to twitter acct in actTile
  Keep empty tiles at bottom of feed
  Favicon
*/

/*
  still experimenting with ways to make jss more readable/maintainable.  tried making an external
  stylesheet that I import from but that precludes theme injection, settled on a mix of the 2.
  possibility for writing an npm package that does this cleanly?
*/
const styles = theme => ({
  '@global': {
    ...globalStyles,
    body: {
      ...globalStyles.body,
      'background-color': theme.palette.grey.light
    }
  },
  banner: {
    ...banner,
    color: theme.text.color.white,
    'text-shadow': theme.text.shadow,
    'box-shadow': `0 4px 2px -2px ${theme.palette.grey.main}`
  },
  bannerInner: {
    ...bannerInner,
  },
  wrapper: {
    ...wrapper
  },
});


class App extends Component {
  // set initial state
  static getDerivedStateFromProps(props, state) {
    if (props.data && props.data.cachedData !== state.cachedData) {
      return {
        cachedData: props.data.cachedData,
        actMap: props.data.actMap,
        actTileUi: props.data.actTileUi,
        datesTable: props.data.datesTable,
        actKeysReordered: props.data.actKeysReordered,
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      cachedData: null,
      actMap: [],
      actTileUi: {},
      datesTable: {},
      actKeysReordered: [],
      searchText: '',
      redirectHome: false,
      searching: false,
      endIndex: 12
    };

    this.handleTileClick = this.handleTileClick.bind(this);
    this.rootRef = React.createRef();
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.trackScrolling = this.trackScrolling.bind(this);
    /*
      this.setTileRef creates the handlers for each actTile so listeners can be added and removed
      based on what tile is active
    */
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
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.redirectHome) {
      this.setState({ // eslint-disable-line
        // controls react-router's <Redirect />
        redirectHome: false
      });
    }
  }

  componentWillUnmount() {
    for (let i = 0; i < this.state.actMap.length; i++) {
      const func = `tileRef${i}HandleClickOutside`;
      document.removeEventListener('click', this[func]);
    }
    document.removeEventListener('scroll', this.trackScrolling);
  }

  trackScrolling() {
    /*
      adds new tiles to page when fired
      atm all acts are loaded into state on mount, so for now this isn't triggering any AJAX calls,
      just changing the view
    */
    function isBottom(el) {
      return el.getBoundingClientRect().bottom - 426 <= window.innerHeight;
    }

    const wrappedElement = this.rootRef.current;
    if (isBottom(wrappedElement) && !this.state.searching) {
      document.removeEventListener('scroll', this.trackScrolling);
      this.setState(prevState => ({
        endIndex: prevState.endIndex + 10 < this.state.actKeysReordered.length
          ? prevState.endIndex + 10
          : this.state.actKeysReordered.length
      }));
      document.addEventListener('scroll', this.trackScrolling);
    }
  }

  handleClickOutside(id) {
    // detect if a click is inside (do nothing) or outside (set state) the active tile
    return (e) => {
      const key = `tileRef${id}`;
      const node = findDOMNode(this[key]); // eslint-disable-line
      if (node && !node.contains(e.target)) {
        document.removeEventListener('click', this[`${key}HandleClickOutside`]);
        let redirectHome = false;
        if (this.rootRef.current.contains(e.target)) {
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
    /*
      handler passed to onChange in the search bar
      updates the actTileUi object "display" attributes based on input value
    */
    const { currentTarget } = e;
    const matches = [];
    const notMatches = [];
    let searching = true;
    if (currentTarget.value === '') {
      searching = false;
    }
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
        actTileUi,
        searching
      };
    });
  }

  handleTileClick(id) {
    /*
      when a tile is clicked, add a listener for a click somewhere else on the page, then set
      active to true for that act's id key in this.state.actTileUi
    */
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
    const actsArr = [];


    if (this.state.cachedData && this.state.cachedData.acts) {
      let lastIndex = !this.state.searching && this.state.endIndex;
      lastIndex = lastIndex || this.state.actKeysReordered.length;
      for (let i = 0; i < lastIndex; i++) {
        const act = this.state.cachedData.acts[this.state.actKeysReordered[i]];
        actsArr.push( // eslint-disable-line
          <ActTile
            key={act.id}
            ref={this.setTileRef}
            id={act.id}
            active={this.state.actTileUi[act.id].active}
            display={this.state.actTileUi[act.id].display}
            nameFirst={act.name_first}
            headshotUrl={act.headshot_url}
            handleClick={this.handleTileClick}
          >
            <Route
              path="/datelist/:id"
              children={({ match }) => {
                const id = match && parseInt(match.params.id); // eslint-disable-line
                return (
                  <Fragment key={shortId.generate()}>
                    {id === act.id ?
                      <DateList
                        id={act.id}
                        dates={this.state.datesTable[act.id]}
                        nameFirst={act.name_first}
                        nameLast={act.name_last ? act.name_last : ''}
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
      <div ref={this.rootRef}>
        <div className={classes.banner}>
          <div className={classes.bannerInner}>
            <h1 style={{ margin: 0, paddingTop: '1rem' }}>NYC Comedy Calendar</h1>
            <p>
              Maddie writing copy TBD
              Lorem Ipsum yada yada yada
              Lorem Ipsum yada yada yada
              Lorem Ipsum yada yada yada
            </p>
            <Searchbar
              value={this.state.searchText}
              handleChange={this.handleSearchChange}
            />
          </div>
        </div>
        <div className={classes.wrapper}>
          {actsArr}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  // eslint-disable-next-line
  data: PropTypes.object,

  // jss
  // eslint-disable-next-line
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(App);

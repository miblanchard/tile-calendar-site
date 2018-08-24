import React, { Component, Fragment } from 'react';
import { findDOMNode } from 'react-dom';
import { Route, Redirect } from 'react-router';
import injectSheet from 'react-jss';
import shortId from 'shortid';
import PropTypes from 'prop-types';
import ActTile from './components/ActTile';
import DateList from './components/DateList';
import Searchbar from './components/Searchbar';
// import Banner from './components/Banner';
import { globalStyles, wrapper } from './styles/styles';

const styles = theme => ({
  '@global': globalStyles,
  wrapper,
});


class App extends Component {
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
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.redirectHome) {
      this.setState({ // eslint-disable-line
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
    function isBottom(el) {
      return el.getBoundingClientRect().bottom <= window.innerHeight;
    }

    const wrappedElement = this.wrapperRef.current;
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
    return (e) => {
      const key = `tileRef${id}`;
      const node = findDOMNode(this[key]); // eslint-disable-line
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
            name_first={act.name_first}
            name_last={act.name_last}
            headshot_url={undefined}
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
      <div ref={this.wrapperRef}>
        <div id="banner">
          <h1>NYC Comedy Calendar</h1>
          <Searchbar
            value={this.state.searchText}
            handleChange={this.handleSearchChange}
          />
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

import React, { Component, Fragment } from 'react';
import { findDOMNode } from 'react-dom';
import { Route, Redirect } from 'react-router';
import injectSheet from 'react-jss';
import shortId from 'shortid';
import PropTypes from 'prop-types';
import ActTile from './components/ActTile';
import DateList from './components/DateList';
import Searchbar from './components/Searchbar';
import { globalStyles, wrapper } from './styles/styles';

const styles = theme => ({
  '@global': {
    ...globalStyles,
    body: {
      ...globalStyles.body,
      'background-color': theme.palette.grey.light
    }
  },
  banner: {
    'background-color': '#313131',
    'background-image': `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83zM32 0l12.142 12.142-1.414 1.414L30 .828 17.272 13.556l-1.414-1.414L28 0h4zM.284 0l28 28-1.414 1.414L0 2.544V0h.284zM0 5.373l25.456 25.455-1.414 1.415L0 8.2V5.374zm0 5.656l22.627 22.627-1.414 1.414L0 13.86v-2.83zm0 5.656l19.8 19.8-1.415 1.413L0 19.514v-2.83zm0 5.657l16.97 16.97-1.414 1.415L0 25.172v-2.83zM0 28l14.142 14.142-1.414 1.414L0 30.828V28zm0 5.657L11.314 44.97 9.9 46.386l-9.9-9.9v-2.828zm0 5.657L8.485 47.8 7.07 49.212 0 42.143v-2.83zm0 5.657l5.657 5.657-1.414 1.415L0 47.8v-2.83zm0 5.657l2.828 2.83-1.414 1.413L0 53.456v-2.83zM54.627 60L30 35.373 5.373 60H8.2L30 38.2 51.8 60h2.827zm-5.656 0L30 41.03 11.03 60h2.828L30 43.858 46.142 60h2.83zm-5.656 0L30 46.686 16.686 60h2.83L30 49.515 40.485 60h2.83zm-5.657 0L30 52.343 22.343 60h2.83L30 55.172 34.828 60h2.83zM32 60l-2-2-2 2h4zM59.716 0l-28 28 1.414 1.414L60 2.544V0h-.284zM60 5.373L34.544 30.828l1.414 1.415L60 8.2V5.374zm0 5.656L37.373 33.656l1.414 1.414L60 13.86v-2.83zm0 5.656l-19.8 19.8 1.415 1.413L60 19.514v-2.83zm0 5.657l-16.97 16.97 1.414 1.415L60 25.172v-2.83zM60 28L45.858 42.142l1.414 1.414L60 30.828V28zm0 5.657L48.686 44.97l1.415 1.415 9.9-9.9v-2.828zm0 5.657L51.515 47.8l1.414 1.413 7.07-7.07v-2.83zm0 5.657l-5.657 5.657 1.414 1.415L60 47.8v-2.83zm0 5.657l-2.828 2.83 1.414 1.413L60 53.456v-2.83zM39.9 16.385l1.414-1.414L30 3.658 18.686 14.97l1.415 1.415 9.9-9.9 9.9 9.9zm-2.83 2.828l1.415-1.414L30 9.313 21.515 17.8l1.414 1.413 7.07-7.07 7.07 7.07zm-2.827 2.83l1.414-1.416L30 14.97l-5.657 5.657 1.414 1.415L30 17.8l4.243 4.242zm-2.83 2.827l1.415-1.414L30 20.626l-2.828 2.83 1.414 1.414L30 23.456l1.414 1.414zM56.87 59.414L58.284 58 30 29.716 1.716 58l1.414 1.414L30 32.544l26.87 26.87z' fill='%23f9f9f9' fill-opacity='0.64' fill-rule='evenodd'/%3E%3C/svg%3E")`,
    'margin-bottom': '2rem',
    height: 'auto',
    color: theme.text.color.white,
    'text-shadow': theme.text.shadow,
    'box-shadow': `0 4px 2px -2px ${theme.palette.grey.main}`

  },
  bannerInner: {
    height: '100%',
    'background-color': 'rgba(0, 0, 0, 0.25)',
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'space-between',
    'text-align': 'center'
  },
  searchBar: {
    'margin-bottom': '2rem',
  },
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
      endIndex: 12
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
      return el.getBoundingClientRect().bottom - 426 <= window.innerHeight;
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
      <div ref={this.wrapperRef}>
        <div className={classes.banner}>
          <div className={classes.bannerInner}>
            <h1 style={{ margin: 0, paddingTop: '1rem' }}>NYC Comedy Calendar</h1>
            <p>
              Lorem Ipsum yada yada yada
              Lorem Ipsum yada yada yada
              Lorem Ipsum yada yada yada
            </p>
            <Searchbar
              searchInputRef={this.searchInputRef}
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

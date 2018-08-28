
import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { searchBar, searchLabel, searchWrapper } from '../styles/styles';

const styles = {
  searchWrapper: {
    ...searchWrapper,
  },
  searchLabel: {
    ...searchLabel,
  },
  searchBar: {
    ...searchBar,
  }
};

class Searchbar extends PureComponent {
  constructor(props) {
    super(props);

    this.searchInputRef = React.createRef();
  }

  componentDidMount() {
    /*
      this prevents the searchbar from losing focus when clicking on it also closes an open actTile
      (redirects to '/')

      it feels hacky, creating so many refs in <App /> also feels like bad practice, better way to
      refactor?
    */
    this.searchInputRef.current.focus();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.searchWrapper}>
        <label htmlFor="text-input" className={classes.searchLabel}>
        SEARCH FOR COMEDIAN
        <input
          ref={this.searchInputRef}
          className={classes.searchBar}
          id="text-input"
          type="text"
          value={this.props.value}
          onChange={this.props.handleChange}
        />
        </label>
      </div>
    );
  }
}

Searchbar.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,

  // jss
  // eslint-disable-next-line
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(Searchbar);

import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { searchBar } from '../styles/styles';

const styles = {
  searchWrapper: {
    'margin-bottom': '2rem',
  },
  searchLabel: {
    display: 'block',
    padding: '0.5rem'
  },
  searchBar: {
    ...searchBar,
    display: 'block',
    margin: 'auto',
    'margin-top': '1rem'
  }
};

const Searchbar = (props) => {
  const { classes } = props;
  return (
    <div className={classes.searchWrapper}>
      <label htmlFor="text-input" className={classes.searchLabel}>
        SEARCH FOR COMEDIAN
        <input
          className={classes.searchBar}
          id="text-input"
          type="text"
          value={props.value}
          onChange={props.handleChange}
        />
      </label>
    </div>
  );
};

Searchbar.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,

  // jss
  // eslint-disable-next-line
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(Searchbar);

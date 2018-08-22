import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { textInput, inputButton } from '../styles/styles';

const styles = {
  'text-input': textInput,
  'input-button': inputButton
};

const Searchbar = (props) => {
  const { classes } = props;
  return (
    <label>
      Search for comedian:&nbsp;
      <input className={classes['text-input']} type="text" value={props.value} onChange={props.handleChange} />
    </label>
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

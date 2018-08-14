import React from 'react';
import injectSheet from 'react-jss';

const styles = {
  'text-input': {
    padding: '0.3rem 0.5rem',
    background: 'rgba(50, 50, 50, 0.2)',
    border: '0px solid #dbdbdb',
  },
  'input-button': {
    position: 'relative',
    padding: '0.25rem 0.5rem',
    margin: '1rem 0 0 1rem',
    border: '2px solid #16568d',
    'background-color': '#16568d',
    color: '#fafafa',
    '&:hover': {
      'background-color': '#fafafa',
      color: '#16568d',
    }
  }
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

export default injectSheet(styles)(Searchbar);

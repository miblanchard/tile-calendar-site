import React from 'react';
import injectSheet from 'react-jss';
import classNames from 'classnames';
import days from '../utils/maps/days';
import months from '../utils/maps/months';

const styles = {
  'date-list-item': {
    'border-top': '1px solid #f9f9f9',
    padding: '1em 2em',
    position: 'relative',
    'font-size': '0.8rem',
    'font-weight': '700',
    color: '#f9f9f9',
    'background-color': 'black',
    width: '100%',
    display: 'flex',
    'justify-content': 'center',
    'box-sizing': 'border-box'
  },
  'date-list-day': {
    margin: 'auto',
  },
  day: {

  }
}

const DateListDay = (props) => {
  const { classes } = props;
  const date = new Date(props.dateTime);
  
  return (
    <li className={classes['date-list-item']}
    >
      <p className={classes['date-list-day']}>
        {`${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`}
      </p>
    </li>
  );
};

export default injectSheet(styles)(DateListDay);

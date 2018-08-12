import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

const styles = {
  'date-list-item': {
    position: 'relative',
    height: '2em',
    'font-size': '0.75rem',
    'border-bottom': '1px solid #f2f2f2',
  },
  venue: {
    position: 'absolute',
    width: '80%',
    display: 'inline-block',
    'text-align': 'left',
    'margin-top': '0.2rem'
  },
  time: {
    position: 'absolute',
    left: '80%',
    width: '20%'
  }
};

const DateListItem = props => (
  <li className={props.classes['date-list-item']}>
    <h3 className={props.classes.venue}>{props.venue}</h3>
    <time className={props.classes.time} dateTime={props.dateTime}>{props.showTime}</time>
  </li>
);

DateListItem.propTypes = {
  // itemStyle: PropTypes.shape({
  //   display: PropTypes.string.isRequired
  // }).isRequired,
  dateTime: PropTypes.string.isRequired,
  showTime: PropTypes.string.isRequired,
  venue: PropTypes.string.isRequired
};

export default injectSheet(styles)(DateListItem);

import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

const styles = {
  'date-list-item': {
    'border-top': '1px solid #f9f9f9',
    // padding: '0.2rem',
    position: 'relative',
    'font-size': '0.75rem',
    color: '#f9f9f9'
  },
  venue: {
    width: '75%',
    'margin-top': '1rem',
    display: 'inline-block',
    'padding-left': '0.5rem'
  },
  time: {
    width: '25%',
    position: 'absolute',
    display: 'inline-block',
    left: '75%',
    'text-align': 'right',
    'padding-right': '0.5rem',
    margin: '1rem auto',
    'box-sizing': 'border-box'
  }
};

const DateListItem = (props) => {
  const rowStyle = props.index % 2 ? { backgroundColor: 'rgba(255, 255, 255, 0.15)' } : { backgroundColor: 'none' };
  return (
    <a href={props.link} target="_blank">
      <li className={props.classes['date-list-item']} style={rowStyle}>
        <p className={props.classes.venue}>{props.venue}</p>
        <p className={props.classes.time}>
          <time dateTime={props.dateTime}>
            {props.showTime}
          </time>
        </p>
      </li>
    </a>
  );
};

// DateListItem.propTypes = {
//   // itemStyle: PropTypes.shape({
//   //   display: PropTypes.string.isRequired
//   // }).isRequired,
//   dateTime: PropTypes.string.isRequired,
//   showTime: PropTypes.string.isRequired,
//   venue: PropTypes.string.isRequired
// };

export default injectSheet(styles)(DateListItem);

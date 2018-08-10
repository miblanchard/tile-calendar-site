import React from 'react';
import PropTypes from 'prop-types';

const DateListItem = props => (
  <li style={props.itemStyle}>
    <h3>{props.venue}</h3>
    <time dateTime={props.dateTime}>{props.showTime}</time>
  </li>
);

DateListItem.propTypes = {
  itemStyle: PropTypes.shape({
    display: PropTypes.string.isRequired
  }).isRequired,
  dateTime: PropTypes.string.isRequired,
  showTime: PropTypes.string.isRequired,
  venue: PropTypes.string.isRequired
};

export default DateListItem;

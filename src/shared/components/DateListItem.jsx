import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { dateListItem, venue, time } from '../styles/styles';

const styles = theme => ({
  'date-list-item': {
    ...dateListItem,
    'border-top': `1px solid ${theme.text.color.white}`,
    'font-size': theme.text.size.main,
    color: theme.text.color.white,
    '&:hover': {
      color: theme.palette.grey.light
    }
  },
  venue: {
    ...venue,
  },
  time: {
    ...time,
  }
});


// clickable link that displays 1 gig -- Club Name & Time, gigs are grouped by date inside parent
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

DateListItem.propTypes = {
  index: PropTypes.number.isRequired,
  link: PropTypes.string.isRequired,
  dateTime: PropTypes.string.isRequired,
  showTime: PropTypes.string.isRequired,
  venue: PropTypes.string.isRequired,

  // jss
  // eslint-disable-next-line
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(DateListItem);

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
const DateListItem = ({ classes, index, link, dateTime, showTime, venueName }) => {
  const rowStyle = index % 2 ? { backgroundColor: 'rgba(255, 255, 255, 0.15)' } : { backgroundColor: 'none' };
  return (
    <a href={link} target="_blank">
      <li className={classes['date-list-item']} style={rowStyle}>
        <p className={classes.venue}>{venueName}</p>
        <p className={classes.time}>
          <time dateTime={dateTime}>
            {showTime}
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
  venueName: PropTypes.string.isRequired,

  // jss
  // eslint-disable-next-line
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(DateListItem);

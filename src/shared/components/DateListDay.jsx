import React from 'react';
import injectSheet from 'react-jss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import days from '../utils/maps/days';
import months from '../utils/maps/months';
import { dateListItem, dateListDay, day } from '../styles/styles';

const styles = theme => ({
  'date-list-item': {
    ...dateListItem,
    'border-top': `1px solid ${theme.text.color.white}`,
    color: theme.text.color.white,
  },
  'date-list-day': {
    ...dateListDay,
  },
  day: {
    ...day,
  }
});

// day seperator for a datelist
const DateListDay = (props) => {
  const { classes } = props;
  const date = new Date(props.dateTime);

  return (
    <li className={classNames(classes['date-list-item'], classes['date-list-day'])} >
      <p className={classes.day}>
        {`${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`}
      </p>
    </li>
  );
};

DateListDay.propTypes = {
  dateTime: PropTypes.string.isRequired,

  // jss
  // eslint-disable-next-line
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(DateListDay);

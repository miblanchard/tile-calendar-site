import React from 'react';
import classNames from 'classnames';

const DateListDay = (props) => {
  const { classes } = props;
  return (
    <li className={classNames(
      classes['date-list-item'],
      classes['date-list-day']
      )}
    >
      <p className={classes.day}>Day</p>
    </li>
  );
};

export default DateListDay;

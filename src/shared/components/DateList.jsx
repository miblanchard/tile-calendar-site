import React from 'react';
import injectSheet from 'react-jss';
import shortId from 'shortid';
import PropTypes from 'prop-types';
import DateListItem from './DateListItem';
import DateListDay from './DateListDay';
import getTime from '../utils/getTime'; // TODO: refactor aliases for ssr
import clubs from '../utils/maps/clubs';
import { dateListRoot, dateListWrapper, actNameDateList } from '../styles/styles';

const styles = {
  'date-list-root': dateListRoot,
  'date-list-wrapper': dateListWrapper,
  'act-name-date-list': actNameDateList
};

// generates a datelist that is displayed when a tile is clicked on
const DateList = (props) => {
  const { classes, dates } = props;
  const datesKeys = Object.keys(dates);
  const datesArr = [];

  for (let i = 0; i < datesKeys.length; i++) {
    datesArr.push(<DateListDay key={shortId.generate()} dateTime={datesKeys[i]} />);
    for (let j = 0; j < dates[datesKeys[i]].length; j++) {
      const time = new Date(dates[datesKeys[i]][j].date);
      const showTime = getTime(time);
      datesArr.push( // eslint-disable-line
        <DateListItem
          key={shortId.generate()}
          dateTime={dates[datesKeys[i]][j].date}
          link={dates[datesKeys[i]][j].link}
          showTime={showTime}
          venue={clubs[dates[datesKeys[i]][j].venueid]}
          index={j}
        />
      ); // eslint-disable-line
    }
  }

  return (
    <div className={classes['date-list-root']}>
      <h3 className={classes['act-name-date-list']}>{`${props.nameFirst} ${props.nameLast}`} </h3>
      <ul className={classes['date-list-wrapper']}>
        {datesArr}
      </ul>
    </div>
  );
};

DateList.propTypes = {
  nameFirst: PropTypes.string.isRequired,
  nameLast: PropTypes.string.isRequired,
  dates: PropTypes.objectOf(PropTypes.array).isRequired,

  // jss
  // eslint-disable-next-line
  classes: PropTypes.object.isRequired,
};

// export default injectSheet(styles)(DateList);
export default injectSheet(styles)(DateList);

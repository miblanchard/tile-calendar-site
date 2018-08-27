import React, { Fragment } from 'react';
import injectSheet from 'react-jss';
import shortId from 'shortid';
import PropTypes from 'prop-types';
import DateListItem from './DateListItem';
import DateListDay from './DateListDay';
import getTime from '../utils/getTime'; // TODO: refactor aliases for ssr
import clubs from '../utils/maps/clubs';
import { dateListRoot, dateListItem, dateListWrapper, actNameDateList } from '../styles/styles';

const styles = theme => ({
  'date-list-root': {
    ...dateListRoot,
  },
  'date-list-item': {
    ...dateListItem,
    'border-top': `1px solid ${theme.text.color.white}`,
    color: theme.text.color.white
  },
  'date-list-wrapper': {
    ...dateListWrapper,
    '&:last-child': {
      'border-bottom': `1px solid ${theme.text.color.white}`,
    }
  },
  'act-name-date-list': {
    ...actNameDateList,
    color: theme.text.color.white,
    'text-shadow': theme.text.shadow
  }
});

// generates a datelist that is displayed when a tile is clicked on
const DateList = ({ classes, nameFirst, nameLast, dates }) => {
  const datesKeys = Object.keys(dates);
  const content = datesKeys.map((dateTime) => {
    const day = dates[dateTime].map((gig, i) => {
      const time = new Date(gig.date);
      const showTime = getTime(time);
      return (<DateListItem
        key={`${gig.date}${gig.venueid}`}
        dateTime={gig.date}
        link={gig.link}
        showTime={showTime}
        venueName={clubs[gig.venueid]}
        index={i}
      />
      );
    });
    return (
      <Fragment key={dateTime}>
        <DateListDay dateTime={dateTime} />
        {day}
      </Fragment>
    );
  });

  return (
    <div className={classes['date-list-root']}>
      <h3 className={classes['act-name-date-list']}>{`${nameFirst} ${nameLast}`} </h3>
      <ul className={classes['date-list-wrapper']}>
        {content.length
          ? content
          : <div
            key="NA"
            className={classes['date-list-item']}
            style={{ padding: '0.6rem' }}
          >
              No dates are available at this time.
            </div>}
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

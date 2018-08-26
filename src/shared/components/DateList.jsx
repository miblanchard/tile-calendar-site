import React from 'react';
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
const DateList = (props) => {
  const { classes, dates } = props;
  const datesKeys = Object.keys(dates);
  const content = [];

  for (let i = 0; i < datesKeys.length; i++) {
    content.push(<DateListDay key={shortId.generate()} dateTime={datesKeys[i]} />);
    for (let j = 0; j < dates[datesKeys[i]].length; j++) {
      const time = new Date(dates[datesKeys[i]][j].date);
      const showTime = getTime(time);
      content.push( // eslint-disable-line
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

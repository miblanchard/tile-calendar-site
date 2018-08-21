import React, { Fragment } from 'react';
import injectSheet from 'react-jss';
import classNames from 'classnames';
import shortId from 'shortid';
import PropTypes from 'prop-types';
import DateListItem from './DateListItem';
import DateListDay from './DateListDay';
import getTime from '../utils/getTime'; // refactor aliases for ssr
import clubs from '../utils/maps/clubs';

const styles = {
  'datelist-root': {
    width: '100%',
    height: '100%',
    'z-index': 2,
    // margin: '20px',
    'border-radius': '0.2rem',
    border: '2px solid #f9f9f9',
    overflow: 'scroll',
  },
  'datelist-wrapper': {
    width: '100%',
    // height: '100%',
    padding: 0,
    'margin-top': 0,
    '&:last-child': {
      'border-bottom': '1px solid #f9f9f9'
    }
  },
  'act-name-datelist': {
    'background-color': 'black',
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center',
    border: 'none',
    position: 'sticky',
    top: 0,
    'text-shadow': [
      ['1px', '1px', '#000'],
      ['-1px', '-1px', '#000'],
      ['-1px', '1px', '#000'],
      ['1px', '-1px', '#000']
    ],
    color: '#f9f9f9',
    padding: '0.25rem 1rem',
    margin: 'auto',
    'z-index': 2,
  }
};

const DateList = (props) => {
  const { classes, dates } = props;
  const datesKeys = Object.keys(dates);
  const datesArr = [];

  for (let i = 0; i < datesKeys.length; i++) {
    datesArr.push(<DateListDay key={shortId.generate()} dateTime={datesKeys[i]} />);
    for (let j = 0; j < dates[datesKeys[i]].length; j++) {
      const time = new Date(dates[datesKeys[i]][j].date);
      const showTime = getTime(time);
      datesArr.push(
        <DateListItem
          key={shortId.generate()}
          dateTime={dates[datesKeys[i]][j].date}
          link={dates[datesKeys[i]][j].link}
          showTime={showTime}
          venue={clubs[dates[datesKeys[i]][j].venueid]}
          index={j}
        />
      );
    }
  }

  return (
    <div className={classes['datelist-root']}>
      <h3 className={classes['act-name-datelist']}>{`${props.name_first} ${props.name_last}`} </h3>
      <ul className={classes['datelist-wrapper']}>
        {datesArr}
      </ul>
    </div>
  );
};

// DateList.propTypes = {
//   // passed from parent
//   id: PropTypes.number.isRequired,
//   dates: PropTypes.arrayOf(PropTypes.shape({
//     venueid: PropTypes.number.isRequired,
//     date: PropTypes.string.isRequired
//   }).isRequired).isRequired,

//   // jss
//   // eslint-disable-next-line
//   classes: PropTypes.object.isRequired,

//   // state
//   ui: PropTypes.objectOf(PropTypes.number).isRequired,

//   // dispatch
//   expandDates: PropTypes.func.isRequired
// };

export default injectSheet(styles)(DateList);

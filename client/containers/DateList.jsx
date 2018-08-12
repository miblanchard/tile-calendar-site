import React, { Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import shortId from 'shortid';
import PropTypes from 'prop-types';
import DateListItem from '../components/DateListItem';
import getTime from '../utils/getTime'; // refactor aliases for ssr
import { expandDates } from '../redux/modules/ui';

const styles = {
  root: {},
  'drop-down-btn': {
    backgroundColor: '#f9f9f9',
    opacity: 0.5
  },
  datelist: {
    'max-height': '4rem',
    overflow: 'scroll',
    padding: 0,
    margin: 0
  },
  'datelist-header': {
    'text-align': 'center',
    'margin-bottom': '0.2rem',
  },
  'datelist-wrapper': {
    border: '1px solid #f2f2f2',
    'border-radius': '0.1rem',
    // color: '#555555',
    overflow: 'hidden',
  }
};

const mapStateToProps = store => ({
  ui: store.ui,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({ expandDates }, dispatch)
);

const DateList = (props) => {
  // this is meant to be a placeholder while formatting, obv need to refactor this later
  const clubsTemp = [
    null,
    'Comedy Cellar',
    'Village Underground',
    'Fat Black Pussycat'
  ];

  const { classes, dates } = props;

  const datesArr = props.dates.map((date, i) => {
    const dateTime = new Date(date.date);
    const showTime = getTime(dateTime);
    const instanceIndex = `datesOpenIndex${props.id}`;
    const index = props.ui[instanceIndex] ? props.ui[instanceIndex] : 1;
    const itemStyle = i <= index ? { display: 'list-item' } : { display: 'none' };

    return (
      <DateListItem
        key={shortId.generate()}
        itemStyle={itemStyle}
        dateTime={date.date}
        showTime={showTime}
        venue={clubsTemp[date.venueid]}
      />
    );
  });

  return (
    <Fragment>
      <h2 className={classes['datelist-header']}>Upcoming Shows</h2>
      <div className={classes['datelist-wrapper']}>
        <ul className={classes.datelist}>
          {datesArr}
          {/* <button
            className={classes['drop-down-btn']}
            onClick={() => props.expandDates(dates.length, props.id)}
            type="button"
            >
            <i className="material-icons"> arrow_drop_down </i>
          </button> */}
        </ul>
      </div>
    </Fragment>
  );
};

DateList.propTypes = {
  // passed from parent
  id: PropTypes.number.isRequired,
  dates: PropTypes.arrayOf(PropTypes.shape({
    venueid: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired
  }).isRequired).isRequired,

  // jss
  // eslint-disable-next-line
  classes: PropTypes.object.isRequired,

  // state
  ui: PropTypes.objectOf(PropTypes.number).isRequired,

  // dispatch
  expandDates: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(injectSheet(styles)(DateList));

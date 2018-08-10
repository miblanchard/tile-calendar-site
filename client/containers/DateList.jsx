import React, { Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import shortId from 'shortid';
import DateListItem from '../components/DateListItem';
import getTime from '../utils/getTime'; // refactor aliases for ssr
import { expandDates } from '../redux/modules/ui';

const styles = {
  root: {},
  'drop-down-btn': {
    backgroundColor: '#f9f9f9',
    opacity: 0.5
  }
};

const mapStateToProps = store => ({
  ui: store.ui,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({ expandDates }, dispatch)
);

const DateList = (props) => {
  console.log(props)
  // this is meant to be a placeholder while formatting, obv need to refactor this later
  const clubsTemp = [
    null,
    'Comedy Cellar',
    'Village Underground',
    'Fat Black Pussycat'
  ];

  const datesArr = props.dates.map((date, i) => {
    const dateTime = new Date(date.date);
    const showTime = getTime(dateTime);
    const itemStyle = i < props.ui.datesOpenIndex ? { display: 'list-item' } : { display: 'none' };
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
      <h2>Upcoming Shows</h2>
      <ul>
        {datesArr}
        <button className={props.classes['drop-down-btn']} onClick={() => props.expandDates(props.dates.length)} type="button" >
          <i className="material-icons"> arrow_drop_down </i>
        </button>
      </ul>
    </Fragment>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(injectSheet(styles)(DateList));

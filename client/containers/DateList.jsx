import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import shortId from 'shortid';
import DateListItem from '../components/DateListItem';
import getTime from '../utils/getTime'; // refactor aliases for ssr
import * as actions from '../actions/actions';

const styles = {
  root: {},
  'drop-down-btn': {
    backgroundColor: '#000000',
    opacity: 0.5
  }
};

const mapStateToProps = store => ({
  ui: store.ui,

});

const mapDispatchToProps = dispatch => ({
  expandDates: (currentLength) => {
    dispatch(actions.expandDates(currentLength));
  },
});

class DateList extends Component {

  render() {
    console.log(this.props)
    // this is meant to be a placeholder while formatting, obv need to refactor this later
    const clubsTemp = [
      null,
      'Comedy Cellar',
      'Village Underground',
      'Fat Black Pussycat'
    ];
  
    const datesArr = this.props.dates.map((date, i) => {
      const dateTime = new Date(date.date);
      const showTime = getTime(dateTime);
      const itemStyle = i < this.props.ui.datesOpenIndex ? { display: 'list-item' } : { display: 'none' };
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
          <button className={this.props.classes['drop-down-btn']} onClick={() => this.props.expandDates(this.props.dates.length)} type="button" >
            <i className="material-icons"> arrow_drop_down </i>
          </button>
        </ul>
      </Fragment>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(injectSheet(styles)(DateList));

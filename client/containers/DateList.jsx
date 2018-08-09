import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import shortId from 'shortid';
import getTime from '../utils/getTime'; // figure out aliases with ssr
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
  expandDates: () => {
    dispatch(actions.expandDates());
  },
});

class DateList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayKey: [],
    };
  }

  render() {
    console.log(this.props)
    // this is meant to be a placeholder while formatting, obv need to refactor this later
    const clubsTemp = [
      null,
      'Comedy Cellar',
      'Village Underground',
      'Fat Black Pussycat'
    ];

    const datesArr = this.props.dates.map((date) => {
      const dateTime = new Date(date.date);
      const showTime = getTime(dateTime);
      return (
        // <li style={i > 2 ? {display: 'none'} : {display: 'list-item'}}>
        <Fragment key={shortId.generate()}>
          <li>
            <h3>{clubsTemp[date.venueid]}</h3>
            <time dateTime={date.date}>{showTime}</time>
          </li>
        </Fragment>
      );
    });

    return (
      <Fragment>
        <h2>Upcoming Shows</h2>
        <ul>
          {datesArr}
          <button className={this.props.classes['drop-down-btn']} onClick={this.props.expandDates} type="button" >
            <i className="material-icons"> arrow_drop_down </i>
          </button>
        </ul>
      </Fragment>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(injectSheet(styles)(DateList));

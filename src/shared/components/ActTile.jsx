
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import {
  actTileRoot,
  overlay,
  overlayInactive,
  overlayActive
} from '../styles/styles';

const styles = theme => ({
  'act-tile-root': {
    ...actTileRoot,
    'box-shadow': `4px 4px 2px -2px ${theme.palette.grey.main}`
  },
  overlay: {
    ...overlay,
    '& .act-name': {
      'text-shadow': theme.text.shadow,
      position: 'absolute',
      color: theme.text.color.white,
      border: `1px solid ${theme.text.color.white}`,
      'border-radius': '0.2rem',
      padding: '0.25rem 1rem',
      margin: 'auto',
    },
  },
  overlayInactive: {
    ...overlayInactive,
  },
  overlayActive: {
    ...overlayActive,
  },
});

class ActTile extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.active === nextProps.active) {
      if (this.props.display !== nextProps.display) {
        return true;
      }
      return false;
    }
    return true;
  }

  /*
    ActTile components (as they're implement right now in App.jsx) will always render as a children
    prop, in render() we check to see if:
      1. the component should be displayed (if this.state.searching === true it might not be)
      2. the component is 'active'
        a. if the component is active render it without a <Link> wrapper
  */
  render() {
    if (!this.props.display) return null;

    const { classes } = this.props;
    const content = (
      <div
        className={classNames(classes.overlay, {
          [classes.overlayInactive]: !this.props.active
        })}
      >
        <div
          className={classNames({
            [classes.overlayActive]: this.props.active,
          })}
        />
        <img className="headshot" src={this.props.headshotUrl} alt={`${this.props.nameFirst}`} />
        {this.props.children}
      </div>
    );
    if (!this.props.active) {
      return (
        <div className={classes['act-tile-root']}>
          <Link to={`/datelist/${this.props.id}`} onClick={() => this.props.handleClick(this.props.id)}>
            {content}
          </Link>
        </div>
      );
    }
    return (
      <div className={classes['act-tile-root']}>
        {content}
      </div>
    );
  }
}

ActTile.defaultProps = {
  headshotUrl: 'https://images.vexels.com/media/users/3/140837/isolated/preview/cb26475f9b63061d472be050685600a7-microphone-with-stand-by-vexels.png',
};

ActTile.propTypes = {
  active: PropTypes.bool.isRequired,
  display: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
  nameFirst: PropTypes.string.isRequired,
  headshotUrl: PropTypes.string,
  // eslint-disable-next-line
  children: PropTypes.object.isRequired,

  // jss
  // eslint-disable-next-line
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(ActTile);

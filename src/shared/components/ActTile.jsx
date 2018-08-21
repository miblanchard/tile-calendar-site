import React, { PureComponent } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import classNames from 'classnames';
import injectSheet from 'react-jss';

const styles = theme => ({
  'act-tile-root': {
    'min-width': '280px',
    width: '280px',
    height: 'auto',
    'margin-bottom': '1rem',
    'border-radius': '0.2rem',
    overflow: 'hidden'
  },
  overlay: {
    height: '426px',
    'background-color': 'black',
    position: 'relative',
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'center',
    '& .headshot': {
      position: 'absolute',
      height: '100%',
    },
    '& .act-name': {
      'text-shadow': [
        ['1px', '1px', '#000'],
        ['-1px', '-1px', '#000'],
        ['-1px', '1px', '#000'],
        ['1px', '-1px', '#000']
      ],
      position: 'absolute',
      color: '#f9f9f9',
      border: '1px solid #f9f9f9',
      'border-radius': '0.2rem',
      padding: '0.25rem 1rem',
      margin: 'auto',
    },
  },
  overlayInactive: {
    opacity: 0.8,
    '&:hover': {
      opacity: 1
    },
  },
  overlayActive: {
    position: 'absolute',
    background: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
    'z-index': 1
  },
});

class ActTile extends PureComponent {
  constructor(props) {
    super(props);
  }

  
  render() {
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
        <img className="headshot" src={this.props.headshot_url} alt={`${this.props.name_first}`} onError={(e) => { e.target.src = '../../assets/mic.png'; }} />
        {this.props.children}
      </div>
    );
    if (!this.props.display) return null;
    if (this.props.active) {
      return (
        <div className={classes['act-tile-root']}>
          {content}
        </div>
      ) 
    }
    return (
      <div className={classes['act-tile-root']}>
        <Link to={`/datelist/${this.props.id}`} onClick={() => this.props.handleClick(this.props.id)}>
          {content}
        </Link>
      </div>
    );
  }
};

export default injectSheet(styles)(ActTile);

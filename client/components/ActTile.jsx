import React from 'react';
import injectSheet from 'react-jss';

const styles = theme => ({
  root: {
    '@media (max-width: 600px)': {
      'min-width': '100%',
      height: 'auto',
    },
    overflow: 'scroll',
    '@media (min-width: 601px)': {
      'min-width': '320px',
      height: 'auto',
      margin: 0,
    },
    // '@media (max-width: 601px)': {
    //   width: '',
    //   height: 'auto',
    //   margin: 0,
    // },
    // width: 'calc(100% / 6)',
    height: 'calc(100% / 2)',
    // margin: '1rem',
    margin: '0 0 1rem 0',
    padding: '1rem',
    border: '1px solid #00000036',
    boxShadow: '2px 5px 5px #888888',
    fontFamily: 'Lato',
    fontSize: '0.75rem',
    color: '#f9f9f9',
    letterSpacing: '0.01rem',
    backgroundColor: '#6666ff',
    '& h2': {
      fontWeight: 700,
      fontSize: '1.25rem',
      lineHeight: '1.5rem',
      margin: 0,
    },
    '& h3': {
      fontWeight: 700,
      lineHeight: '0.75rem',
      marginBottom: 0,
    },
  },
  artistHead: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    '& img': {
      // height: 'auto',
      border: '0.2rem ridge',
      borderColor: theme.colorSecondary
    }
  },
  artistBody: {
    margin: 'auto',
  }
});

const ActTile = (props) => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <div className={classes.artistHead}>
        <img src={props.headshot_url} alt={`${props.name_first}`}  />
        <div className={classes.artistName}>
          <h3>{props.name_first}</h3>
          <h2>{props.name_last}</h2>
        </div>
      </div>
      <hr />
      <div className={classes.artistBody}>
        {props.children}
      </div>
    </div>
  );
}

export default injectSheet(styles)(ActTile);

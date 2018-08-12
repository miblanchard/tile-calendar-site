import React from 'react';
import injectSheet from 'react-jss';

const styles = theme => ({
  root: {
    '@media (max-width: 600px)': {
      width: '320px',
      height: 'auto',
      'margin-bottom': '1rem',
      'border-radius': '0.2rem',
      overflow: 'hidden',
    },
    '@media (min-width: 601px)': {
      width: '320px',
      height: 'auto',
      'margin-bottom': '1rem',
      'border-radius': '0.2rem',
      overflow: 'hidden',
    },
  },
  overlay: {
    height: '426px',
    position: 'relative',
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'center',
    '& .headshot': {
      position: 'absolute',
      opacity: 0.75,
      width: '100%',
      height: '100%',
      '&:hover': {
        opacity: 1
      }
    },
    '& .act-name': {
      position: 'absolute',
      color: '#f9f9f9',
      border: '1px solid #f9f9f9',
      'border-radius': '0.2rem',
      padding: '0.25rem 1rem',
      margin: 'auto',
    },

  }
  // root: {
  //   '@media (max-width: 600px)': {
  //     'min-width': '100%',
  //     height: 'auto',
  //   },
  //   overflow: 'scroll',
  //   '@media (min-width: 601px)': {
  //     'min-width': '320px',
  //     height: 'auto',
  //     margin: 0,
  //   },
  //   // '@media (max-width: 601px)': {
  //   //   width: '',
  //   //   height: 'auto',
  //   //   margin: 0,
  //   // },
  //   // width: 'calc(100% / 6)',
  //   height: 'calc(100% / 2)',
  //   // margin: '1rem',
  //   margin: '0 0 1rem 0',
  //   padding: '1rem',
  //   border: '1px solid #00000036',
  //   boxShadow: '2px 5px 5px #888888',
  //   fontFamily: 'Lato',
  //   fontSize: '0.75rem',
  //   color: '#f9f9f9',
  //   letterSpacing: '0.01rem',
  //   backgroundColor: '#6666ff',
  //   '& h2': {
  //     fontWeight: 700,
  //     fontSize: '1.25rem',
  //     lineHeight: '1.5rem',
  //     margin: 0,
  //   },
  //   '& h3': {
  //     fontWeight: 700,
  //     lineHeight: '0.75rem',
  //     marginBottom: 0,
  //   },
  // },
});

const ActTile = (props) => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <a className={classes.overlay} href="#">
        {/* <div className={classes.overlay}> */}
          <img className="headshot" src={props.headshot_url} alt={`${props.name_first}`}  />
          <h3 className="act-name">{`${props.name_first} ${props.name_last}`}</h3>
        {/* </div> */}
      </a>
      {/* <hr />
      <div className={classes.artistBody}>
        {props.children}
      </div> */}
    </div>
  );
}

export default injectSheet(styles)(ActTile);

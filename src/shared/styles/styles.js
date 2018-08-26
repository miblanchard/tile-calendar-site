/* eslint-disable import/prefer-default-export */
const actName = {
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
};

const headshot = {
  position: 'absolute',
  height: '100%',
};

module.exports = {
  globalStyles: {
    body: {
      margin: 0,
      'font-family': 'Lato',
    },
    a: {
      'text-decoration': 'none',
    },
    ul: {
      'list-style': 'none'
    }
  },
  actTileRoot: {
    'min-width': '280px',
    width: '280px',
    height: 'auto',
    margin: '0 1.2rem 2rem',
    'border-radius': '0.5rem',
    overflow: 'hidden',
  },
  actNameDateList: {
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
  },
  dateListDay: {
    padding: '1em 2em',
    'font-size': '0.8rem',
    'font-weight': '700',
    width: '100%',
    display: 'flex',
    'justify-content': 'center',
    'box-sizing': 'border-box',
    'background-color': 'black',
  },
  dateListItem: {
    'border-top': '1px solid #f9f9f9',
    position: 'relative',
    'font-size': '0.75rem',
    color: '#f9f9f9',
  },
  dateListRoot: {
    width: '100%',
    height: '100%',
    'z-index': 2,
    // 'border-radius': '0.2rem',
    // border: '2px solid #f9f9f9',
    overflow: 'scroll',
  },
  dateListWrapper: {
    width: '100%',
    padding: 0,
    'margin-top': 0,
    '&:last-child': {
      'border-bottom': '1px solid #f9f9f9'
    }
  },
  day: {
    margin: 'auto',
  },
  overlay: {
    height: '426px',
    'background-color': 'black',
    position: 'relative',
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'center',
    '& .headshot': headshot,
    '& .act-name': actName,
  },
  overlayActive: {
    position: 'absolute',
    background: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
    'z-index': 1
  },
  overlayInactive: {
    opacity: 0.8,
    '&:hover': {
      opacity: 1
    },
  },
  searchBar: {
    padding: '0.3rem 0.5rem',
    background: 'rgba(200, 200, 200, 0.4)',
    border: '0px solid #dbdbdb',
  },
  time: {
    width: '25%',
    position: 'absolute',
    display: 'inline-block',
    left: '75%',
    'text-align': 'right',
    'padding-right': '0.5rem',
    margin: '1rem auto',
    'box-sizing': 'border-box'
  },
  venue: {
    width: '75%',
    'margin-top': '1rem',
    display: 'inline-block',
    'padding-left': '0.5rem'
  },
  wrapper: {
    display: 'flex',
    flexFlow: 'row wrap',
    height: '100%',
    justifyContent: 'space-around',
    overflow: 'hidden',
    margin: 0
  },
};

/* eslint-disable import/prefer-default-export */

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
    /*
    theme injected attributes in ActTile.jsx
    'box-shadow': `4px 4px 2px -2px ${theme.palette.grey.main}`
    */
  },
  actNameDateList: {
    'background-color': 'black',
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center',
    border: 'none',
    position: 'sticky',
    top: 0,
    padding: '0.25rem 1rem',
    margin: 'auto',
    'z-index': 2,
    /*
    theme injected attributes in DateList.jsx
    color: theme.text.color.white,
    'text-shadow': theme.text.shadow
    */
  },
  banner: {
    'background-color': '#313131',
    'background-image': `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83zM32 0l12.142 12.142-1.414 1.414L30 .828 17.272 13.556l-1.414-1.414L28 0h4zM.284 0l28 28-1.414 1.414L0 2.544V0h.284zM0 5.373l25.456 25.455-1.414 1.415L0 8.2V5.374zm0 5.656l22.627 22.627-1.414 1.414L0 13.86v-2.83zm0 5.656l19.8 19.8-1.415 1.413L0 19.514v-2.83zm0 5.657l16.97 16.97-1.414 1.415L0 25.172v-2.83zM0 28l14.142 14.142-1.414 1.414L0 30.828V28zm0 5.657L11.314 44.97 9.9 46.386l-9.9-9.9v-2.828zm0 5.657L8.485 47.8 7.07 49.212 0 42.143v-2.83zm0 5.657l5.657 5.657-1.414 1.415L0 47.8v-2.83zm0 5.657l2.828 2.83-1.414 1.413L0 53.456v-2.83zM54.627 60L30 35.373 5.373 60H8.2L30 38.2 51.8 60h2.827zm-5.656 0L30 41.03 11.03 60h2.828L30 43.858 46.142 60h2.83zm-5.656 0L30 46.686 16.686 60h2.83L30 49.515 40.485 60h2.83zm-5.657 0L30 52.343 22.343 60h2.83L30 55.172 34.828 60h2.83zM32 60l-2-2-2 2h4zM59.716 0l-28 28 1.414 1.414L60 2.544V0h-.284zM60 5.373L34.544 30.828l1.414 1.415L60 8.2V5.374zm0 5.656L37.373 33.656l1.414 1.414L60 13.86v-2.83zm0 5.656l-19.8 19.8 1.415 1.413L60 19.514v-2.83zm0 5.657l-16.97 16.97 1.414 1.415L60 25.172v-2.83zM60 28L45.858 42.142l1.414 1.414L60 30.828V28zm0 5.657L48.686 44.97l1.415 1.415 9.9-9.9v-2.828zm0 5.657L51.515 47.8l1.414 1.413 7.07-7.07v-2.83zm0 5.657l-5.657 5.657 1.414 1.415L60 47.8v-2.83zm0 5.657l-2.828 2.83 1.414 1.413L60 53.456v-2.83zM39.9 16.385l1.414-1.414L30 3.658 18.686 14.97l1.415 1.415 9.9-9.9 9.9 9.9zm-2.83 2.828l1.415-1.414L30 9.313 21.515 17.8l1.414 1.413 7.07-7.07 7.07 7.07zm-2.827 2.83l1.414-1.416L30 14.97l-5.657 5.657 1.414 1.415L30 17.8l4.243 4.242zm-2.83 2.827l1.415-1.414L30 20.626l-2.828 2.83 1.414 1.414L30 23.456l1.414 1.414zM56.87 59.414L58.284 58 30 29.716 1.716 58l1.414 1.414L30 32.544l26.87 26.87z' fill='%23f9f9f9' fill-opacity='0.64' fill-rule='evenodd'/%3E%3C/svg%3E")`,
    'margin-bottom': '2rem',
    height: 'auto',
    /*
    theme injected attributes in App.jsx
    color: theme.text.color.white,
    'text-shadow': theme.text.shadow,
    'box-shadow': `0 4px 2px -2px ${theme.palette.grey.main}`
    */
  },
  bannerInner: {
    height: '100%',
    'background-color': 'rgba(0, 0, 0, 0.25)',
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'space-between',
    'text-align': 'center'
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
    position: 'relative',
    /*
    theme injected attributes in DateListItem.jsx

    'border-top': `1px solid ${theme.text.color.white}`,
    'font-size': theme.text.size.main,
    color: theme.text.color.white,
    '&:hover': {
      color: theme.palette.grey.light
    }

    theme injected attributes in DateListDay.jsx, DateList.jsx
    'border-top': `1px solid ${theme.text.color.white}`,
    color: theme.text.color.white,
    */
  },
  dateListRoot: {
    width: '100%',
    height: '100%',
    'z-index': 2,
    overflow: 'scroll',
  },
  dateListWrapper: {
    width: '100%',
    padding: 0,
    'margin-top': 0,
    /*
    theme injected attributes in DateList.jsx
    '&:last-child': {
      'border-bottom': `1px solid ${theme.text.color.white}`,
    }
    */
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
    '& .headshot': {
      position: 'absolute',
      height: '100%',
    },
    /*
    theme injected attributes in ActTile.jsx
    '& .act-name': {
      'text-shadow': theme.text.shadow,
      position: 'absolute',
      color: theme.text.color.white,
      border: `1px solid ${theme.text.color.white}`,
      'border-radius': '0.2rem',
      padding: '0.25rem 1rem',
      margin: 'auto',
    },
    */
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
    display: 'block',
    margin: 'auto',
    'margin-top': '1rem'
  },
  searchLabel: {
    display: 'block',
    padding: '0.5rem'
  },
  searchWrapper: {
    'margin-bottom': '2rem',
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

import path from 'path';
import axios from 'axios';
import months from './utils/maps/months';
import days from './utils/maps/days';
import shuffle from './utils/shuffle';
import ajaxErrorHandler from './utils/ajaxErrorHandler';

// eslint-disable-next-line
export function fetchCachedData() {

  return axios.get('http://localhost:8080/')
    .then((result) => {
      const actMap = [];
      const acts = Object.keys(result.data.acts);
      let actTileUi = {};
      let datesTable = {};
      acts.forEach((act) => {
        const actDatesTable = {};
        actTileUi = Object.assign(actTileUi, { [result.data.acts[act].id]: { active: false, display: true } });
        actMap.push([result.data.acts[act].id, `${act}`]);

        /*
        this datesTable codeblock needs to be moved to the server once mvp is reached
        */
        result.data.acts[act].dates.sort(((a, b) => (
          new Date(a.date) - new Date(b.date)
        )));
        let dateCounter = new Date('January 1, 1970, 00:00:00');
        for (let i = 0; i < result.data.acts[act].dates.length; i++) {
          const date = new Date(result.data.acts[act].dates[i].date);
          // set initial date
          if (i === 0) {
            dateCounter = new Date(`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}, 04:00:00`);
            actDatesTable[`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`] = [];
          }
          // account for date change at midnight
          if ((date.getTime() / 1000 / 60 / 60) - (dateCounter.getTime() / 1000 / 60 / 60) >= 24) {
            // start time for new day is 4am to catch late night shows
            dateCounter = new Date(`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}, 04:00:00`);
            actDatesTable[`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`] = [];
            actDatesTable[`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`] = actDatesTable[`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`].concat(result.data.acts[act].dates[i]);
          } else if ((date.getTime() / 1000 / 60 / 60) - (dateCounter.getTime() / 1000 / 60 / 60) >= 20) {
            actDatesTable[`${months[date.getMonth()]} ${date.getDate() - 1}, ${date.getFullYear()}`] = actDatesTable[`${months[date.getMonth()]} ${date.getDate() - 1}, ${date.getFullYear()}`].concat(result.data.acts[act].dates[i]);
          } else {
            actDatesTable[`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`] = actDatesTable[`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`].concat(result.data.acts[act].dates[i]);
          }
        }

        datesTable = Object.assign(datesTable, { [result.data.acts[act].id]: actDatesTable });
      });

      return {
        cachedData: result.data,
        actMap,
        actTileUi,
        actKeysReordered: shuffle(Object.keys(result.data.acts)),
        datesTable
      };
    }).catch(ajaxErrorHandler);
}

const fs = require('fs');
const data = require('./data.json');
const cellar = require('./cellar_village_fat.json');

const comedians = Object.keys(cellar);
const existingActs = Object.keys(data.acts);
const added = {};
const needsUpdated = [];

for (let i = 0; i < comedians.length; i++) {
  if (existingActs.includes(comedians[i])) {
    data.acts[comedians[i]].dates = data.acts[comedians[i]].dates.concat(cellar[comedians[i]].dates);
    added[comedians[i]] = cellar[comedians[i]].dates;
  } else {
    data.acts[comedians[i]] = {};
    const currentLength = Object.keys(data.acts).length;
    data.acts[comedians[i]].id = currentLength - 1;
    data.acts[comedians[i]].dates = cellar[comedians[i]].dates;
    added[comedians[i]] = cellar[comedians[i]].dates;
  }
  console.log(i / comedians.length);
}

for (let i = 0; i < comedians.length; i++) {
  const existingActsUpdated = Object.keys(data.acts);
  if (!data.acts[existingActsUpdated[i]].twitter_handle) {
    needsUpdated.push(existingActsUpdated[i] + ' twitter');
  }
  if (!data.acts[existingActsUpdated[i]].headshot_url) {
    needsUpdated.push(existingActsUpdated[i] + ' image');
  }
}

const now = new Date();

fs.writeFileSync('data1.json', JSON.stringify(data));
fs.writeFileSync(`./addedLogs/${now}.json`, JSON.stringify(added));
fs.writeFileSync(`./needsUpdated/${now}.json`, JSON.stringify(needsUpdated));

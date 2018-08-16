const fs = require('fs');
const data = require('./data.dummy.json');
const cellar = require('./cellar_village_fat.json');

const comedians = Object.keys(cellar);
const existingActs = Object.keys(data.acts);
const added = {};
const needsUpdated = [];

for (let i = 0; i < comedians.length; i++) {
  if (existingActs.includes(comedians[i])) {
    data.acts[comedians[i]].dates = data.acts[comedians[i]].dates.concat( cellar[comedians[i]].dates);
    added[comedians[i]] = cellar[comedians[i]].dates;
  } else {
    data.acts[comedians[i]] = {};
    const currentLength = Object.keys(data.acts).length;
    data.acts[comedians[i]].id = currentLength - 1;
    data.acts[comedians[i]].dates = cellar[comedians[i]].dates;
    added[comedians[i]] = cellar[comedians[i]].dates;
  }
}

const existingActsUpdated = Object.keys(data.acts);
for (let i = 0; i < existingActsUpdated.length; i++) {
  if (!data.acts[existingActsUpdated[i]].twitter_handle) {
    needsUpdated.push(existingActsUpdated[i] + ' twitter');
  }
  if (!data.acts[existingActsUpdated[i]].headshot_url) {
    needsUpdated.push(existingActsUpdated[i] + ' image');
  }

  const nameArr = existingActsUpdated[i].split(' ');
  if (!data.acts[existingActsUpdated[i]].name_first) {
    const firstName = nameArr[0];
    // console.log(firstName);
    data.acts[existingActsUpdated[i]].name_first = firstName.slice(0, 1).toUpperCase() + firstName.slice(1);
  }
  if (nameArr.length > 1 && !data.acts[existingActsUpdated[i]].name_last) {
    const lastName = nameArr[nameArr.length - 1];
    // console.log(lastName);
    data.acts[existingActsUpdated[i]].name_last = lastName.slice(0, 1).toUpperCase() + lastName.slice(1);
  }
}

const now = new Date();

fs.writeFileSync('data1.json', JSON.stringify(data));
fs.writeFileSync(`./addedLogs/${now}.json`, JSON.stringify(added));
fs.writeFileSync(`./needsUpdated/${now}.json`, JSON.stringify(needsUpdated));

console.log('data.json\n./addedLogs/${now}.json\n./needsUpdated/${now}.json\nUpdated')

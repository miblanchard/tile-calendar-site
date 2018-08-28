
const fs = require('fs');
const data = require('./data.json');
const cellar = require('./cellar_village_fat.json');
const blacklist = require('./blacklist');

const comedians = Object.keys(cellar);
const existingActs = Object.keys(data.acts);
const added = {};
const needsUpdated = [];

// add dates to existing comedians, add comedian if not in JSON obj
for (let i = 0; i < comedians.length; i++) {
  // exclude blacklisted entries like "More Announced Soon"
  if (!blacklist.includes(comedians[i])) {
    if (existingActs.includes(comedians[i])) {
      // TODO: once more clubs are added this will need refactored to account for redundant entries
      data.acts[comedians[i]].dates = cellar[comedians[i]].dates;
      added[comedians[i]] = cellar[comedians[i]].dates;
    } else {
      data.acts[comedians[i]] = {};
      data.acts[comedians[i]].id = Object.keys(data.acts).length;
      data.acts[comedians[i]].dates = cellar[comedians[i]].dates;
      added[comedians[i]] = cellar[comedians[i]].dates;
    }
  }
}

// get updated length of acts obj after new comedians are added
const existingActsUpdated = Object.keys(data.acts);

for (let i = 0; i < existingActsUpdated.length; i++) {
  // if any acts are missing headshots or twitter handles add them to the needsUpdated array
  if (!data.acts[existingActsUpdated[i]].twitter_handle) {
    needsUpdated.push(`${existingActsUpdated[i]} twitter`);
  }
  if (!data.acts[existingActsUpdated[i]].headshot_url) {
    needsUpdated.push(`${existingActsUpdated[i]} image`);
  }

  // add name_first and name_last attributes to new acts
  const nameArr = existingActsUpdated[i].split(' ');
  if (!data.acts[existingActsUpdated[i]].name_first) {
    const firstName = nameArr[0];
    data.acts[existingActsUpdated[i]].name_first = firstName.slice(0, 1).toUpperCase() + firstName.slice(1);
  }
  if (nameArr.length > 1 && !data.acts[existingActsUpdated[i]].name_last) {
    const lastName = nameArr[nameArr.length - 1];
    data.acts[existingActsUpdated[i]].name_last = lastName.slice(0, 1).toUpperCase() + lastName.slice(1);
  }
}

const now = new Date();

const addedPath = `./addedLogs/${now}.json`;
const updatedPath = `./needsUpdated/${now}.json`;

fs.writeFile('data.json', JSON.stringify(data), (error) => {
  if (error) throw error;
  console.log('data.json has been saved!');
});

fs.writeFile(addedPath, JSON.stringify(added), (error) => {
  if (error) throw error;
  console.log(`${addedPath} has been saved!`);
});

fs.writeFile(updatedPath, JSON.stringify(needsUpdated), (error) => {
  if (error) throw error;
  console.log(`${updatedPath} has been saved!`);
});

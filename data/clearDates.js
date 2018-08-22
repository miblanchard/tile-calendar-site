const fs = require('fs');
const data = require('./data.json');

const existingActs = Object.keys(data.acts);
let removed = 0;

for (let i = 0; i < existingActs.length; i++) {
  removed += data.acts[existingActs[i]].dates.length;
  data.acts[existingActs[i]].dates = [];
}

fs.writeFileSync('data.json', JSON.stringify(data));

console.log(`data.json Updated, removed ${removed} dates`);

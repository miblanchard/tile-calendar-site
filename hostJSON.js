const express = require('express');
const data = require('./data/data.json');

const app = express();

app.use(express.static('./data'));

app.get('/', (req, res) => {
  console.log('hostJSON', req)
  res.send(data);
})

app.listen(8080, () => {
  console.log('Server is listening on port: 8080');
});

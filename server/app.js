const express = require('express');

const app = express();

app.use(express.json());

app.set('port', 3000);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.static(`${__dirname}/../public`));

app.get('/:homeId', (req, res) => {
  res.redirect(`/index.html?homeId=${req.params.homeId}`);
});

module.exports = app;

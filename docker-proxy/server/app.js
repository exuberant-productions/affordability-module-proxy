const express = require('express');
const proxy = require('http-proxy-middleware');
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

const proxyTable = {
  '/homeDetails': 'http://ec2-54-215-192-145.us-west-1.compute.amazonaws.com',
  '/similarHomes': 'http://ec2-54-215-192-145.us-west-1.compute.amazonaws.com',
  '/api/homeinfo': 'http://ec2-54-183-109-121.us-west-1.compute.amazonaws.com',
  '/neighborhood': 'http://ec2-54-153-58-95.us-west-1.compute.amazonaws.com',
  '/homes': 'http://ec2-54-153-58-95.us-west-1.compute.amazonaws.com',
  '/questions': 'http://ec2-54-153-58-95.us-west-1.compute.amazonaws.com',
  '/features': 'http://ec2-54-153-58-95.us-west-1.compute.amazonaws.com',
  '/reviews': 'http://ec2-54-153-58-95.us-west-1.compute.amazonaws.com',
  '/home': 'http://ec2-54-153-58-95.us-west-1.compute.amazonaws.com',
};

const options = {
  target: '/',
  router: proxyTable,
};

const myProxy = proxy(options);

app.use(myProxy);

module.exports = app;

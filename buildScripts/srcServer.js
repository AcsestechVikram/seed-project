import express from 'express';
import path from 'path';
// import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev.js';
import appRoutes from '../routes/app.js';
import mongoose from 'mongoose';
/* eslint-disable no-console */
const port = 3000;
const app = express();
mongoose.connect('mongodb://localhost:27017/seed-project', {useMongoClient: true});
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler,{
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log,
    path:  '/__webpack_hmr',
    heartbeat: 10*1000
}));

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, '../public')));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});
app.use('/', appRoutes);
// catch 404 and forward to error handler
app.use(function (req, res) {
    res.render('index');
});
app.listen(port, function (err) {
  if(err){
    //console.log(err);
  } else {
    // open('http://localhost:'+ port);
  }
});

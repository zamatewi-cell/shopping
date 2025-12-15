const express = require('express');

const ejs = require('ejs');

const path = require('path');

const app = express();

app.use(express.static(path.resolve(__dirname, 'public')));

app.set('view engine', 'html');

app.set('views', path.resolve(__dirname, 'views'));

app.engine('.html', ejs.__express);

app.get('/', (req, res) => {
  res.render('login');
})

app.get('/register', (req, res) => {
  res.render('register');
})

app.get('/type', (req, res) => {
  res.render('type');
})

app.get('/product', (req, res) => {
  res.render('product');
})

app.get('/test', (req, res) => {
  res.render('test');
})

app.listen(7002);
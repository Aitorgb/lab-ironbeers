const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const { json } = require('express');

const app = express();
const punkAPI = new PunkAPIWrapper();
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/beers', (req, res) => {
  console.log(res);
  punkAPI
    .getBeers()
    .then(beer => {
          res.render('beers', beer);
        })
        .catch(error => console.log('Error'));
          
});
app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then(beer => {
        res.render('random-beer', beer[0]);
      })
      .catch(error => console.log('Error'));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));

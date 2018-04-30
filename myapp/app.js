const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/rest-api';
// or use an online db e.g.:
// const mongoUri = 'mongodb://devereld:dd2345@ds015730.mlab.com:15730/recipes-dd';

mongoose.connect(mongoUri);

// make sure this line always appears before any routes
app.use(bodyParser.json());
app.use(express.static('public'))

const recipeModels = require('./src/recipe.model');

const routes = require('./src/recipe.routes');
const appRoutes = routes(app);

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(3001);
console.log('Server running at http://localhost:3001/');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    name: String,
    author: String,
    date: String,
    description: String,
    ingredients: String,
    directions: String,
    image: String
});

module.exports = mongoose.model('Recipe', RecipeSchema);
const sequelize = require('sequelize');
const database = require('../db');

const flashCard = database.define('flashcards', {                      
    word: {
        type: sequelize.STRING,
        allownull: false,
        unique: true
    },
    definition: {
        type: sequelize.STRING,
        allownull: false,
        unique: false
    },
    owner: {
        type: sequelize.INTEGER,
    },
    setId: {
      type: sequelize.INTEGER,
      allownull: true,
    }
})   

module.exports = flashCard;
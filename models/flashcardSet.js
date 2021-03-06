const sequelize = require('sequelize');
const database = require('../db');

const flashCardSet = database.define('flashcardset', {  
    deckName: {
        type: sequelize.STRING,
        allownull: false,
        unique: true
    },
    owner: {
        type: sequelize.INTEGER,
    }
})   

module.exports = flashCardSet;
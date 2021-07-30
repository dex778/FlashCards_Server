/* Model for user login and password */
const sequelize = require('sequelize');
const database = require('../db');
 
const User = database.define('users', {                      
    username: {
        type: sequelize.STRING,
        allownull: false,
        unique: true
    },
    password: {
        type: sequelize.STRING,
        allownull: false,
        unique: true
    }
})   

module.exports = User;
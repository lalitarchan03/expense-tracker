const { Sequelize} = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'myfirstproject', {dialect: 'mysql', host: 'localhost'});


module.exports = sequelize;
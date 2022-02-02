const { Sequelize, DataTypes } = require('sequelize');
const { dbType, dbName, username, password, host } = require('./config')
const getTaskModel = require('./models/tasks')

const sequelize = new Sequelize(dbName, username, password, {
    dialect: dbType,
    host: host,
})

Task = getTaskModel(sequelize, DataTypes)

module.exports = {
    Task: Task
}
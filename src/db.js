const { Sequelize, DataTypes } = require('sequelize');
const { dbType, dbName, username, password, host } = require('./config')
const getTaskModel = require('./models/tasks')

const sequelize = new Sequelize(dbName, username, password, {
    dialect: dbType,
    host: host,
})

Task = getTaskModel(sequelize, DataTypes)

module.exports = {
    getTasks: async (userId, filterBy, order, pp, page) => {

        const result = await Task.findAll({
            attributes: ['uuid', 'name', 'done', 'createdAt']
        })

        const tasksList = result.map(task => task.dataValues)
        const filteredTasks = tasksList.filter(task => {
            if (filterBy === 'done') return task.done ? true : false
            if (filterBy === 'undone') return task.done ? false : true
            return true
        })

        filteredTasks.sort((a, b) => order === 'desc' ? b.createdAt - a.createdAt : a.createdAt - b.createdAt)
        const outputTasks = filteredTasks.slice((page - 1) * pp, page * pp)

        return { count: filteredTasks.length, tasks: [...outputTasks] }
    },
    addTask: async (userId, name, done) => {

        await Task.create({ name: name, done: done })
    },
    deleteTask: async (userId, taskId) => {

        const result = await Task.findOne({
            where: {
                uuid: taskId,
            },
        })
        await result.destroy()
    },
    updateTask: async (userId, taskId, name, done) => {

        const result = await Task.findOne({
            where: {
                uuid: taskId,
            },
        })

        if (name !== undefined) {
            result.name = name
        }
        if (done !== undefined) {
            result.done = done
        }
        await result.save()
    },
}
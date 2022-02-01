const { Sequelize, DataTypes, Model } = require('sequelize');
const { dbFile } = require('./config');
const console = require('console');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbFile
})

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

class Tasks extends Model { }

Tasks.init(
    {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.TEXT,
        },
        done: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    },
    {
        sequelize, // Экземпляр подключения
        modelName: 'Tasks', // Название модели
    }
)

Tasks.sync()

module.exports = {
    getTasks: async (userId, filterBy, order, pp, page) => {

        const result = await Tasks.findAll({
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

        await Tasks.create({ name: name, done: done })
    },
    deleteTask: async (userId, taskId) => {

        const result = await Tasks.findOne({
            where: {
                uuid: taskId,
            },
        })
        await result.destroy()
    },
    updateTask: async (userId, taskId, name, done) => {

        const result = await Tasks.findOne({
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
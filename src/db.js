const { v4 } = require('uuid')
const fs = require('fs')
const { dbFile } = require('./config')

module.exports = {
    getTasks: (userId, filterBy, order, pp, page) => {

        const usersList = JSON.parse(fs.readFileSync(dbFile, 'utf-8'))
        const tasksList = usersList[String(userId)]
        const filteredTasks = tasksList.filter(task => {
            if (filterBy === 'done') return task.done ? true : false
            if (filterBy === 'undone') return task.done ? false : true
            return true
        })
        const count = filteredTasks.length

        filteredTasks.sort((a, b) => order === 'desc' ? b.createdAt - a.createdAt : a.createdAt - b.createdAt)
        const outputTasks = filteredTasks.slice((page - 1) * pp, page * pp)
        return { count: count, tasks: [...outputTasks] }

    },
    addTask: (userId, name, done) => {
        const task = {
            uuid: v4(),
            name: name,
            done: done,
            createdAt: +new Date(),
        }
        const usersList = JSON.parse(fs.readFileSync(dbFile, 'utf-8'))
        usersList[String(userId)].push(task)
        fs.writeFileSync(dbFile, JSON.stringify(usersList))
    },
    deleteTask: (userId, taskId) => {
        const usersList = JSON.parse(fs.readFileSync(dbFile, 'utf-8'))
        usersList[String(userId)] = usersList[String(userId)].filter(task => taskId === task.uuid ? false : true)
        fs.writeFileSync(dbFile, JSON.stringify(usersList))
    },
    updateTask: (userId, taskId, newTask) => {
        const usersList = JSON.parse(fs.readFileSync(dbFile, 'utf-8'))
        usersList[String(userId)] = usersList[String(userId)].map(task => taskId === task.uuid ? { ...task, ...newTask } : task)
        fs.writeFileSync(dbFile, JSON.stringify(usersList))
    },
}
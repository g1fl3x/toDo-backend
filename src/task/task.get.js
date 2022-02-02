const { Task } = require('../db')
const { errorsCheck } = require('../utils')
const { param, query } = require('express-validator')

const router = require('express').Router()

router.get('/tasks/:userId',
    param('userId').isInt().withMessage('param "userId" must be int'),
    query('filterBy').isIn(['all', 'done', 'undone']).withMessage('query "filterBy" must be in array: ["all", "done", "undone"]'),
    query('order').isIn(['asc', 'desc']).withMessage('query "order" must be in array: ["asc", "desc"]'),
    query('pp').isInt({ min: 1, max: 20 }).withMessage('query "pp" must be in range [1...20]'),
    query('page').isInt({ min: 1 }).withMessage('query "page" must be greater then 0'),
    errorsCheck,

    async (req, res) => {
        try {
            const result = await Task.findAll()

            const tasksList = result.map(task => task.dataValues)
            const filteredTasks = tasksList.filter(task => {
                if (req.query.filterBy === 'done') return task.done ? true : false
                if (req.query.filterBy === 'undone') return task.done ? false : true
                return true
            })

            filteredTasks.sort((a, b) =>
                req.query.order === 'desc' ? b.createdAt - a.createdAt : a.createdAt - b.createdAt
            )
            const outputTasks = filteredTasks.slice(
                (req.query.page - 1) * req.query.pp, req.query.page * req.query.pp
            )
            return res.json({ count: filteredTasks.length, tasks: [...outputTasks] })
        } catch (err) {
            return res.status(400).json({ message: String(err) })
        }
    })

module.exports = router
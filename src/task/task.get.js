const { Task } = require('../models/index')
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
            const filteredTasks = await Task.findAndCountAll({
                where: req.query.filterBy === 'all' ? {} : { done: req.query.filterBy === 'done' ? true : false },
                order: [['createdAt', req.query.order]],
                offset: req.query.pp * (req.query.page - 1),
                limit: req.query.pp
            });
            return res.json({ message: "ok", count: filteredTasks.count, tasks: filteredTasks["rows"] })
        } catch (err) {
            return res.status(500).json({ message: String(err) })
        }
    })

module.exports = router
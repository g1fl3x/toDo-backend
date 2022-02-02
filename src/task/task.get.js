const { getTasks } = require('../db')
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
        const args = [
            req.params.userId,
            req.query.filterBy,
            req.query.order,
            req.query.pp,
            req.query.page
        ]

        getTasks(...args).then(
            (result) => {
                return res.json(result)
            },
            (err) => {
                return res.status(400).json({ message: String(err) })
            })
    })

module.exports = router
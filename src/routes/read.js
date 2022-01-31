const { getTasks } = require('../db')
const { param, query, validationResult } = require('express-validator');
const router = require('express').Router()

router.get('/tasks/:userId',
    param('userId').isInt().withMessage('param "userId" must be int'),
    query('filterBy').isIn(['all', 'done', 'undone']).withMessage('query "filterBy" must be in array: ["all", "done", "undone"]'),
    query('order').isIn(['asc', 'desc']).withMessage('query "order" must be in array: ["asc", "desc"]'),
    query('pp').isInt().withMessage('query "pp" must be int').custom((value) => value >= 1 && value <= 20).withMessage('query "pp" must be in range [1...20]'),
    query('page').isInt().withMessage('query "page" must be int').custom((value) => value >= 1).withMessage('query "page" must be greater then 0'),
    (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({ message: errors })
            }

            const args = [
                req.params.userId,
                req.query.filterBy,
                req.query.order,
                req.query.pp,
                req.query.page
            ]

            return res.json(getTasks(...args))
        } catch (e) {
            return res.status(400).json({ message: e })
        }
    })

module.exports = router
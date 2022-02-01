const { getTasks } = require('../db')
const router = require('express').Router()

router.get('/tasks/:userId', (req, res) => {
        try {
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
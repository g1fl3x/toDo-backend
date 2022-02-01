const { getTasks } = require('../db')
const router = require('express').Router()

router.get('/tasks/:userId', async (req, res) => {

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
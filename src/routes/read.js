const { getTasks } = require('../db')
const router = require('express').Router()

router.get('/tasks/:userId', async (req, res) => {
        try {
            const args = [
                req.params.userId,
                req.query.filterBy,
                req.query.order,
                req.query.pp,
                req.query.page
            ]

            const result =  await getTasks(...args)
            return res.json(result)
        } catch (e) {
            return res.status(400).json({ message: e })
        }
    })

module.exports = router
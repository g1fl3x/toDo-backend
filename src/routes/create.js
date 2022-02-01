const { addTask } = require('../db')
const router = require('express').Router()

router.post('/task/:userId', async (req, res) => {

    const args = [
        req.params.userId,
        req.body.name,
        req.params.done ?? false,
    ]

    addTask(...args).then(
        () => {
            return res.json({ message: "ok" })
        },
        (err) => {
            return res.status(400).json({ message: String(err) })
        })
})

module.exports = router
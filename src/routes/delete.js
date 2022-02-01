const { deleteTask } = require('../db')
const router = require('express').Router()

router.delete('/task/:userId/:taskId', async (req, res) => {

    const args = [
        req.params.userId,
        req.params.taskId
    ]

    deleteTask(...args).then(
        () => {
            return res.json({ message: "ok" })
        },
        (err) => {
            return res.status(400).json({ message: String(err) })
        })
})

module.exports = router
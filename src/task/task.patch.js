const { updateTask } = require('../db')
const router = require('express').Router()

router.patch('/task/:userId/:taskId', async (req, res) => {

    const args = [
        req.params.userId,
        req.params.taskId,
        req.body.name,
        req.body.done,
    ]

    updateTask(...args).then(
        () => {
            return res.json({ message: "ok" })
        },
        (err) => {
            return res.status(400).json({ message: String(err) })
        })

})
module.exports = router
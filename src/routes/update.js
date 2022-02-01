const { updateTask } = require('../db')
const router = require('express').Router()

router.patch('/task/:userId/:taskId', (req, res) => {
        try {
            const updatedTask = {}
            if (req.body.done !== undefined) {
                updatedTask.done = req.body.done
            }
            if (req.body.name !== undefined) {
                updatedTask.name = req.body.name
            }

            const args = [
                req.params.userId,
                req.params.taskId,
                updatedTask
            ]

            updateTask(...args)
            res.send({ message: "ok" });
        } catch (e) {
            return res.status(400).json({ message: e })
        }
    })
module.exports = router
const { deleteTask } = require('../db')
const router = require('express').Router()

router.delete('/task/:userId/:taskId', (req, res) => {
        try {
            const args = [
                req.params.userId,
                req.params.taskId
            ]


            deleteTask(...args)
            return res.json({ message: "ok" })
        } catch (e) {
            return res.status(400).json({ message: e })
        }
    })

module.exports = router
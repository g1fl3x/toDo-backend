const { deleteTask } = require('../db')
const router = require('express').Router()

router.delete('/task/:userId/:taskId', (req, res) => {
    try {
        if (!/\d+$/.test(req.params.userId))
            return res.status(404).json({ message: "'userId' is not int" })
        if (!req.params.taskId)
            return res.status(400).json({ message: "'taskId' is empty" })

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
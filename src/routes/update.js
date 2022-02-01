const { updateTask } = require('../db')
const router = require('express').Router()

router.patch('/task/:userId/:taskId', async (req, res) => {
        try {
            const args = [
                req.params.userId,
                req.params.taskId,
                req.body.name,
                req.body.done,
            ]
            
            await updateTask(...args)
            res.send({ message: "ok" });
        } catch (e) {
            return res.status(400).json({ message: e })
        }
    })
module.exports = router
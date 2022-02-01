const { addTask } = require('../db')
const router = require('express').Router()

router.post('/task/:userId', (req, res) => {
        try {
            const args = [
                req.params.userId,
                req.body.name,
                req.params.done ?? false,
            ]

            addTask(...args)
            res.send({ message: "ok" });
        } catch (e) {
            res.status(400).json({ message: e });
        }
    })

module.exports = router
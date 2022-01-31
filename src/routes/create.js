const { addTask } = require('../db')
const router = require('express').Router()

router.post('/task/:userId', (req, res) => {
    try {
        if (!/\d+$/.test(req.params.userId))
            return res.status(404).json({ message: "'userId' is not int" })
        if (String(req.body.name.length) < 1)
            return res.status(404).json({ message: "field 'name' is too short" })

        const args = [
            req.params.userId,
            req.body.name ?? "empty",
            req.params.done ?? false,
        ]

        addTask(...args)
        res.send({ message: "ok" });
    } catch (e) {
        res.status(400).json({ message: e });
    }
})

module.exports = router
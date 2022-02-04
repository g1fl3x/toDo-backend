const { Task } = require('../models/index')
const { errorsCheck } = require('../utils')
const { body, param, validationResult } = require('express-validator')

const router = require('express').Router()

router.post('/task/:userId',
    param('userId').isInt().withMessage('param "userId" must be int'),
    body('name').isLength({ min: 1 }).withMessage('body "name" is too short'),
    errorsCheck,

    async (req, res) => {
        try {
            const existingTask = await Task.findOne({ where: { name: req.body.name } })
            if (existingTask) {
                return res.status(400).json({ message: "task with same name already exists" })
            }

            const task = await Task.create({
                name: req.body.name
            })
            return res.json({ message: "ok", task: task })
        } catch (err) {
            return res.status(500).json({ message: String(err) })
        }
    })

module.exports = router
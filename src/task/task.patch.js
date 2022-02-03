const { Task } = require('../models/index')
const { errorsCheck } = require('../utils')
const { body, param, validationResult } = require('express-validator')

const router = require('express').Router()

router.patch('/task/:userId/:taskId',
    param('userId').isInt().withMessage('param "userId" must be int'),
    param('taskId').notEmpty().withMessage('param "taskId" is empty'),
    body('done').optional().isBoolean().withMessage('body "done" is not boolean'),
    body('name').optional().isLength({ min: 1 }).withMessage('body "name" is too short'),
    errorsCheck,

    async (req, res) => {
        try {
            const find = await Task.findOne({ where: { name: req.body.name } })
            if (find !== null) {
                return res.status(400).json({ message: "task with same name already exists" })
            }

            const task = await Task.findByPk(req.params.taskId)

            task.name = req.body.name
            task.done = req.body.done

            await task.save()
            return res.json({ message: "ok", task: task })
        } catch (err) {
            return res.status(500).json({ message: String(err) })
        }
    })

module.exports = router
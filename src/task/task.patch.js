const { updateTask } = require('../db')
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
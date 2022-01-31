const { updateTask } = require('../db')
const { errorsNormalize } = require('../utils')
const { body, param, validationResult } = require('express-validator');
const router = require('express').Router()

router.patch('/task/:userId/:taskId',
    param('userId').isInt().withMessage('param "userId" must be int'),
    param('taskId').notEmpty().withMessage('param "taskId" is empty'),
    body('done').optional().isBoolean().withMessage('body "done" is not boolean'),
    body('name').optional().isLength({ min: 1 }).withMessage('body "name" is too short'),
    (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({ message: errorsNormalize(errors) })
            }

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
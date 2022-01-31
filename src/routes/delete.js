const { deleteTask } = require('../db')
const { param, validationResult } = require('express-validator');
const router = require('express').Router()

router.delete('/task/:userId/:taskId',
    param('userId').isInt().withMessage('param "userId" must be int'),
    param('taskId').notEmpty().withMessage('param "taskId" is empty'),
    (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({ message: errors })
            }

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
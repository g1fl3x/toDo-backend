const { deleteTask } = require('../db')
const { errorsCheck } = require('../utils')
const { param, validationResult } = require('express-validator')

const router = require('express').Router()

router.delete('/task/:userId/:taskId',
    param('userId').isInt().withMessage('param "userId" must be int'),
    param('taskId').notEmpty().withMessage('param "taskId" is empty'),
    errorsCheck,

    async (req, res) => {
        const args = [
            req.params.userId,
            req.params.taskId
        ]

        deleteTask(...args).then(
            () => {
                return res.json({ message: "ok" })
            },
            (err) => {
                return res.status(400).json({ message: String(err) })
            })
    })

module.exports = router
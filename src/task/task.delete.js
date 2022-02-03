const { Task } = require('../models/index')
const { errorsCheck } = require('../utils')
const { param, validationResult } = require('express-validator')

const router = require('express').Router()

router.delete('/task/:userId/:taskId',
    param('userId').isInt().withMessage('param "userId" must be int'),
    param('taskId').notEmpty().withMessage('param "taskId" is empty'),
    errorsCheck,

    async (req, res) => {
        try {
            await Task.destroy({
                where: {
                    uuid: req.params.taskId,
                }
            })
            return res.json({ message: "ok" })
        } catch (err) {
            return res.status(500).json({ message: String(err) })
        }
    })

module.exports = router
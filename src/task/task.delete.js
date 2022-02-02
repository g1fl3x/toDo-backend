const { Task } = require('../db')
const { errorsCheck } = require('../utils')
const { param, validationResult } = require('express-validator')

const router = require('express').Router()

router.delete('/task/:userId/:taskId',
    param('userId').isInt().withMessage('param "userId" must be int'),
    param('taskId').notEmpty().withMessage('param "taskId" is empty'),
    errorsCheck,

    async (req, res) => {
        try {
            const result = await Task.findOne({
                where: {
                    uuid: req.params.taskId,
                },
            })
            await result.destroy()
            return res.json(result)
        } catch (err) {
            return res.status(500).json({ message: String(err) })
        }
    })

module.exports = router
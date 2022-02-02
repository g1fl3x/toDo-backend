const { Task } = require('../db')
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
            const result = await Task.findOne({
                where: {
                    uuid: req.params.taskId,
                },
            })
    
            if (req.body.name !== undefined) {
                result.name = req.body.name
            }
            if (req.body.done !== undefined) {
                result.done = req.body.done
            }
            await result.save()
            return res.json(result)
        } catch (err) {
            return res.status(400).json({ message: String(err) })
        }
    })

module.exports = router
const { Task } = require('../models/index')
const { errorsCheck } = require('../utils')
const { body, param, validationResult } = require('express-validator')

const router = require('express').Router()

router.post('/task/:userId',
    param('userId').isInt().withMessage('param "userId" must be int'),
    body('done').optional().isBoolean().withMessage('body "done" is not boolean'),
    body('name').isLength({ min: 1 }).withMessage('body "name" is too short')
        .custom((value) => {
            return Task.findOne({ where: { name: value } }).then(
                (task) => {
                    if (task)
                        return Promise.reject('task with same name already exist')
                })
        }),
    errorsCheck,

    async (req, res) => {
        try {
            const task = await Task.create({
                name: req.body.name
            })
            return res.json({ message: "ok", task: task })
        } catch (err) {
            return res.status(500).json({ message: String(err) })
        }
    })

module.exports = router
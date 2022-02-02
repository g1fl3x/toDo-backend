const { Task } = require('../db')
const { errorsCheck } = require('../utils')
const { body, param, validationResult } = require('express-validator')

const router = require('express').Router()

router.post('/task/:userId',
    param('userId').isInt().withMessage('param "userId" must be int'),
    body('name').isLength({ min: 1 }).withMessage('body "name" is too short'),
    body('done').optional().isBoolean().withMessage('body "done" is not boolean'),
    errorsCheck,

    async (req, res) => {
        try {
            const result = await Task.create({
                name: req.body.name,
                done: req.params.done ?? false
            })
            return res.json(result)
        } catch (err) {
            return res.status(400).json({ message: String(err) })
        }
    })

module.exports = router
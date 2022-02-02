const { addTask } = require('../db')
const { errorsCheck } = require('../utils')
const { body, param, validationResult } = require('express-validator')

const router = require('express').Router()

router.post('/task/:userId',
    param('userId').isInt().withMessage('param "userId" must be int'),
    body('name').isLength({ min: 1 }).withMessage('body "name" is too short'),
    body('done').optional().isBoolean().withMessage('body "done" is not boolean'),
    errorsCheck,
    
    async (req, res) => {
        const args = [
            req.params.userId,
            req.body.name,
            req.params.done ?? false,
        ]

        addTask(...args).then(
            () => {
                return res.json({ message: "ok" })
            },
            (err) => {
                return res.status(400).json({ message: String(err) })
            })
    })

module.exports = router
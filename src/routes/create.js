const { addTask } = require('../db')
const { body, param, validationResult } = require('express-validator');
const router = require('express').Router()

router.post('/task/:userId',
    param('userId').isInt().withMessage('param "userId" must be int'),
    body('name').isLength({ min: 1 }).withMessage('body "name" is too short'),
    body('done').optional().isBoolean().withMessage('body "done" is not boolean'),
    (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({ message: errors })
            }

            const args = [
                req.params.userId,
                req.body.name,
                req.params.done ?? false,
            ]

            addTask(...args)
            res.send({ message: "ok" });
        } catch (e) {
            res.status(400).json({ message: e });
        }
    })

module.exports = router
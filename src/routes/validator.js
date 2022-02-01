const { body, param, query, validationResult } = require('express-validator');
const router = require('express').Router()

function errorsNormalize(errors) {
    return errors.errors.map(err => err.msg).join(', ')
}

function getErrors(errors, res) {
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errorsNormalize(errors) })
    }
    return undefined
}

router.get('/tasks/:userId',
    param('userId').isInt().withMessage('param "userId" must be int'),
    query('filterBy').isIn(['all', 'done', 'undone']).withMessage('query "filterBy" must be in array: ["all", "done", "undone"]'),
    query('order').isIn(['asc', 'desc']).withMessage('query "order" must be in array: ["asc", "desc"]'),
    query('pp').isInt().withMessage('query "pp" must be int').custom((value) => value >= 1 && value <= 20).withMessage('query "pp" must be in range [1...20]'),
    query('page').isInt().withMessage('query "page" must be int').custom((value) => value >= 1).withMessage('query "page" must be greater then 0'),
    (req, res, next) => {
        getErrors(validationResult(req), res) ?? next()
    })

router.patch('/task/:userId/:taskId',
    param('userId').isInt().withMessage('param "userId" must be int'),
    param('taskId').notEmpty().withMessage('param "taskId" is empty'),
    body('done').optional().isBoolean().withMessage('body "done" is not boolean'),
    body('name').optional().isLength({ min: 1 }).withMessage('body "name" is too short'),
    (req, res, next) => {
        getErrors(validationResult(req), res) ?? next()
    })

router.delete('/task/:userId/:taskId',
    param('userId').isInt().withMessage('param "userId" must be int'),
    param('taskId').notEmpty().withMessage('param "taskId" is empty'),
    (req, res, next) => {
        getErrors(validationResult(req), res) ?? next()
    })

router.post('/task/:userId',
    param('userId').isInt().withMessage('param "userId" must be int'),
    body('name').isLength({ min: 1 }).withMessage('body "name" is too short'),
    body('done').optional().isBoolean().withMessage('body "done" is not boolean'),
    (req, res, next) => {
        getErrors(validationResult(req), res) ?? next()
    })

module.exports = router
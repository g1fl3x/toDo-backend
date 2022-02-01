const express = require('express')
const router = express.Router()

router.use('/', require('./validator')) // validate data

router.use('/', require('./read'))
router.use('/', require('./update'))
router.use('/', require('./create'))
router.use('/', require('./delete'))

module.exports = router
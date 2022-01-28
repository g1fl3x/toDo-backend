const express = require('express')
const router = express.Router()

const { apiUriStarter } = require('./config')

const createRoute = require('./routes/create');
const readRoute = require('./routes/read');
const updateRoute = require('./routes/update');
const deleteRoute = require('./routes/delete');

router.post(`${apiUriStarter}/task/:userId`, createRoute)
router.get(`${apiUriStarter}/tasks/:userId`, readRoute)
router.patch(`${apiUriStarter}/task/:userId/:taskId`, updateRoute)
router.delete(`${apiUriStarter}/task/:userId/:taskId`, deleteRoute)

module.exports = router
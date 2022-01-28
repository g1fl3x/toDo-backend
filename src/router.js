const router = require('express').Router()

const { apiUri } = require('./config')

const createRoute = require('./routes/create');
const readRoute = require('./routes/read');
const updateRoute = require('./routes/update');
const deleteRoute = require('./routes/delete');

router.post(`${apiUri}/task/:userId`, createRoute)
router.get(`${apiUri}/tasks/:userId`, readRoute)
router.patch(`${apiUri}/task/:userId/:taskId`, updateRoute)
router.delete(`${apiUri}/task/:userId/:taskId`, deleteRoute)

module.exports = router
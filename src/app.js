const express = require('express')

const createRoute = require('./routes/create');
const readRoute = require('./routes/read');
const updateRoute = require('./routes/update');
const deleteRoute = require('./routes/delete');

const app = express()
const PORT = 3000

app.post('/task/:userId', createRoute)
app.get('/tasks/:userId', readRoute)
app.patch('/task/:userId/:taskId', updateRoute)
app.delete('/task/:userId/:taskId', deleteRoute)

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}`)
})

const express = require('express')
const router = require('./router')
const { port } = require('./config')

const app = express()

app.use(router)

app.listen(port, () => {
	console.log(`App listening on port ${port}`)
})

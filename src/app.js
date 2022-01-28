const express = require('express')
const router = require('./router')

const app = express()
const PORT = 3000

app.use(router)

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}`)
})

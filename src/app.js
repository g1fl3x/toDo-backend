const express = require('express')
const router = require('./router')
const cors = require('cors')
const { port } = require('./config')

const app = express()

app.use(cors());
app.options('*', cors());
app.use(express.json())
app.use(router)

app.listen(port, () => {
	console.log(`App listening on port ${port}`)
})

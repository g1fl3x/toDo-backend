const express = require('express')
const router = express.Router()

const recursive = require('recursive-readdir-sync');

recursive(__dirname).forEach((file) => {
    const spiltedFile = file.split('/')
    spiltedFile.pop() !== 'router.js' ? router.use('/', require(file)) : undefined
});

module.exports = router
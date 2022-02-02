const { validationResult } = require('express-validator')

module.exports = {
    errorsCheck: (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty())
            return res.status(400).json({ message: errors.errors.map(err => err.msg).join(', ') })
        next();
    }
}
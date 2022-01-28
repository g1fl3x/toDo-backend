const { getTasks } = require('../db')

module.exports = (req, res) => {
    if (!/\d+$/.test(req.params.userId)) 
        return res.status(404).json({message: "userId is not int"})
    if (req.query.page < 1)
        req.query.page = 1

    const args = [
        req.params.userId,
        req.query.filterBy ?? 'all',
        req.query.order ?? 'asc',
        req.query.pp ?? 1,
        req.query.page ?? 1
    ]
    try {
        return res.json(getTasks(...args))
    } catch(e) {
        return res.status(400).json({message: e})
    }
};
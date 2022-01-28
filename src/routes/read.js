const { getTasks } = require('../db')

module.exports = (req, res) => {
    try {
        if (!/\d+$/.test(req.params.userId))
            return res.status(404).json({ message: "'userId' is not int" })
        if (req.query.page < 1 || req.query.page > 20)
            return res.status(400).json({ message: "'perpage' param must be in range [1...20]" })

        const args = [
            req.params.userId,
            req.query.filterBy ?? 'all',
            req.query.order ?? 'asc',
            req.query.pp,
            req.query.page ?? 1
        ]

        return res.json(getTasks(...args))
    } catch (e) {
        return res.status(400).json({ message: e })
    }
};
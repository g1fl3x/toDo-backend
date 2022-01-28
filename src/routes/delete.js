const { deleteTask } = require('../db')

module.exports = (req, res) => {
    if (!/\d+$/.test(req.params.userId))
        return res.status(404).json({ message: "userId is not int" })
    if (!req.params.taskId)
        return res.status(400).json({ message: "taskId is empty" })

    const args = [
        req.params.userId,
        req.params.taskId
    ]

    try {
        deleteTask(...args)
        return res.json({ message: "ok" })
    } catch (e) {
        return res.status(400).json({ message: e })
    }
};
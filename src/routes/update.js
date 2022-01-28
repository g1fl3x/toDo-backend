const { updateTask } = require('../db')

module.exports = (req, res) => {
    if (!/\d+$/.test(req.params.userId))
        return res.status(404).json({ message: "userId is not int" })
    if (!req.params.taskId)
        return res.status(400).json({ message: "taskId is empty" })

    const validFields = ["done", "name"]
    const updateData = {}
    for (field in req.body) {
        if (validFields.includes(field)) {
            updateData[field] = req.body[field]
        }
    }

    try {
        updateTask(req.params.userId, req.params.taskId, updateData)
        res.send({message: "ok"});
    } catch (e) {
        return res.status(400).json({ message: e })
    }
};
const { updateTask } = require('../db')

module.exports = (req, res) => {
    try {
        if (!/\d+$/.test(req.params.userId))
            return res.status(404).json({ message: "'userId' is not int" })
        if (!req.params.taskId)
            return res.status(400).json({ message: "'taskId' is empty" })

        const validFields = ["done", "name"]
        const updateData = {}
        for (field in req.body) {
            if (validFields.includes(field)) {
                updateData[field] = req.body[field]
            }
        }

        const args = [
            req.params.userId,
            req.params.taskId,
            updateData
        ]

        updateTask(...args)
        res.send({ message: "ok" });
    } catch (e) {
        return res.status(400).json({ message: e })
    }
};
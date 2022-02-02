module.exports = {
    normalizeError: (errors) => {
        if (!errors.isEmpty()) {
            return { message: errors.errors.map(err => err.msg).join(', ') }
        }
        return undefined
    }
}
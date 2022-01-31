module.exports = {
    errorsNormalize: errors => {
        return errors.errors.map(err => err.msg).join(', ')
    }
}
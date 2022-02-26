const errorHandler = (err, req, res, next) => {
    let errorMessage = "Oops! There seems to be an error"
    console.log(res.statusCode)
    const status = res.statusCode || 500
    res.status(status)
    console.log(err.message, errorMessage)
    res.json({
        message: err ? JSON.parse(err).message : errorMessage
    })
}

module.exports = {
    errorHandler
}
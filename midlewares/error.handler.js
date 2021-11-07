class Middleware {

  static errorLog(err, req, res, next) {
    console.log('errorLog')
    console.error(err);
    next(err)
  }

  static errorHandler (err, req, res, next) {
    console.log('errorHandler')
    res
      .status(500)
      .json({
        error: {
          status: 500,
          title: "internal server error",
          details: err.stack
        }
      })
  }

  static boomErrorHandler(err, req, res, next) {
    if(err.isBoom) {
      const { output } = err
      return res
        .status(output.statusCode)
        .json({
          error: output.payload
        })
    }
    next(err)
  }

}

module.exports = Middleware

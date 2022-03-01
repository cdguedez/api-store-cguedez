const express = require('express'),
      router = express.Router(),
      passport = require('passport')

router.post('/',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      res
        .status(200)
        .json({ data: req.user })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router

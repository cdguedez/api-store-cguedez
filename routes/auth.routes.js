const express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      jwt = require('jsonwebtoken'),
      config = require('../config/config')

router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user
      const payload = { sub: user.id, role: user.role, iat: Date.now() }
      const token = jwt.sign(payload, config.keyScret)
      res
        .status(200)
        .json({ data: { user, token }})
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router

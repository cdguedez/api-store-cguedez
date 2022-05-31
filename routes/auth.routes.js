const express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      jwt = require('jsonwebtoken'),
      validator = require('./../midlewares/validator.handler'),
      { login, register } = require('./../schemas/auth.schema'),
      UsersService = require('./../services/users.service'),
      config = require('../config/config'),
      service = new UsersService()

router.post('/login',
  validator.validatorHandler(login, 'body'),
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user
      const payload = { sub: user.id, role: user.role }
      const token = jwt.sign(payload, config.keyScret)
      res
        .status(200)
        .json({ data: { user, token }})
    } catch (error) {
      next(error)
    }
  }
)
router.post('/register',
  validator.validatorHandler(register, 'body'),
  async(req, res, next) => {
    try {
      const  { body } = req
      const user = await service.create(body)
      res
        .status(200)
        .json({ data: user })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router

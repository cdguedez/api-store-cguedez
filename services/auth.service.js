const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('./../config/config')
const userService = require('./users.service')
const service = new userService()
const nodemailer = require('nodemailer')

class AuthService {

  async getUser(email, password) {
    const user = await service.findByEmail(email)
    const isMatch = await bcrypt.compare(password, user.dataValues.password)
    if (!isMatch) {
      throw boom.unauthorized('unauthorized')
    }
    delete user.dataValues.password
    return user
  }

  signToken(user) {
    const payload = { sub: user.id, role: user.role }
    const token = jwt.sign(payload, config.keyScret)
    return { user, token }
  }

  async sendMail(email) {
    const user = await service.findByEmail(email)
    const transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: true, // true for 465, false for other ports
      auth: {
        user: config.smtpEmail, // generated ethereal user
        pass: config.smtpPass, // generated ethereal password
      },
    })
    const info = await transporter.sendMail({
      from: `"Carlos Guedez 👻" ${config.smtpEmail}`, // sender address
      to: `${user.email}`, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    })
    return info
  }

}

module.exports = AuthService

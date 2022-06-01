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
    delete user.dataValues.recoveryToken
    return user
  }

  signToken(user) {
    const payload = { sub: user.id, role: user.role }
    const token = jwt.sign(payload, config.keyScret)
    return { user, token }
  }

  async resetPassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.keyScret)
      const user = await service.findOne(payload.sub)
      if(user.recoveryToken !== token) {
        throw boom.unauthorized('unauthorized')
      }
      const isMatch = await bcrypt.compare(newPassword, user.password)
      if(isMatch) throw boom.notAcceptable('the password has been used before')
      const hash = await bcrypt.hash(newPassword, 10)
      await service.update(user.id, { recoveryToken: null, password: hash })
      return { message: 'password changed' }
    } catch (error) {
      throw boom.unauthorized('unauthorized')
    }
  }

  async sendRecovery(email) {
    const user = await service.findByEmail(email)
    const payload = { sub: user.id }
    const token = jwt.sign(payload, config.keyScret, { expiresIn: '10min' })
    const link = `http://localhost:3000/recovery?token=${token}`
    await service.update(user.id, { recoveryToken: token })
    const info = {
      from: `"Carlos Guedez 👻" ${config.smtpEmail}`, // sender address
      to: `${user.email}`, // list of receivers
      subject: `Hello ${user.userName} this email its for recovery password`, // Subject line
      text: "get into in this link for password changed", // plain text body
      html: `<b>get into in this <a href=${link}>Link</a> for password changed  </b>`, // html body
    }
    const rta = await this.sendMail(info)
    return rta
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: true, // true for 465, false for other ports
      auth: {
        user: config.smtpEmail, // generated ethereal user
        pass: config.smtpPass, // generated ethereal password
      },
    })
    const info = await transporter.sendMail(infoMail)
    return info.accepted
  }
}

module.exports = AuthService

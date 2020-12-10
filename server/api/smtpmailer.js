require('../../secrets')
const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
const {google} = require('googleapis')
const OAuth2 = google.auth.OAuth2

router.post('/', (req, res, next) => {
  const oauth2Client = new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    '/drafts'
  )

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
  })
  const accessToken = oauth2Client.getAccessToken()

  const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    tls: {
      rejectUnauthorized: false
    },
    auth: {
      type: 'OAuth2',
      user: req.user.email,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      accessToken: accessToken
    }
  })

  const mailOptions = {
    from: req.user.email,
    to: req.body.email,
    subject: req.body.subject,
    text: req.body.text
  }

  smtpTransport.sendMail(mailOptions, (error, response) => {
    error ? res.json(error) : res.json(response)
    smtpTransport.close()
  })
})

module.exports = router

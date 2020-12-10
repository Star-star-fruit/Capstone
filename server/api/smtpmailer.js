require('../../secrets')

const nodemailer = require('nodemailer')
const {google} = require('googleapis')
const OAuth2 = google.auth.OAuth2

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
    user: 'prakruti.pk@gmail.com',
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    accessToken: accessToken
  }
})

const mailOptions = {
  from: 'prakruti.pk@gmail.com',
  to: 'crayzee.pk@gmail.com',
  subject: 'Node.js Email with Secure OAuth',
  generateTextFromHTML: true,
  html: '<b>This is a test for LikeaBoss</b>'
}

smtpTransport.sendMail(mailOptions, (error, response) => {
  error ? console.log(error) : console.log(response)
  smtpTransport.close()
})

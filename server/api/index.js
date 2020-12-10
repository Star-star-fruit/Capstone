const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/words', require('./words'))
router.use('/drafts', require('./drafts'))
router.use('/emails', require('./smtpmailer'))
router.use('/data', require('./wordsInEmail'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

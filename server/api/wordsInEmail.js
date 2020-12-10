const router = require('express').Router()
const {User, Email, Word, Words_InEmail} = require('../db/models')

//GET /api/wordsInEmail
router.get('/', async (req, res, next) => {
  try {
    const wordsInEmail = await Words_InEmail.findAll({
      where: {
        userId: req.user.id
      }
    })
    res.send(wordsInEmail)
  } catch (error) {
    next(error)
  }
})

module.exports = router

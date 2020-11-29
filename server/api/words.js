const router = require('express').Router()
const language = require('@google-cloud/language')
const {User, Word, Email, Words_InEmail} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const client = new language.LanguageServiceClient()
    const document = {
      content: req.body.text,
      type: 'PLAIN_TEXT'
    }
    const [result] = await client.analyzeSentiment({document: document})
    const sentiment = result.documentSentiment
    res.json(sentiment)
  } catch (error) {
    next(error)
  }
})

module.exports = router

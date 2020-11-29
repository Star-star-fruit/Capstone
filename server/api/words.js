const router = require('express').Router()
module.exports = router
const language = require('@google-cloud/language')

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

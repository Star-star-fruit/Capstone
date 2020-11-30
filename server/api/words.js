const router = require('express').Router()
const language = require('@google-cloud/language')
const Sequelize = require('sequelize')
const {User, Word, Email, Words_InEmail} = require('../db/models')

router.post('/', async (req, res, next) => {
  try {
    //console.log('!!!!!!!!!!!!!!!!!!!!!HERE', req.body.text)
    // req.body = { 'sorry I dont know': '' }
    // req.body.text = undefined

    const minimisingWords = await Word.findAll({
      where: Sequelize.where(
        Sequelize.fn('LOWER', req.body.text),
        'LIKE',
        Sequelize.fn(
          'CONCAT',
          '%',
          Sequelize.fn('LOWER', Sequelize.col('word')),
          '%'
        )
      )
    })

    const client = new language.LanguageServiceClient()
    const document = {
      content: req.body.text,
      type: 'PLAIN_TEXT'
    }
    const [result] = await client.analyzeSentiment({document})
    const sentiment = result.documentSentiment
    const analysis = {minimisingWords, sentiment}
    res.json(analysis)
  } catch (error) {
    next(error)
  }
})

module.exports = router

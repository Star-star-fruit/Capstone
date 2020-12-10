const router = require('express').Router()
const language = require('@google-cloud/language')
const Sequelize = require('sequelize')
const {Word, Words_InEmail} = require('../db/models')

router.post('/', async (req, res, next) => {
  try {
    const minimizingWords = await Word.findAll({
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

    //delete Words_InEmail for that particular emailId each time in case it's been typed and backspaced from text
    await Words_InEmail.destroy({where: {emailId: req.body.emailId}})

    //emailId which is this.props.draft.id is being passed in from front-end in createSentimentAnalysis thunk for wordsinemail.create
    let wordsInEmail = []
    for (const word of minimizingWords) {
      const regex = new RegExp(word.word, 'g')
      const count = req.body.text.match(regex).length
      const minimizingWordInEmail = await Words_InEmail.create({
        wordId: word.id,
        userId: req.user.id,
        count,
        emailId: req.body.emailId
      })
      wordsInEmail.push(minimizingWordInEmail)
    }

    const client = new language.LanguageServiceClient()
    const document = {
      content: req.body.text,
      type: 'PLAIN_TEXT'
    }
    const [result] = await client.analyzeSentiment({document})
    const sentiment = result.documentSentiment
    const analysis = {minimizingWords, sentiment, wordsInEmail}
    res.json(analysis)
  } catch (error) {
    next(error)
  }
})

module.exports = router

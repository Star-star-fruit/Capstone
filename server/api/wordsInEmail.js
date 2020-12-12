const router = require('express').Router()
const {Words_InEmail, Word} = require('../db/models')

//GET /api/data
router.get('/', async (req, res, next) => {
  try {
    const wordsInEmail = await Words_InEmail.findAll({
      where: {
        userId: req.user.id
      }
    })

    const wordData = []
    let word

    for (let i = 0; i < wordsInEmail.length; i++) {
      word = await Word.findOne({
        where: {
          id: wordsInEmail[i].dataValues.wordId
        }
      })
      wordData.push({
        text: word.dataValues.word,
        value: wordsInEmail[i].dataValues.count
      })
    }

    res.send(wordData)
  } catch (error) {
    next(error)
  }
})

module.exports = router

const Sequelize = require('sequelize')
const db = require('../db')

const Words_InEmail = db.define('words_inemail', {
  wordId: {
    type: Sequelize.INTEGER
  },
  emailId: {
    type: Sequelize.INTEGER
  },
  sentiment: {
    type: Sequelize.ENUM('positive', 'negative', 'neutral')
  }
})

module.exports = Words_InEmail

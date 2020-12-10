const Sequelize = require('sequelize')
const db = require('../db')

const Words_InEmail = db.define('words_inemail', {
  wordId: {
    type: Sequelize.INTEGER
  },
  emailId: {
    type: Sequelize.INTEGER
  },
  userId: {
    type: Sequelize.INTEGER
  },
  count: {
    type: Sequelize.INTEGER
  }
})

module.exports = Words_InEmail

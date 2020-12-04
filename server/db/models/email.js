const Sequelize = require('sequelize')
const db = require('../db')

const Email = db.define('email', {
  content: {
    type: Sequelize.TEXT
  }
})

module.exports = Email

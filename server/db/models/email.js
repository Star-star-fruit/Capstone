const Sequelize = require('sequelize')
const db = require('../db')

const Email = db.define('email', {
  email: {
    type: Sequelize.TEXT
  },
  count: {
    type: Sequelize.INTEGER
  }
})

module.exports = Email

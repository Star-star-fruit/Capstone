const Sequelize = require('sequelize')
const db = require('../db')

const Email = db.define('email', {
  content: {
    type: Sequelize.TEXT
  },
  createdAt: {
    type: Sequelize.DATEONLY,
    field: 'created_at',
    timestamps: false
  },
  updatedAt: {
    type: Sequelize.DATEONLY,
    field: 'created_at',
    timestamps: false
  }
})

module.exports = Email

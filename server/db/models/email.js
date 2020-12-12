const Sequelize = require('sequelize')
const db = require('../db')
const moment = require('moment-timezone')
const Email = db.define('email', {
  content: {
    type: Sequelize.TEXT
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    get() {
      return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY h:mm:ss')
    },
    field: 'createdAt'
  },
  updatedAt: {
    type: Sequelize.DATEONLY,
    field: 'created_at',
    timestamps: false
  }
})
module.exports = Email

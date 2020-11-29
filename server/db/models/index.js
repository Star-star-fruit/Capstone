const User = require('./user')
const Word = require('./word')
const Email = require('./email')

User.hasMany(Email)
Email.belongsTo(User)
Email.hasMany(Word)

module.exports = {
  User,
  Email,
  Word
}

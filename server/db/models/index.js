const User = require('./user')
const Word = require('./word')
const Email = require('./email')
const Words_InEmail = require('./wordsInEmail')

User.hasMany(Email)
Email.belongsTo(User)
Email.belongsToMany(Word, {through: Words_InEmail})
Word.belongsToMany(Email, {through: Words_InEmail})

module.exports = {
  User,
  Email,
  Word,
  Words_InEmail
}

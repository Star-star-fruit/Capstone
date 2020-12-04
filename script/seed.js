'use strict'

const db = require('../server/db')
const {User, Email, Word, Words_InEmail} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Elisa',
      lastName: 'Levet',
      email: 'elisa@hotmail.com',
      password: 'elisa'
    }),
    User.create({
      firstName: 'Stuart',
      lastName: 'Ruston',
      email: 'stuart@hotmail.com',
      password: 'stuart'
    }),
    User.create({
      firstName: 'Paty',
      lastName: 'Lavin',
      email: 'paty@hotmail.com',
      password: 'paty'
    })
  ])

  const emails = await Promise.all([
    Email.create({
      email:
        'Hello, I apologize for arriving 5 minutes late to our meeting, I was walking back from lunch. I was wondering if I could possibly have a one-day extension for the styling of our website. I am no expert in UI design, but it seems like the styles are not applying to some of our components. I feel it is due to a bug. I’m sorry about this delay.',
      count: 2,
      userId: 1
    }),
    Email.create({
      email:
        'Hi, I don’t know if this is right, but I have found a merge conflict from your pull request that I feel you need you to resolve. It seems like you deleted an important part of our server/index. I just want to let you know so we can continue with our project.',
      count: 1,
      userId: 2
    }),
    Email.create({
      email:
        'Hello, I have no idea if this is a good point, but I saw an opportunity to organize our styles sheet into smaller files. I believe doing so will prevent future source control conflicts.  Am I making sense? I kind of thought it was a good idea.',
      count: 1,
      userId: 2
    })
  ])

  const words = await Promise.all([
    Word.create({
      word: 'sorry'
    }),
    Word.create({
      word: 'sorry about that'
    }),
    Word.create({
      word: 'expert'
    }),
    Word.create({
      word: 'I am no expert'
    }),
    Word.create({
      word: 'I am not an expert'
    }),
    Word.create({
      word: 'I apologize'
    }),
    Word.create({
      word: 'apologize'
    }),
    Word.create({
      word: 'I believe'
    }),
    Word.create({
      word: 'I feel'
    }),
    Word.create({
      word: 'just'
    }),
    Word.create({
      word: 'I just think'
    }),
    Word.create({
      word: 'possibly'
    }),
    Word.create({
      word: 'kind of'
    }),
    Word.create({
      word: 'it is likely'
    }),
    Word.create({
      word: 'make sense'
    }),
    Word.create({
      word: 'Am I making sense'
    }),
    Word.create({
      word: 'am I making sense'
    }),
    Word.create({
      word: "I don't know if this is right"
    }),
    Word.create({
      word: 'I might be wrong'
    }),
    Word.create({
      word: 'It is my fault'
    }),
    Word.create({
      word: 'It was my fault'
    }),
    Word.create({
      word: 'sort of like'
    }),
    Word.create({
      word: 'just wondering'
    }),
    Word.create({
      word: 'actually'
    }),
    Word.create({
      word: 'I will try my best'
    }),
    Word.create({
      word: 'I am not sure'
    }),
    Word.create({
      word: 'I have no idea if'
    })
  ])

  const words_inemail = await Promise.all([
    Words_InEmail.create({
      wordId: 2,
      emailId: 1,
      sentiment: 'negative'
    }),
    Words_InEmail.create({
      wordId: 2,
      emailId: 2,
      sentiment: 'negative'
    }),
    Words_InEmail.create({
      wordId: 1,
      emailId: 2,
      sentiment: 'negative'
    }),
    Words_InEmail.create({
      wordId: 5,
      emailId: 1,
      sentiment: 'negative'
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

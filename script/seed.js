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
      password: '12345!'
    }),
    User.create({
      firstName: 'Stuart',
      lastName: 'Ruston',
      email: 'stuart@hotmail.com',
      password: '123456'
    }),
    User.create({
      firstName: 'Paty',
      lastName: 'Lavin',
      email: 'paty@hotmail.com',
      password: '123'
    })
  ])

  const emails = await Promise.all([
    Email.create({
      content:
        'Im holding on your rope, got me ten feet off the ground and Im hearing what you say, but I just cant make a sound. You tell me that you need me, then you go and cut me down, but wait. You tell me that youre sorry Did not think I would turn around, and say That it is too late to apologize, its too late I said it is too late to apologize, its too late I would take another chance, take a fall Take a shot for you And I need you like a heart needs a beat But its nothing new, yeah, yeah I loved you with a fire red Now its turning blue, and you say Sorry like the angel heaven let me think was you But Im afraid Its too late to apologize, its too late I said its too late to apologize, its too late, whoa Its too late to apologize, its too late I said its too late to apologize, its too late I said its too late to apologize, yeah I said its too late to apologize, yeah Im holding on your rope, got me ten feet off the ground',
      count: 2,
      userId: 1
    }),
    Email.create({
      content:
        'Hello, its me I was wondering if after all these years you would like to meet To go over everything They say that time is supposed to heal ya But I aint done much healing Hello, can you hear me? Im in California dreaming about who we used to be When we were younger and free Ive forgotten how it felt before the world fell at our feet Theres such a difference between us And a million miles Hello from the other side I mustve called a thousand times To tell you Im sorry For everything that Ive done But when I call you never Seem to be home Hello from the outside At least I can say that Ive tried To tell you Im sorry For breaking your heart But it dont matter, it clearly Doesnt tear you apart anymore Hello, how are you? Its so typical of me to talk about',
      count: 1,
      userId: 2
    })
  ])

  const words = await Promise.all([
    Word.create({
      word: 'sorry'
    }),
    Word.create({
      word: 'expert'
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
      word: 'possibly'
    }),
    Word.create({
      word: 'kind of'
    }),
    Word.create({
      word: 'it is likely'
    }),
    Word.create({
      word: 'I make sense'
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

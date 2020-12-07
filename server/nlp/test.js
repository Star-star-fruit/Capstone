async function quickstart() {
  //   // Imports the Google Cloud client library
  //   const language = require('@google-cloud/language')

  //   // Instantiates a client
  //   const client = new language.LanguageServiceClient()

  //   // The text to analyze
  //   const text = 'Hello, I am very disappointed and sad'

  //   const document = {
  //     content: text,
  //     type: 'PLAIN_TEXT'
  //   }

  //   // Detects the sentiment of the text
  //   const [result] = await client.analyzeSentiment({document: document})
  //   const sentiment = result.documentSentiment

  //   console.log(`Text: ${text}`)
  //   console.log(`Sentiment score: ${sentiment.score}`)
  //   console.log(`Sentiment magnitude: ${sentiment.magnitude}`)
  // }

  // quickstart().catch(console.error)

  // Imports the Google Cloud client library
  const language = require('@google-cloud/language')

  // Creates a client
  const client = new language.LanguageServiceClient()

  /**
   * TODO(developer): Uncomment the following line to run this code.
   */
  const text = `Hello, it's me. I was wondering if after all these years you'd like to meet to go over everything. They say that time's supposed to heal ya, but I ain't done much healing. Hello, can you hear me? I'm in California dreaming about who we used to be when we were younger and free. I've forgotten how it felt before the world fell at our feet. There's such a difference between us and a million miles. Hello from the other side, I must've called a thousand times to tell you I'm sorry for everything that I've done, but when I call you never seem to be home. Hello from the outside; at least I can say that I've tried to tell you I'm sorry for breaking your heart, but it don't matter, it clearly doesn't tear you apart anymore. Hello, how are you? It's so typical of me to talk about myself, I'm sorry.`

  // Prepares a document, representing the provided text
  const document = {
    content: text,
    type: 'PLAIN_TEXT'
  }

  // Detects sentiment of entities in the document
  try {
    const [result] = await client.analyzeEntitySentiment({document})
  } catch (error) {
    console.error('Error occured while analyzing sentiment: ', error)
  }
  const entities = result.entities

  console.log('Entities and sentiments:')
  entities.forEach(entity => {
    console.log(`  Name: ${entity.name}`)
    console.log(`  Type: ${entity.type}`)
    console.log(`  Score: ${entity.sentiment.score}`)
    console.log(`  Magnitude: ${entity.sentiment.magnitude}`)
  })
}

quickstart().catch(console.error)

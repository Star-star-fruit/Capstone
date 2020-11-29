
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
  // const text = 'Your text to analyze, e.g. Hello, world!';

  // Prepares a document, representing the provided text
  const document = {
    content: text,
    type: 'PLAIN_TEXT'
  }

  // Detects sentiment of entities in the document
  const [result] = await client.analyzeEntitySentiment({document})
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

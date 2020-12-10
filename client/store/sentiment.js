import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_SENTIMENT_ANALYSIS = 'SET_SENTIMENT_ANALYSIS'

/**
 * ACTION CREATORS
 */
const setSentimentAnalysis = sentimentAnalysis => ({
  type: SET_SENTIMENT_ANALYSIS,
  sentimentAnalysis
})

/**
 * THUNK CREATORS
 */
export const createSentimentAnalysis = (text, emailId) => async dispatch => {
  try {
    const {data: analysis} = await axios.post('/api/words', {text, emailId})
    dispatch(setSentimentAnalysis(analysis.sentiment))
  } catch (error) {
    console.error('Error occured while getting sentiment analysis --> ', error)
  }
}

//default state
const defaultAnalysis = {}

/**
 * REDUCER
 */
const sentiment = (state = defaultAnalysis, action) => {
  switch (action.type) {
    case SET_SENTIMENT_ANALYSIS:
      return action.sentimentAnalysis
    default:
      return state
  }
}

export default sentiment

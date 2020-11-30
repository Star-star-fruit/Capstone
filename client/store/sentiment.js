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
export const getSentimentAnalysis = text => async dispatch => {
  try {
    const {data: analysis} = await axios.post('/api/words', {text})
    console.log('RES --> ', analysis)

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
export default function sentimentAnalysisReducer(
  state = defaultAnalysis,
  action
) {
  switch (action.type) {
    case SET_SENTIMENT_ANALYSIS:
      return action.sentimentAnalysis
    default:
      return state
  }
}

import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_MINIMIZING_WORDS = 'SET_MINIMIZING_WORDS'

/**
 * ACTION CREATORS
 */
const setMinimizingWords = minimizingWords => ({
  type: SET_MINIMIZING_WORDS,
  minimizingWords
})

/**
 * THUNK CREATORS
 */
export const getMinimizingWords = text => async dispatch => {
  try {
    const {data: analysis} = await axios.post('/api/words', {text})
    console.log('RES --> ', analysis)
    console.log('minimizing words --> ', analysis.minimisingWords)

    dispatch(setMinimizingWords(analysis.minimisingWords))
  } catch (error) {
    console.error('Error occured while getting minimizing words --> ', error)
  }
}

//default state
const defaultWords = []

/**
 * REDUCER
 */
export default function minimizingWordsReducer(state = defaultWords, action) {
  switch (action.type) {
    case SET_MINIMIZING_WORDS:
      return action.minimizingWords
    default:
      return state
  }
}

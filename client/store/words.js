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
export const createMinimizingWords = text => async dispatch => {
  try {
    const {data: analysis} = await axios.post('/api/words', {text})
    dispatch(setMinimizingWords(analysis.minimizingWords))
  } catch (error) {
    console.error('Error occured while getting minimizing words --> ', error)
  }
}

//default state
const defaultWords = []

/**
 * REDUCER
 */
const words = (state = defaultWords, action) => {
  switch (action.type) {
    case SET_MINIMIZING_WORDS:
      return action.minimizingWords
    default:
      return state
  }
}

export default words

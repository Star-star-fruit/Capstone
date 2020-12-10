import axios from 'axios'

//ACTION TYPE

const SET_WORDS_IN_EMAIL = 'SET_WORDS_IN_EMAIL'

//ACTION CREATOR

const setWordsInEmail = wordsInEmail => ({
  type: SET_WORDS_IN_EMAIL,
  wordsInEmail
})

//THUNK
export const fetchWordsInEmail = () => async dispatch => {
  try {
    const {data: wordsInEmail} = await axios.get('/api/wordsInEmail')
    dispatch(setWordsInEmail(wordsInEmail))
  } catch (error) {
    console.error(
      'Error occured while fetching frequently used words in email: ',
      error
    )
  }
}

//INITIAL STATE

const initialState = {}

//REDUCER

export default function wordsInEmail(state = initialState, action) {
  switch (action.type) {
    case SET_WORDS_IN_EMAIL:
      return action.wordsInEmail
    default:
      return state
  }
}

import axios from 'axios'

//ACTION TYPE

const SET_WORD_DATA = 'SET_WORD_DATA'

//ACTION CREATOR

const setWordData = wordData => ({
  type: SET_WORD_DATA,
  wordData
})

//THUNK
export const fetchWordData = () => async dispatch => {
  try {
    const {data: wordData} = await axios.get('/api/data')
    dispatch(setWordData(wordData))
  } catch (error) {
    console.error(
      'Error occured while fetching frequently used words in email: ',
      error
    )
  }
}

//INITIAL STATE

const initialState = []

//REDUCER

export default function wordData(state = initialState, action) {
  switch (action.type) {
    case SET_WORD_DATA:
      return action.wordData
    default:
      return state
  }
}

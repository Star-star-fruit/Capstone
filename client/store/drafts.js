import axios from 'axios'

//ACTION TYPE

const SET_DRAFTS = 'SET_DRAFTS'
export const SET_NEW_DRAFT = 'SET_NEW_DRAFT'
const DELETE_DRAFT = 'DELETE_DRAFT'

//ACTION CONSTANTS

export const setDrafts = drafts => {
  return {
    type: SET_DRAFTS,
    drafts
  }
}

export const setNewDraft = draft => {
  return {
    type: SET_NEW_DRAFT,
    draft
  }
}

export const deleteDraft = draftId => {
  return {
    type: DELETE_DRAFT,
    draftId
  }
}

//THUNK CREATORS

export const fetchDrafts = () => {
  return async dispatch => {
    try {
      const {data: drafts} = await axios.get('/api/drafts')
      dispatch(setDrafts(drafts))
    } catch (err) {
      console.error('There was a problem retreiving your drafts!')
      console.error(err)
    }
  }
}

export const postNewDraft = draft => {
  return async dispatch => {
    try {
      const {data: newDraft} = await axios.post('/api/drafts', draft)
      dispatch(setNewDraft(newDraft))
    } catch (err) {
      console.error('There was a problem creating this draft!')
      console.error(err)
    }
  }
}

export const deleteAllDrafts = () => {
  return async dispatch => {
    try {
      await axios.delete('/api/drafts')
      dispatch(setDrafts([]))
    } catch (err) {
      console.error('There was a problem deleting your drafts!')
      console.error(err)
    }
  }
}

export const deleteSingleDraft = draftId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/drafts/${draftId}`)
      dispatch(deleteDraft(draftId))
    } catch (err) {
      console.error('There was a problem deleting this draft!')
      console.error(err)
    }
  }
}

//INITIAL STATE

const initialState = []

//REDUCER

const drafts = (state = initialState, action) => {
  switch (action.type) {
    case SET_DRAFTS:
      return action.drafts
    case SET_NEW_DRAFT:
      return [...state, action.draft]
    case DELETE_DRAFT:
      return state.filter(draft => draft.id !== action.draftId)
    default:
      return state
  }
}

export default drafts

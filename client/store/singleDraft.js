import axios from 'axios'
import {SET_NEW_DRAFT} from './drafts'

//ACTION TYPE

const GET_SINGLE_DRAFT = 'GET_SINGLE_DRAFT'
const UPDATE_DRAFT = 'UPDATE_DRAFT'

//ACTION CREATORS

export const getSingleDraft = draft => {
  return {
    type: GET_SINGLE_DRAFT,
    draft
  }
}

export const updateDraft = draft => {
  return {
    type: UPDATE_DRAFT,
    draft
  }
}

//THUNK CREATORS

export const fetchDraft = draftId => {
  return async dispatch => {
    try {
      const {data: draft} = await axios.get(`/api/drafts/${draftId}`)
      dispatch(getSingleDraft(draft))
    } catch (err) {
      console.error('There was a problem fetching this draft!')
      console.error(err)
    }
  }
}

export const updateExistingDraft = draft => {
  return async dispatch => {
    try {
      const {data: updatedContent} = await axios.put(
        `/api/drafts/${draft.id}`,
        draft
      )
      dispatch(updateDraft(updatedContent))
    } catch (err) {
      console.error('There was a problem updating this draft!')
      console.error(err)
    }
  }
}

//INITIAL STATE

const initialState = {}

//REDUCER

const singleDraft = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEW_DRAFT:
      return action.draft
    case GET_SINGLE_DRAFT:
      return action.draft
    case UPDATE_DRAFT:
      return action.draft
    default:
      return state
  }
}

export default singleDraft

import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import sentiment from './sentiment'
import words from './words'
import drafts from './drafts'
import singleDraft from './singleDraft'
import wordsInEmail from './wordsInEmail'

const reducer = combineReducers({
  user,
  sentiment,
  words,
  drafts,
  singleDraft,
  wordsInEmail
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'

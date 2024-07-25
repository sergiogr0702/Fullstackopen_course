import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(a =>
        a.id === id? changedAnecdote : a
      )
    },
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { voteAnecdote, addAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.create(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const updateAnecdote = (content) => {
  return async dispatch => {
    const updatedAnecdote = await anecdotesService.update(content)
    dispatch(voteAnecdote(updatedAnecdote.id))
  }
}

export default anecdoteSlice.reducer
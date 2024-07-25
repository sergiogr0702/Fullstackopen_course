import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = () => 
          axios.get(baseUrl).then((response) => response.data)

export const create = anecdote => 
          axios.post(baseUrl, anecdote).then(response => response.data)

export const update = updatedAnecdote => 
          axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote).then(response => response.data)
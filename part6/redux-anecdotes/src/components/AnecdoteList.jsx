import { createSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux'
import { updateAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const selectAnecdotes = (state) => state.anecdotes
    const selectFilter = (state) => state.filter
    const memoizedAnecdotes = createSelector(
        [selectAnecdotes, selectFilter],
        (anecdotes, filter) => {
          return anecdotes
            .filter(anecdote => anecdote.content.includes(filter))
            .sort((a, b) => b.votes - a.votes)
        }
    )

    const anecdotes = useSelector(memoizedAnecdotes)
    const dispatch = useDispatch()
  
    const vote = (id) => {
      const anecdote = anecdotes.find(a => a.id === id)
      const updatedAnecdotes = {...anecdote, votes: anecdote.votes + 1}
      dispatch(updateAnecdote(updatedAnecdotes))
      dispatch(setNotification(`You voted '${anecdote.content}'`, 5))
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList
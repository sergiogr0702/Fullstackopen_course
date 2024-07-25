import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../store/NotificationContext'
import { create } from '../services/anecdotes'

const AnecdoteForm = () => {
    const queryClient = useQueryClient()
    const dispatch = useNotificationDispatch()

    const newAnecdoteMutation = useMutation({
      mutationFn: create,
      onSuccess: (newAnecdote) => {
        const anecdotes = queryClient.getQueryData(['anecdotes'])
        queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
        dispatch({
          type: 'SET_NOTIFICATION',
          payload: `New anecdote '${newAnecdote.content}' created`,
        })
        setTimeout(() => {
          dispatch({
            type: 'SET_NOTIFICATION',
            payload: null,
          })
        }, 5000);
        //queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      },
      onError: (err) => {
        dispatch({
          type: 'SET_NOTIFICATION',
          payload: `Failed to create anecdote: ${err.message}`,
        })
        setTimeout(() => {
          dispatch({
            type: 'SET_NOTIFICATION',
            payload: null,
          })
        }, 5000);
      }
    })

    const handleCreateNote = async (e) => {
      e.preventDefault()
      const content = e.target.anecdote.value
      e.target.anecdote.value = ''
      newAnecdoteMutation.mutate({
        content,
        votes: 0
      })
    }
  
    return (
      <div>
        <h3>create new</h3>
        <form onSubmit={handleCreateNote}>
          <input name='anecdote' />
          <button type="submit">create</button>
        </form>
      </div>
    )
  }
  
  export default AnecdoteForm
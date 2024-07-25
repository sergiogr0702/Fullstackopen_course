import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from './store/NotificationContext'
import { getAll, update } from './services/anecdotes'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const updateAnecdoteMutation = useMutation({
    mutationFn: update,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map((anecdote) => {
        if (anecdote.id === updatedAnecdote.id) {
          return updatedAnecdote
        }
        return anecdote
      }))
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: `Anecdote '${updatedAnecdote.content}' updated`,
      })
      setTimeout(() => {
        dispatch({
          type: 'SET_NOTIFICATION',
          payload: null,
        })
      }, 5000);
      //queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const { data: anecdotes, isLoading, error, isSuccess }= useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    refetchOnWindowFocus: false,
    retry: 1,
  })

  if (isLoading) return (
    <div>Loading...</div>
  )

  if (error) return (
    <div>Anecdote service not available due to problems in the server</div>
  )

  if (isSuccess) {  
    const handleVote = (anecdote) => {
      updateAnecdoteMutation.mutate({
        ...anecdote,
        votes: anecdote.votes + 1
      })
    }

    return (
      <div>
        <h3>Anecdote app</h3>
      
        <Notification />
        <AnecdoteForm />
      
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
    )
  }

  return null
}

export default App
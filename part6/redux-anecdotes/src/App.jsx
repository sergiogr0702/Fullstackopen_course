import { useEffect } from "react"
import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import Filter from "./components/Filter"
import { useDispatch, useSelector } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  const notificationContainerStyle = {
    display: notification? 'block' : 'none',
    backgroundColor: 'lightgray',
    border: '1px solid black',
    padding: '10px',
    marginBottom: '10px',
  }

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <div style={notificationContainerStyle}>
        {notification}
      </div>

      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
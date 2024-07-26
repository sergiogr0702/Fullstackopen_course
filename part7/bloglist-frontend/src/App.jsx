import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUser } from './reducers/userReducer'
import MainPage from './components/MainPage'
import Login from './components/Login'

function App() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  return <div className="container">{user ? <MainPage /> : <Login />}</div>
}

export default App

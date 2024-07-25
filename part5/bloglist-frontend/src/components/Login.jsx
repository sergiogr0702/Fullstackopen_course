import PropTypes from 'prop-types'
import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import Notification from './Notification'

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [notificationClass, setNotificationClass] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (err) {
      console.error('Error logging in:', err)
      setMessage('Invalid username or password')
      setNotificationClass('error')
      setTimeout(() => {
        setMessage(null)
        setNotificationClass(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <Notification message={message} classes={notificationClass} />
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            data-testid='username'
            type="text"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            data-testid='password'
            type="password"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
        <br />
        <input type="submit" value="Log in" />
      </form>
    </div>
  )
}

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
}

export default Login
import { logoutUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

export const handleError = (err, dispatch) => {
  const errorMsg = err.response?.data?.error || 'An error occurred'
  console.error('Error:', err)
  if (errorMsg.includes('token expired')) {
    dispatch(logoutUser())
    dispatch(
      setNotification(
        { message: 'Session expired. Please log in again.', class: 'error' },
        5
      )
    )
  } else {
    dispatch(
      setNotification({ message: `Error: ${errorMsg}`, class: 'error' }, 5)
    )
  }
}

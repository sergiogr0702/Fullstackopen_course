import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification) {
    return null
  }

  if (notification.class === 'error') {
    return <Alert variant="danger">{notification.message}</Alert>
  } else {
    return <Alert variant="success">{notification.message}</Alert>
  }
}

export default Notification

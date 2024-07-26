import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { loginUser } from '../reducers/userReducer'
import Notification from './Notification'

const Login = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    dispatch(loginUser(username, password))

    setUsername('')
    setPassword('')
  }

  return (
    <Row className="align-items-center mt-3">
      <Col xs={12} md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
        <h2>Log in to application</h2>
        <Notification />
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Username:</Form.Label>
            <Form.Control
              data-testid="username"
              type="text"
              name="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              data-testid="password"
              type="password"
              name="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </Form.Group>
          <Button className="mt-3" variant="primary" type="submit">
            Log in
          </Button>
        </Form>
      </Col>
    </Row>
  )
}

export default Login

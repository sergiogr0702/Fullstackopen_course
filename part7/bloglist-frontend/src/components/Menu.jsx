import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { logoutUser } from '../reducers/userReducer'

const Menu = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const menuContainer = {
    display: 'flex',
    backgroundColor: 'lightgray',
    padding: 5,
    alignItems: 'center',
    marginBottom: 10,
  }

  const padding = {
    paddingRight: 5,
  }
  return (
    <Navbar
      className="mb-2"
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto align-items-center">
          <Nav.Link href="#" as="span">
            <Link to="/" style={padding}>
              Blogs
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to="/Users" style={padding}>
              Users
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <em className="">
              {' '}
              {user.name} logged in{' '}
              <Button
                type="button"
                variant="light"
                onClick={() => dispatch(logoutUser())}
              >
                Log out
              </Button>
            </em>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu

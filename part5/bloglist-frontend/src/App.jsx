import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import BlogPage from './components/BlogPage'
import Login from './components/Login'

function App() {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const isTokenExpired = token => Date.now() >= (JSON.parse(atob(token.split('.')[1]))).exp * 1000

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAll()
        setBlogs(blogs)
      } catch (err) {
        console.error('Error fetching blogs:', err)
      }
    }

    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      if (isTokenExpired(user.token)) {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
      } else {
        setUser(user)
        blogService.setToken(user.token)
      }
    }
  },[])

  return (
    <div>
      {
        user ?
          <BlogPage user={user} setUser={setUser} blogs={blogs} setBlogs={setBlogs} />
          :
          <Login setUser={setUser} />
      }
    </div>
  )
}

export default App

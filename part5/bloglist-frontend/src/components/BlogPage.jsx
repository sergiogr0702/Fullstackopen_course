import PropTypes from 'prop-types'
import { useState, useRef } from 'react'
import blogService from '../services/blogs'
import Notification from './Notification'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'

const BlogPage = ({ user, blogs, setBlogs, setUser }) => {
  const [message, setMessage] = useState(null)
  const [notificationClass, setNotificationClass] = useState(null)
  const blogFormRef = useRef()

  const handleNotification = (msg, type) => {
    setMessage(msg)
    setNotificationClass(type)
    setTimeout(() => {
      setMessage(null)
      setNotificationClass(null)
    }, 5000)
  }

  const handleError = (err) => {
    const errorMsg = err.response?.data?.error || 'An error occurred'
    console.error('Error:', err)
    if (errorMsg.includes('token expired')) {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
      handleNotification('Session expired. Please log in again.', 'error')
    } else {
      handleNotification(`Error: ${errorMsg}`, 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload(true)
  }

  const createNewBlog = async (title, author, url) => {
    try{
      const newBlog = {
        title,
        author,
        url,
      }

      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))

      blogFormRef.current.toggleVisibility()

      handleNotification(`A new blog '${title}' by ${author} added.`, 'success')
    } catch (err) {
      handleError(err)
    }
  }

  const updateBlog = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog.id, blog)
      setBlogs(blogs.map(b => b.id === blog.id? updatedBlog : b))

      handleNotification(`Blog '${blog.title}' by ${blog.author} updated.`, 'success')
    } catch (err) {
      handleError(err)
    }
  }

  const deleteBlog = async (blog) => {
    try {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id!== blog.id))

      handleNotification(`Blog '${blog.title}' by ${blog.author} removed.`, 'success')
    } catch (err) {
      handleError(err)
    }
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message} classes={notificationClass} />
      <p>{user.name} logged in <button type='button' onClick={handleLogout}>Log out</button></p>

      <Togglable buttonLabel='New blog' ref={blogFormRef}>
        <BlogForm createNewBlog={createNewBlog} />
      </Togglable>

      <div data-testid='blogsContainer'>
        {
          blogs.sort(function (a, b) {
            return b.likes - a.likes
          })
            .map(blog =>
              <Blog key={blog.id} user={user} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />
            )
        }
      </div>
    </div>
  )
}

BlogPage.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
}

export default BlogPage
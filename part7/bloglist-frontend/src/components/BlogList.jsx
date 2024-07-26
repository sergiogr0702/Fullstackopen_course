import PropTypes from 'prop-types'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { Table } from 'react-bootstrap'
import Togglable from './Togglable'
import { setNotification } from '../reducers/notificationReducer'
import { handleError } from '../utils'
import blogService from '../services/blogs'
import BlogForm from './BlogForm'

const BlogList = ({ blogs }) => {
  const queryClient = useQueryClient()
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const createBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      blogFormRef.current.toggleVisibility()
      const oldBlogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], [...oldBlogs, newBlog])
      dispatch(
        setNotification(
          {
            message: `New blog '${newBlog.title}' by ${newBlog.author} added.`,
            class: 'success',
          },
          5
        )
      )
    },
    onError: (err) => {
      handleError(err, dispatch)
    },
  })

  const createNewBlog = async (title, author, url) => {
    createBlogMutation.mutate({
      title,
      author,
      url,
    })
  }

  return (
    <div>
      <Togglable buttonLabel="New blog" ref={blogFormRef}>
        <BlogForm createNewBlog={createNewBlog} />
      </Togglable>

      <Table striped>
        <tbody>
          {blogs
            .sort(function (a, b) {
              return b.likes - a.likes
            })
            .map((blog) => (
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </td>
                <td>{blog.author}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
}

export default BlogList

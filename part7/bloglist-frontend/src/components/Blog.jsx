import PropTypes from 'prop-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { handleError } from '../utils'
import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedblog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((blog) => {
          if (blog.id === updatedblog.id) {
            return updatedblog
          }
          return blog
        })
      )
      dispatch(
        setNotification(
          {
            message: `Blog '${updatedblog.title}' by ${updatedblog.author} updated.`,
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

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs', 'all'])
      dispatch(
        setNotification(
          {
            message: 'Blog deleted.',
            class: 'success',
          },
          5
        )
      )
      navigate('/')
    },
    onError: (err) => {
      handleError(err, dispatch)
    },
  })

  const createCommentMutation = useMutation({
    mutationFn: blogService.addComment,
    onSuccess: (updatedblog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((blog) => {
          if (blog.id === updatedblog.id) {
            return updatedblog
          }
          return blog
        })
      )
      dispatch(
        setNotification(
          {
            message: `Comment added to '${updatedblog.title}' by ${updatedblog.author}.`,
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

  if (!blog) {
    return null
  }

  const handleLikesUpdate = async () => {
    const updatedBlog = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    }

    updateBlogMutation.mutate(updatedBlog)
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`)) {
      deleteBlogMutation.mutate(blog)
    }
  }

  const handleAddComment = (e) => {
    e.preventDefault()
    const comment = e.target.comment.value.trim()
    if (comment) {
      createCommentMutation.mutate({ blogId: blog.id, comment: comment })
      e.target.comment.value = ''
    }
  }

  return (
    <div className="mt-5" data-testid={blog.title}>
      <div>
        <h1 className="titleExpanded">{blog.title}</h1>
        <a className="urlExpanded">{blog.url}</a>
        <p className="likesExpanded">likes {blog.likes}</p>
        <Button
          variant="secondary"
          className="likeButton"
          type="button"
          onClick={handleLikesUpdate}
        >
          Like
        </Button>
        <p className="authorExpanded">added by {blog.author}</p>
        {user.id === blog.user && (
          <Button
            variant="danger"
            className="deleteButton"
            type="button"
            onClick={handleDelete}
          >
            Remove
          </Button>
        )}
        <h4 className="mt-3">Comments</h4>
        <Form onSubmit={handleAddComment}>
          <Form.Group>
            <Row flex>
              <Col>
                <Form.Label htmlFor="comment">Comment:</Form.Label>
              </Col>
              <Col>
                <Form.Control size="" type="text" id="comment" name="comment" />
              </Col>
              <Col>
                <Button type="submit">Add comment</Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
        <ul className="mt-3">
          {blog.comments.map((comment, index) => (
            <li key={index}>
              <p>{comment}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object,
}

export default Blog

import PropTypes from 'prop-types'
import { useState } from 'react'

const Blog = ({ user, blog, updateBlog, deleteBlog }) => {
  const [ showDetails, setShowDetails] = useState(false)

  const handleLikesUpdate = async () => {
    const updatedBlog = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    await updateBlog(updatedBlog)
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`)) {
      await deleteBlog(blog)
    }
  }

  return (
    <div data-testid={blog.title} className='blogContainer'>
      {
        showDetails ? (
          <div>
            <p className='titleExpanded'>{blog.title}</p> <button className='hideButton' type='button' onClick={() => setShowDetails(!showDetails)}>Hide</button>
            <p className='urlExpanded'>{blog.url}</p>
            <p className='likesExpanded'>likes {blog.likes}</p> <button className='likeButton' type='button' onClick={handleLikesUpdate}>Like</button>
            <p className='authorExpanded'>{blog.author}</p>
            {user.id === blog.user && <button className='deleteButton' type='button' onClick={handleDelete}>Remove</button>}
          </div>
        ) : (
          <div>
            <p className='title'>{blog.title}</p> <p className='author'>{blog.author}</p> <button className='showButton' type='button' onClick={() => setShowDetails(!showDetails)}>View</button>
          </div>
        )
      }
    </div>
  )
}

Blog.propTypes = {
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default Blog
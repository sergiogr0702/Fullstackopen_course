import PropTypes from 'prop-types'
import { useState } from 'react'

const BlogForm = ({ createNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    await createNewBlog(title, author, url)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Title: <input
            id="blogTitle"
            data-testid='blogTitle'
            type="text"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author: <input
            id="blogAuthor"
            data-testid='blogAuthor'
            type="text"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          URL: <input
            id="blogUrl"
            data-testid='blogUrl'
            type="text"
            name="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createNewBlog: PropTypes.func.isRequired,
}

export default BlogForm
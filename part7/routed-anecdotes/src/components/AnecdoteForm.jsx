import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const AnecdoteForm = ({addNew}) => {
    const navigate = useNavigate()

    const content = useField('text')
    const author = useField('text')
    const info = useField('text')  
  
    const handleSubmit = (e) => {
      e.preventDefault()
      const contentValue = content.value
      const authorValue = author.value
      const infoValue = info.value

      addNew({
        content: contentValue,
        author: authorValue,
        info: infoValue,
        votes: 0
      })
      navigate('/')
    }

    const handleReset = () => {
      content.reset()
      author.reset()
      info.reset()
    }
    
    const buttonFlexContainerStyle = {
      display: 'flex',
    }

    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input 
              value={content.value}
              type={content.type}
              onChange={content.onChange}
            />
          </div>
          <div>
            author
            <input
              value={author.value}
              type={author.type}
              onChange={author.onChange}
            />
          </div>
          <div>
            url for more info
            <input
              value={info.value}
              type={info.type}
              onChange={info.onChange}
            />
          </div>
          <div style={buttonFlexContainerStyle}>
            <button type='submit'>Create</button>
            <button type='button' onClick={handleReset}>Reset</button>
          </div>
        </form>
      </div>
    ) 
}

AnecdoteForm.propTypes = {
  addNew: PropTypes.func.isRequired
}

export default AnecdoteForm
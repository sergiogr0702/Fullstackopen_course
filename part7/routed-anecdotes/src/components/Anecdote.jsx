import PropTypes from 'prop-types'

const Anecdote = ({anecdote}) => {
    return (
        <div>
            <h3>{anecdote.content}</h3>
            <p>by {anecdote.author}</p>
            <p><a href={anecdote.info}>Link to more info</a></p>
            <p>Votes: {anecdote.votes}</p>
        </div>
    )
}

Anecdote.propTypes = {
    anecdote: PropTypes.shape({
        id: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        info: PropTypes.string.isRequired,
        votes: PropTypes.number.isRequired
    })
}

export default Anecdote
import { useState } from "react"
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
    const [anecdote, setAnecdote] = useState('')
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            dispatch(createAnecdote(anecdote))
            dispatch(setNotification(`New anecdote '${anecdote}' added`), 5)
            setAnecdote('')
        } catch (err) {
            console.error('Failed to create anecdote:', err)
        }
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="newAnecdote"
                        value={anecdote}
                        onChange={(e) => setAnecdote(e.target.value)}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
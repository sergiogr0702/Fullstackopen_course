import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  const handleNextAnecdoteClick = () => {
    const newAnecdote = Math.floor(Math.random() * anecdotes.length);
    setSelected(newAnecdote);
  }

  const handleVote = () => {
    const newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);
  };

  const getMaxPointsIndex = () => {
    const maxIndex = points.reduce((maxIndex, currentValue, currentIndex) => {
      return currentValue > points[maxIndex]? currentIndex : maxIndex;
    }, 0);
    return maxIndex;
  }

  console.log();
  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        <p>{anecdotes[selected]}</p>
        <p>Has {points[selected]} votes</p>
      </div>
      <div>
        <button onClick={handleNextAnecdoteClick}>Next anecdote</button>
        <button onClick={handleVote}>Vote</button>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[getMaxPointsIndex()]}</p>
        <p>Has {points[getMaxPointsIndex()]}</p>
      </div>
    </div>
  )
}

export default App
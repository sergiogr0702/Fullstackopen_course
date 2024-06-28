import { useState } from 'react'
import Button from './Button'
import Statistics from './Statistics'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <Button onClick={handleGoodClick}>Good</Button>
        <Button onClick={handleNeutralClick}>Neutral</Button>
        <Button onClick={handleBadClick}>Bad</Button>

        <h1>Statistics</h1>
        <Statistics good={good} bad={bad} neutral={neutral} />
      </div>
    </div>
  )
}

export default App
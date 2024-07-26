import { useState } from 'react'
import { useField, useCountry } from './hooks'
import Country from './components/Country'

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      {
        country.loading && <div>Loading...</div>
      }

      {
        country.error && !country.loading ?
          <div>{country.error}</div>
        :
          <Country country={country.country} />
      }
    </div>
  )
}

export default App
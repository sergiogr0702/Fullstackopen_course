import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
}
  
export const useCountry = (name) => {
    const [country, setCountry] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
  
    useEffect(() => {
        const fetchCountry = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
                setCountry(error)
                setCountry(response.data)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching country:', error)
                setError(error.response.data.error)
                setLoading(false)
            }
        }

        if (name) {
            fetchCountry()
        }
    }, [error, name])
  
    return {
        country,
        setCountry,
        error,
        loading
    }
}
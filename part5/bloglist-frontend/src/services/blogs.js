import axios from 'axios'

const baseUrl = '/api/blogs'
let token = ''

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, { headers: { Authorization: token } })
  return response.data
}

const update = async (id, updatedObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedObject, { headers: { Authorization: token } })
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, { headers: { Authorization: token } })
  return response.data
}

export default {
  getAll,
  create,
  update,
  remove,
  setToken
}
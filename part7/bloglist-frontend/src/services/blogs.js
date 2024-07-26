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
  const response = await axios.post(baseUrl, newObject, {
    headers: { Authorization: token },
  })
  return response.data
}

const addComment = async (object) => {
  const response = await axios.post(`${baseUrl}/${object.blogId}/comments`, {
    comment: object.comment,
  })
  return response.data
}

const update = async (updatedObject) => {
  const response = await axios.put(
    `${baseUrl}/${updatedObject.id}`,
    updatedObject,
    {
      headers: { Authorization: token },
    }
  )
  return response.data
}

const remove = async (objectToDelete) => {
  const response = await axios.delete(`${baseUrl}/${objectToDelete.id}`, {
    headers: { Authorization: token },
  })
  return response.data
}

export default {
  getAll,
  create,
  addComment,
  update,
  remove,
  setToken,
}

import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'

const isTokenExpired = (token) =>
  Date.now() >= JSON.parse(atob(token.split('.')[1])).exp * 1000

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      if (isTokenExpired(loggedUser.token)) {
        window.localStorage.removeItem('loggedBlogappUser')
        dispatch(setUser(loggedUser))
      } else {
        blogService.setToken(loggedUser.token)
        dispatch(setUser(loggedUser))
      }
    }
  }
}

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
    } catch (err) {
      //launch notification
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
  }
}

export default userSlice.reducer

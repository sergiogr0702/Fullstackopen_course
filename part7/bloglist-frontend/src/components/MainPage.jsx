import { Routes, Route, useMatch } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'
import userService from '../services/users'
import Notification from './Notification'
import User from './User'
import BlogList from './BlogList'
import UserList from './UserList'
import Blog from './Blog'
import Menu from './Menu'

const MainPage = () => {
  const {
    data: blogs,
    isLoading,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
    retry: 1,
  })

  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    refetchOnWindowFocus: false,
    retry: 1,
  })

  const blogMatch = useMatch('/blogs/:id')
  const routingBlog =
    blogMatch && blogs ? blogs.find((b) => b.id === blogMatch.params.id) : null

  const userMatch = useMatch('/users/:id')
  const routingUser =
    userMatch && users ? users.find((u) => u.id === userMatch.params.id) : null

  if (isLoading) return <div>Loading...</div>

  if (error) return <div>Error fetching blogs: {error.message}</div>

  if (isSuccess) {
    return (
      <div>
        <Menu />
        <Notification />

        <h2>Blog app</h2>

        <Routes>
          <Route path="/users/:id" element={<User user={routingUser} />} />
          <Route path="/users" element={<UserList users={users} />} />
          <Route path="/blogs/:id" element={<Blog blog={routingBlog} />} />
          <Route path="/" element={<BlogList blogs={blogs} />} />
        </Routes>
      </div>
    )
  }

  return null
}

export default MainPage

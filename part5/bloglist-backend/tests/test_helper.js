const bcrypt = require('bcrypt');
const Blog = require('../models/blog')
const User = require('../models/user')

const initialUsers = [
  {
    username: "Michael_1",
    name: "Michael Chan",
    password: "Michael_123",
  },
  {
    username: "Edsger_1",
    name: "Edsger W. Dijkstra",
    password: "Edsger_123",
  },
];

const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
      },
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
      },
];

const nonExistingBlogId = async () => {
  const userId = await User.findOne({ username: initialUsers[0].username})._id;

  const blog = new Blog(
    {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        user: userId
      },
  )
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const nonExistingUserId = async () => {
  const user = new User(
    {
      username: "Delete_user",
      name: "User to be deleted",
      password: "Delete_123",
    },
  )
  await user.save()
  await user.deleteOne()

  return user._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialUsers, initialBlogs, nonExistingUserId, nonExistingBlogId, blogsInDb, usersInDb
}
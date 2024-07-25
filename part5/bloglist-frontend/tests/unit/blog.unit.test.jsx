import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../../src/components/Blog'
import { vi } from 'vitest'

describe('<Blog />', () => {
  let container
  const updateBlog = vi.fn()
  const deleteBlog = vi.fn()
  const user = {
    name: 'Alice',
    username: 'alice'
  }
  const blog = {
    id: '1',
    title: 'Test Blog',
    author: 'Alice',
    url: 'www.testblog.com',
    likes: 0,
    user: {
      id: '1',
      name: 'Alice',
      username: 'alice'
    },
  }

  beforeEach(() => {
    container = render(
      <Blog user={user} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />
    ).container
  })

  test('at start it renders the title, author and show button but not the url or the likes', async () => {
    const titleElement = container.querySelector('.title')
    expect(titleElement).toBeDefined()
    expect(titleElement).toHaveTextContent('Test Blog')

    const authorElement = container.querySelector('.author')
    expect(authorElement).toBeDefined()
    expect(authorElement).toHaveTextContent('Alice')

    const showButton = screen.getByText('View')
    expect(showButton).toBeDefined()

    const urlElement = container.querySelector('.url')
    expect(urlElement).toBeNull()

    const likesElement = container.querySelector('.likes')
    expect(likesElement).toBeNull()
  })

  test('after clicking the show button, it renders the url and the likes', async () => {
    const user = userEvent.setup()
    const showButton = screen.getByText('View')
    await user.click(showButton)

    const urlElement = container.querySelector('.urlExpanded')
    expect(urlElement).toBeDefined()
    expect(urlElement).toHaveTextContent('www.testblog.com')

    const likesElement = container.querySelector('.likesExpanded')
    expect(likesElement).toBeDefined()
    expect(likesElement).toHaveTextContent('0')
  })

  test('after clicking the like button twice, the function that updates the blog is called twice', async () => {
    const user = userEvent.setup()
    const showButton = screen.getByText('View')
    await user.click(showButton)

    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(updateBlog).toHaveBeenCalledTimes(2)
  })
})
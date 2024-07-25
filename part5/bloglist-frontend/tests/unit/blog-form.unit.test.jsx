import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../../src/components/BlogForm'
import { vi } from 'vitest'

describe('<BlogForm />', () => {
  test('should call parent function with the correct arguments', async () => {
    const user = userEvent.setup()
    const createNewBlog = vi.fn()

    const { container } = render(<BlogForm createNewBlog={createNewBlog} />)

    const titleInput = container.querySelector('#blogTitle')
    const authorInput = container.querySelector('#blogAuthor')
    const urlInput = container.querySelector('#blogUrl')

    await user.type(titleInput, 'Test Blog')
    await user.type(authorInput, 'Alice')
    await user.type(urlInput, 'www.testblog.com')

    const sendButton = screen.getByText('Create')
    await user.click(sendButton)

    expect(createNewBlog.mock.calls).toHaveLength(1)
    expect(createNewBlog.mock.calls[0][0]).toBe('Test Blog')
    expect(createNewBlog.mock.calls[0][1]).toBe('Alice')
    expect(createNewBlog.mock.calls[0][2]).toBe('www.testblog.com')
  })
})
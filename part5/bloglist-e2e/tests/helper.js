const loginWith = async (page, username, password) => {
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'Log in'}).click()
}

const createBlog = async (page, title, author, url) => {
    await page.getByRole('button', { name: 'New blog'}).click()

    await page.getByTestId('blogTitle').fill(title)
    await page.getByTestId('blogAuthor').fill(author)
    await page.getByTestId('blogUrl').fill(url)

    await page.getByRole('button', { name: 'Create'}).click()
}

export { loginWith, createBlog }
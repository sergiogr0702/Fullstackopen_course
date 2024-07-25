// @ts-check
const { test, describe, expect, beforeEach, afterEach } = require('@playwright/test');
const { loginWith, createBlog } = require('./helper');

describe('Bloglist app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Test User',
        username: 'TestUser_1',
        password: 'TestUser_1'
      }
    })

    await page.goto('/')
  })

  test('login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
  })

  describe('Login', () => {
    test('login form can be filled', async ({ page }) => {
      await loginWith(page, 'TestUser_1', 'TestUser_1')
  
      await expect(page.getByText('Test User logged in')).toBeVisible()

      await page.getByText('Log out').click()
    })

    test('login fails with wrong password', async ({ page }) => {
      await loginWith(page, 'TestUser_1', 'Test')

      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toBeVisible()
      await expect(errorDiv).toContainText('Invalid username or password')

      await expect(page.getByText('Test User logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'TestUser_1', 'TestUser_1')
    })

    test('a new blog post can be created', async ({ page }) => {
      const date = Date.now()
      const title = `Test blog ${date}`
      const url = 'https://example.com'
      await createBlog(page, title, 'John Smith', url)

      const blogsDiv = await page.getByTestId('blogsContainer')

      await expect(blogsDiv).toContainText(title)
    })

    test('a blog post can be liked', async ({ page }) => {
      const date = Date.now()
      const title = `Test blog ${date}`
      const url = 'https://example.com'
      await createBlog(page, title, 'John Smith', url)
      
      const blogContainer = await page.getByTestId(title)

      await blogContainer.locator('.showButton').click()

      await expect(blogContainer.getByText('likes 0')).toBeVisible()

      await blogContainer.locator('.likeButton').click()

      await expect(blogContainer.getByText('likes 1')).toBeVisible()
    })

    test('a blog post can be deleted', async ({ page }) => {
      const date = Date.now()
      const title = `Test blog ${date}`
      const url = 'https://example.com'
      await createBlog(page, title, 'John Smith', url)
      
      const blogContainer = await page.getByTestId(title)

      await blogContainer.locator('.showButton').click()

      const removeButton = blogContainer.locator('.deleteButton')
      await expect(removeButton).toBeVisible()

      page.on('dialog', dialog => {
        dialog.accept()
      })

      await removeButton.click()
      await expect(page.getByTestId('blogsContainer').filter({ hasText: title})).not.toBeVisible()
    })

    test('only the creator of the blog can view the remove button', async ({ page, request }) => {
      const date = Date.now()
      const title = `Test blog ${date}`
      const url = 'https://example.com'
      await createBlog(page, title, 'John Smith', url)
      
      const blogContainer = await page.getByTestId(title)

      await blogContainer.locator('.showButton').click()

      const removeButton = blogContainer.locator('.deleteButton')
      await expect(removeButton).toBeVisible()

      await page.getByText('Log out').click()

      await request.post('/api/users', {
        data: {
          name: 'Test User',
          username: 'TestUser_2',
          password: 'TestUser_2'
        }
      })
      await loginWith(page, 'TestUser_2', 'TestUser_2')

      await blogContainer.locator('.showButton').click()

      await expect(removeButton).not.toBeVisible()
    })

    test('blogs are sorted by likes', async ({ page }) => {
      const date1 = Date.now()
      const title1 = `Test blog ${date1}`
      const url1 = 'https://example1.com'
      await createBlog(page, title1, 'John Smith', url1)

      await page.waitForTimeout(2000);

      const date2 = Date.now() + 1000
      const title2 = `Test blog ${date2}`
      const url2 = 'https://example2.com'
      await createBlog(page, title2, 'John Smith', url2)

      await page.waitForTimeout(2000);

      const blogContainer1 = await page.getByTestId(title1)
      const blogContainer2 = await page.getByTestId(title2)

      await blogContainer1.locator('.showButton').click()
      await blogContainer1.locator('.likeButton').click()

      await page.waitForTimeout(1000);

      await blogContainer2.locator('.showButton').click()
      await blogContainer2.locator('.likeButton').click()
      await blogContainer2.locator('.likeButton').click()

      await page.waitForTimeout(2000);

      const blogsDiv = await page.getByTestId('blogsContainer')

      const firstBlog = await blogsDiv.locator('> .blogContainer:nth-child(1)').getAttribute('data-testid');
      const secondBlog = await blogsDiv.locator('> .blogContainer:nth-child(2)').getAttribute('data-testid');

      expect(firstBlog).toBe(title1);
      expect(secondBlog).toBe(title2);
    })

    afterEach(async ({ page }) => {
      await page.getByText('Log out').click()
    })
  })
})
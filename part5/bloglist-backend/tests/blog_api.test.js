const bcrypt = require('bcrypt');
const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
    const saltRounds = 10;
    await Blog.deleteMany({});
    await User.deleteMany({});

    const passwordHashUser1 = await bcrypt.hash(helper.initialUsers[0].password, saltRounds);
    const user1 = await new User({
      username: helper.initialUsers[0].username,
      name: helper.initialUsers[0].name,
      passwordHash: passwordHashUser1
    }).save();

    const passwordHashUser2 = await bcrypt.hash(helper.initialUsers[0].password, saltRounds);
    const user2 = await new User({
      username: helper.initialUsers[1].username,
      name: helper.initialUsers[1].name,
      passwordHash: passwordHashUser2
    }).save();

    await new Blog({...helper.initialBlogs[0], user: user1._id }).save();
    await new Blog({...helper.initialBlogs[1], user: user2._id }).save();
});

describe('when there is initially some blogs saved', () => {
    test('all blogs are returned as json', async () => {
        const response = await api
           .get('/api/blogs')
           .expect(200)
           .expect('Content-Type', /application\/json/)
    
        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    });

    test('blogs have id property instead of _id', async () => {
        const response = await api
          .get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/);

        response.body.forEach(blog => {
            assert(blog.id !== undefined, 'Blog post should have an id property');
            assert(blog._id === undefined, 'Blog post should not have an _id property');
        });
    });
});

describe('viewing a specific blog', () => {
    test('succeeds with a valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()

      const blogsToView = blogsAtStart[0]

      const resultBlog = await api
        .get(`/api/blogs/${blogsToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const returnedBlog = {
        title: resultBlog.body.title,
        author: resultBlog.body.author,
        url: resultBlog.body.url,
        likes: resultBlog.body.likes,
      };

      const blogToCompare = {
        title: blogsToView.title,
        author: blogsToView.author,
        url: blogsToView.url,
        likes: blogsToView.likes,
      };

      assert.deepStrictEqual(returnedBlog, blogToCompare)
    });

    test('fails with statuscode 404 if note does not exist', async () => {
      const validNonexistingId = await helper.nonExistingBlogId()

      const response = await api
        .get(`/api/blogs/${validNonexistingId}`)
        .expect(404)

      assert(response.body.error, 'Error message should be provided');
    });

    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      const response = await api
        .get(`/api/blogs/${invalidId}`)
        .expect(400)

      assert(response.body.error, 'Error message should be provided');
    });
});

describe('addition of a new blog', () => {
    test('a valid blog can be added ', async () => {

      const loginResponse = await api
        .post('/api/login')
        .send({ username: helper.initialUsers[0].username, password: helper.initialUsers[0].password })
        .expect(200)
        .expect('Content-Type', /application\/json/)

        const newBlog = {
            title: "First class tests",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10,
        }
      
        await api
          .post('/api/blogs')
          .send(newBlog)
          .set({ Authorization: `Bearer ${loginResponse.body.token}` })
          .expect(201)
          .expect('Content-Type', /application\/json/)
      
        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
      
        const titles = blogsAtEnd.map(b => b.title)
        assert(titles.includes(newBlog.title))
    });
    
    test('blog without likes creates blog with zero likes', async () => {

        const loginResponse = await api
          .post('/api/login')
          .send({ username: helper.initialUsers[0].username, password: helper.initialUsers[0].password })
          .expect(200)
          .expect('Content-Type', /application\/json/)

        const newBlog = {
            title: "First class tests",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        }
      
        const response = await api
          .post('/api/blogs')
          .send(newBlog)
          .set({ Authorization: `Bearer ${loginResponse.body.token}` })
          .expect(201)
          .expect('Content-Type', /application\/json/)
      
        const blogsAtEnd = await helper.blogsInDb()
      
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
        assert.strictEqual(response.body.likes, 0)
    });
    
    test('blog without title or url are not added', async () => {

        const loginResponse = await api
          .post('/api/login')
          .send({ username: helper.initialUsers[0].username, password: helper.initialUsers[0].password })
          .expect(200)
          .expect('Content-Type', /application\/json/)

        const newBlog1 = {
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10,
        }
    
        const newBlog2 = {
            title: "First class tests",
            author: "Robert C. Martin",
            likes: 10,
        }
      
        const response1 = await api
          .post('/api/blogs')
          .send(newBlog1)
          .set({ Authorization: `Bearer ${loginResponse.body.token}` })
          .expect(400)
    
        const response2 = await api
          .post('/api/blogs')
          .send(newBlog2)
          .set({ Authorization: `Bearer ${loginResponse.body.token}` })
          .expect(400)

        assert(response1.body.error, 'Error message should be provided');
        assert(response2.body.error, 'Error message should be provided');

        const blogsAtEnd = await helper.blogsInDb()
      
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    });

    test('fails with status code 401 if JWT token is invalid, expired or it is not provided', async () => {
      const newBlog = {
        title: "First class tests",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      }
  
      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)
  
      assert(response.body.error, 'Error message should be provided');
    
      const blogsAtEnd = await helper.blogsInDb()
    
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    });
});

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {

      const loginResponse = await api
        .post('/api/login')
        .send({ username: helper.initialUsers[0].username, password: helper.initialUsers[0].password })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set({ Authorization: `Bearer ${loginResponse.body.token}` })
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

      const titles = blogsAtEnd.map(b => b.title)
      assert(!titles.includes(blogToDelete.title))
    });

    test('fails with status code 400 if id is invalid', async () => {

      const loginResponse = await api
        .post('/api/login')
        .send({ username: helper.initialUsers[0].username, password: helper.initialUsers[0].password })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const invalidId = '5a35da5907008'

      const response = await api
        .delete(`/api/blogs/${invalidId}`)
        .set({ Authorization: `Bearer ${loginResponse.body.token}` })
        .expect(400)

      assert(response.body.error, 'Error message should be provided');
  
      const blogsAtEnd = await helper.blogsInDb()
    
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    });

    test('fails with status code 404 if id does not exist', async () => {

      const loginResponse = await api
        .post('/api/login')
        .send({ username: helper.initialUsers[0].username, password: helper.initialUsers[0].password })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const validNonexistingId = await helper.nonExistingBlogId()

      const response = await api
        .delete(`/api/blogs/${validNonexistingId}`)
        .set({ Authorization: `Bearer ${loginResponse.body.token}` })
        .expect(404)

      assert(response.body.error, 'Error message should be provided');
  
      const blogsAtEnd = await helper.blogsInDb()
    
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    });

    test('fails with status code 401 if JWT token is invalid, expired or it is not provided', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
  
      const response = await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(401)
        .expect('Content-Type', /application\/json/)

      assert(response.body.error, 'Error message should be provided');
  
      const blogsAtEnd = await helper.blogsInDb()
    
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    });

    test('fails with status code 401 if logged user is not the creator of the blog', async () => {

      const loginResponse = await api
        .post('/api/login')
        .send({ username: helper.initialUsers[1].username, password: helper.initialUsers[1].password })
        .expect('Content-Type', /application\/json/)

      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      const response = await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set({ Authorization: `Bearer ${loginResponse.body.token}` })
        .expect(401)

      assert(response.body.error, 'Error message should be provided');
  
      const blogsAtEnd = await helper.blogsInDb()
    
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    });
});

describe('updating a blog', () => {
  test('succeeds with status code 200 if id is valid', async () => {

      const loginResponse = await api
        .post('/api/login')
        .send({ username: helper.initialUsers[0].username, password: helper.initialUsers[0].password })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const updatedBlog = {
        title: "Updated blog title",
        author: "Updated author",
        url: "http://updated.blog.com",
        likes: 20
      }

      const response = await api
       .put(`/api/blogs/${blogToUpdate.id}`)
       .send(updatedBlog)
       .set({ Authorization: `Bearer ${loginResponse.body.token}` })
       .expect(200)

      const blogsAtEnd = await helper.blogsInDb()

      const updatedTitle = blogsAtEnd.find(b => b.id === blogToUpdate.id).title
      assert.strictEqual(updatedTitle, updatedBlog.title)
  });

  test('fails with status code 400 if id is invalid', async () => {

      const loginResponse = await api
        .post('/api/login')
        .send({ username: helper.initialUsers[0].username, password: helper.initialUsers[0].password })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const invalidId = '5a35da5907008'

      const updatedBlog = {
        title: "Updated blog title",
        author: "Updated author",
        url: "http://updated.blog.com",
        likes: 20
      }

      const response = await api
        .put(`/api/blogs/${invalidId}`)
        .send(updatedBlog)
        .set({ Authorization: `Bearer ${loginResponse.body.token}` })
        .expect(400)

      assert(response.body.error, 'Error message should be provided');

      const blogsAtEnd = await helper.blogsInDb();
      const titles = blogsAtEnd.map(b => b.title);

      assert(!titles.includes(updatedBlog.title));
  });

  test('fails with status code 404 if id does not exist', async () => {

    const loginResponse = await api
      .post('/api/login')
      .send({ username: helper.initialUsers[0].username, password: helper.initialUsers[0].password })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const validNonexistingId = await helper.nonExistingBlogId()

    const updatedBlog = {
        title: "Updated blog title",
        author: "Updated author",
        url: "http://updated.blog.com",
        likes: 20
    }

    const response = await api
       .put(`/api/blogs/${validNonexistingId}`)
       .send(updatedBlog)
       .set({ Authorization: `Bearer ${loginResponse.body.token}` })
       .expect(404)

    assert(response.body.error, 'Error message should be provided');

    const blogsAtEnd = await helper.blogsInDb();
    const titles = blogsAtEnd.map(b => b.title);

    assert(!titles.includes(updatedBlog.title));
  });

  test('fails with status code 401 if JWT token is invalid, expired or it is not provided', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
      title: "Updated blog title",
      author: "Updated author",
      url: "http://updated.blog.com",
      likes: 20
    }

    const response = await api
       .put(`/api/blogs/${blogToUpdate.id}`)
       .send(updatedBlog)
       .expect(401)

    assert(response.body.error, 'Error message should be provided');

    const blogsAtEnd = await helper.blogsInDb();
    const titles = blogsAtEnd.map(b => b.title);

    assert(!titles.includes(updatedBlog.title));
  });

  test('fails with status code 401 if logged user is not the creator of the blog', async () => {

    const loginResponse = await api
      .post('/api/login')
      .send({ username: helper.initialUsers[1].username, password: helper.initialUsers[1].password })
      .expect('Content-Type', /application\/json/)

    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
      title: "Updated blog title",
      author: "Updated author",
      url: "http://updated.blog.com",
      likes: 20
    }

    const response = await api
     .put(`/api/blogs/${blogToUpdate.id}`)
     .send(updatedBlog)
     .set({ Authorization: `Bearer ${loginResponse.body.token}` })
     .expect(401)

    assert(response.body.error, 'Error message should be provided');

    const blogsAtEnd = await helper.blogsInDb();
    const titles = blogsAtEnd.map(b => b.title);

    assert(!titles.includes(updatedBlog.title));
  });
});

after(async () => {
    await mongoose.connection.close()
});
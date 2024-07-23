const bcrypt = require('bcrypt');
const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
    await User.deleteMany({});
    const saltRounds = 10;
    let passwordHash = null;

    for (let user of helper.initialUsers) {
        passwordHash = await bcrypt.hash(user.password, saltRounds);
        const newUser = new User({
            username: user.username,
            name: user.name,
            passwordHash,
        })
        await newUser.save()
    };
});

describe('when there is initially some users saved', () => {
    test('all users are returned as json', async () => {
        const response = await api
           .get('/api/users')
           .expect(200)
           .expect('Content-Type', /application\/json/);
    
        assert.strictEqual(response.body.length, helper.initialUsers.length)
    });

    test('users have id property instead of _id', async () => {
        const response = await api
          .get('/api/users')
          .expect(200)
          .expect('Content-Type', /application\/json/);

        response.body.forEach(user => {
            assert(user.id !== undefined, 'User should have an id property');
            assert(user._id === undefined, 'User should not have an _id property');
        });
    });
});

describe('addition of a new user', () => {
    test('succeeds with status code 201 if valid', async () => {
        const newUser = {
            username: "newUser",
            name: "New User",
            password: "newUser123",
        }
      
        await api
          .post('/api/users')
          .send(newUser)
          .expect(201)
          .expect('Content-Type', /application\/json/);
      
        const usersAtEnd = await helper.usersInDb();

        const usernames = usersAtEnd.map(u => u.username)
      
        assert.strictEqual(usersAtEnd.length, helper.initialUsers.length + 1)
        assert(usernames.includes(newUser.username))
    });

    test('fails with status code 400 if username or password is missing', async () => {
        const newUser = {
            name: 'New User'
        }

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        assert(response.body.error, 'Error message should be provided');

        const usersAtEnd = await helper.usersInDb();

        assert.strictEqual(usersAtEnd.length, helper.initialUsers.length)
    });

    test('fails with status code 400 if username is already taken', async () => {
        const newUser = {
            username: helper.initialUsers[0].username,
            name: 'New User',
            password: 'newUser123',
        }

        const response = await api
           .post('/api/users')
           .send(newUser)
           .expect(400)
           .expect('Content-Type', /application\/json/);

        assert(response.body.error, 'Error message should be provided');

        const usersAtEnd = await helper.usersInDb();

        assert.strictEqual(usersAtEnd.length, helper.initialUsers.length)
    });

    test('fails with status code 400 if username is too short', async () => {
        const newUser = {
            username: 'n1',
            name: 'New User',
            password: 'newUser12',
        }

        const response = await api
           .post('/api/users')
           .send(newUser)
           .expect(400)
           .expect('Content-Type', /application\/json/);

        assert(response.body.error, 'Error message should be provided');

        const usersAtEnd = await helper.usersInDb();

        assert.strictEqual(usersAtEnd.length, helper.initialUsers.length)
    });

    test('fails with status code 400 if password is too short', async () => {
        const newUser = {
            username: 'newUser',
            name: 'New User',
            password: 's',
        }

        const response = await api
           .post('/api/users')
           .send(newUser)
           .expect(400)
           .expect('Content-Type', /application\/json/);

        assert(response.body.error, 'Error message should be provided');

        const usersAtEnd = await helper.usersInDb();

        assert.strictEqual(usersAtEnd.length, helper.initialUsers.length)
    });
});

after(async () => {
    await mongoose.connection.close()
});
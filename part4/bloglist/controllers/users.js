const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        .populate('blogs',
            { title: 1,
              author: 1,
              url: 1,
              likes: 1,
              _id: 1
            }
    );
    response.json(users);
})

usersRouter.post('/', async (req, res) => {

    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }
    
    const { username, password } = req.body;

    if (password.split('').length < 3) {
        return res.status(400).json({ error: 'Password must be at least 3 characters long' });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        username,
        name: req.body.name || null,
        passwordHash,
    });

    const savedUser = await user.save();

    res.status(201).json(savedUser);
})

module.exports = usersRouter
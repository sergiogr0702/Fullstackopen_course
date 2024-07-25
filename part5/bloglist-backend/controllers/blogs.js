const blogsRouter = require('express').Router();
const middleware = require('../utils/middleware');
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog
      .find({});
    res.json(blogs);
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog
    .findById(req.params.id)
    .populate('user', { username: 1, name: 1, _id: 1 }
  );

  if (blog) {
    res.json(blog);
  } else {
    res.status(404).json({ error: 'Blog not found' });
  }
})
  
blogsRouter.post('/', middleware.userExtractor, async (req, res) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: 'unauthorized' });
    }

    const blog = new Blog({
      title: req.body.title,
      author: req.body.author || user.name || user.username,
      url: req.body.url,
      likes: req.body.likes || 0,
      user: user.id
    });

    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.status(201).json(savedBlog);
})

blogsRouter.put('/:id', middleware.userExtractor, async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  const blogToUpdate = await Blog.findById(req.params.id);

  if (!blogToUpdate) {
    return res.status(404).json({ error: 'Blog not found' });
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (updatedBlog) {
    res.json(updatedBlog);
  } else {
    res.status(404).end();
  }
})

blogsRouter.delete('/:id', middleware.userExtractor, async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).json({ error: 'Blog not found' });
  }

  if (blog.user.toString() !== user._id.toString()) {
    return res.status(401).json({ error: 'Unauthorized to delete this blog' });
  }

  await blog.deleteOne();

  res.status(204).end();
})

module.exports = blogsRouter
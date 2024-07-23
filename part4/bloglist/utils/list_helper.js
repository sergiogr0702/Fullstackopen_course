const _ = require('lodash');

const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0);
}

const favouriteBlog = (blogs) => {
    const favouriteBlog = blogs.reduce((favouriteBlog, blog) => blog.likes > favouriteBlog.likes? blog : favouriteBlog, blogs[0]);

    if (favouriteBlog) {
        return {
            title: favouriteBlog.title,
            author: favouriteBlog.author,
            likes: favouriteBlog.likes,
        };
    } else {
        return null;
    }
}

const mostBlogs = (blogs) => {
    const groupedByAuthor = _.groupBy(blogs, 'author');

    const authorBlogCounts = _.map(groupedByAuthor, (authorBlogs, author) => ({
        author: author,
        blogs: authorBlogs.length
    }));

    const topAuthor = _.maxBy(authorBlogCounts, 'blogs');

    return topAuthor || null;
}

const mostLikes = (blogs) => {
    const groupedByAuthor = _.groupBy(blogs, 'author');

    const authorLikes = _.map(groupedByAuthor, (authorBlogs, author) => ({
        author: author,
        likes: _.sumBy(authorBlogs, 'likes')
    }));

    const topAuthor = _.maxBy(authorLikes, 'likes');

    return topAuthor || null;
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes,
}
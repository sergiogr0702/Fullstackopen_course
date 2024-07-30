const { GraphQLError } = require("graphql");
const { PubSub } = require("graphql-subscriptions");
const jwt = require("jsonwebtoken");
const Author = require("../models/author");
const Book = require("../models/book");
const User = require("../models/user");

const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let filter = {};
      if (args.author) {
        const authorObj = await Author.findOne({ name: args.author });
        if (authorObj) {
          filter.author = authorObj._id;
        }
      }
      if (args.genre) {
        filter.genres = { $in: [args.genre] };
      }

      const books = await Book.find(filter).populate("author");

      return books.map((book) => {
        return {
          id: book._id,
          title: book.title,
          published: book.published,
          author: {
            id: book.author._id,
            name: book.author.name,
            born: book.author.born,
            bookCount: book.author.books.length,
          },
          genres: book.genres,
        };
      });
    },
    allAuthors: async () => {
      const authors = await Author.find({});
      return authors.map((author) => {
        return {
          id: author._id,
          name: author.name,
          born: author.born,
          bookCount: author.books.length,
        };
      });
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    createUser: async (root, args) => {
      try {
        const user = new User({
          username: args.username,
          favoriteGenre: args.favoriteGenre,
        });
        return user.save();
      } catch (err) {
        throw new GraphQLError(err.message, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            err,
          },
        });
      }
    },
    login: async (root, args) => {
      try {
        const user = await User.findOne({ username: args.username });

        if (!user || args.password !== "secret") {
          throw new GraphQLError("wrong credentials", {
            extensions: {
              code: "BAD_USER_INPUT",
            },
          });
        }

        const userForToken = {
          id: user._id,
          username: user.username,
        };

        return { value: jwt.sign(userForToken, process.env.SECRET) };
      } catch (err) {
        throw new GraphQLError(err.message, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            err,
          },
        });
      }
    },
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("Not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }

      let author = await Author.findOne({ name: args.author });
      if (!author) {
        try {
          const newAuthor = new Author({
            name: args.author,
            born: null,
          });
          author = await newAuthor.save();
        } catch (err) {
          throw new GraphQLError(err.message, {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.author,
              err,
            },
          });
        }
      }

      try {
        const newBook = new Book({
          title: args.title,
          published: args.published,
          author: author._id,
          genres: args.genres,
        });

        const returnedBook = await newBook.save();

        author.books.push(newBook._id);
        const returnedAuthor = await author.save();

        const createdBook = {
          id: returnedBook._id,
          title: returnedBook.title,
          author: {
            id: returnedAuthor._id,
            name: returnedAuthor.name,
            born: returnedAuthor.born,
            bookCount: returnedAuthor.books.length,
          },
          published: returnedBook.published,
          genres: returnedBook.genres,
        };

        pubsub.publish("BOOK_ADDED", { bookAdded: createdBook });

        return createdBook;
      } catch (err) {
        throw new GraphQLError(err.message, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            err,
          },
        });
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("Not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }

      try {
        const author = await Author.findOne({ name: args.name });
        if (!author) {
          return null;
        }
        author.born = args.setBornTo;

        return author.save();
      } catch (err) {
        throw new GraphQLError(err.message, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            err,
          },
        });
      }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};

module.exports = resolvers;

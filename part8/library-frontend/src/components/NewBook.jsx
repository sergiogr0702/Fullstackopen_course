import PropTypes from "prop-types";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, CREATE_BOOK } from "../utils/queries";

const NewBook = ({ show, setError }) => {
  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (err) => {
      const errors = err.graphQLErrors;
      const messages = errors
        .map((e) => {
          return `${e.extensions.code}: ${e.message}`;
        })
        .join("\n");
      setError(messages);
    },
  });

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  if (!show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    const publishedDate = parseInt(published, 10);

    createBook({
      variables: {
        title: title,
        published: publishedDate,
        author: author,
        genres: genres,
      },
    });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

NewBook.propTypes = {
  show: PropTypes.bool.isRequired,
  setError: PropTypes.func.isRequired,
};

export default NewBook;

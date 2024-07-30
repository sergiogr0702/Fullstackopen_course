import PropTypes from "prop-types";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../utils/queries";

const EditAuthor = ({ setError }) => {
  const { loading, data } = useQuery(ALL_AUTHORS);
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    onError: (err) => {
      const errors = err.graphQLErrors;
      const messages = errors
        .map((e) => {
          return `${e.extensions.code}: ${e.message}`;
        })
        .join("\n");
      setError(messages);
    },
    update: (cache) => {
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        return {
          allAuthors: allAuthors,
        };
      });
    },
  });

  const [authorName, setAuthorName] = useState("");
  const [authorBorn, setAuthorBorn] = useState("");

  const handleAuthorChange = (e) => {
    const selectedAuthor = e.target.value;
    setAuthorName(selectedAuthor);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!authorName || authorName === "select") {
      setError("Please select an author.");
      return;
    }

    const bornDate = parseInt(authorBorn, 10);

    updateAuthor({
      variables: {
        name: authorName,
        setBornTo: bornDate,
      },
    });

    setAuthorName("");
    setAuthorBorn("");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Author
          <select value={authorName} onChange={handleAuthorChange}>
            <option defaultValue="select">Select an author</option>
            {data.allAuthors.map((author) => (
              <option key={author.id} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          Born
          <input
            type="number"
            value={authorBorn}
            onChange={({ target }) => setAuthorBorn(target.value)}
          />
        </div>
        <button type="submit">Update author</button>
      </form>
    </div>
  );
};

EditAuthor.propTypes = {
  setError: PropTypes.func.isRequired,
};

export default EditAuthor;

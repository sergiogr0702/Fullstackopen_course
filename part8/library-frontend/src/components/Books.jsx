import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useQuery, useApolloClient } from "@apollo/client";
import { FILTER_BOOKS, ALL_BOOKS } from "../utils/queries";

const Books = ({ show }) => {
  const client = useApolloClient();
  const { loading: allBooksLoading, data: allBooksData } = useQuery(ALL_BOOKS);
  const { loading: filterBooksLoading, refetch } = useQuery(FILTER_BOOKS, {
    skip: true,
  });

  const [genres, setGenres] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    if (allBooksData && allBooksData.allBooks) {
      const allGenres = [
        ...new Set(allBooksData.allBooks.flatMap((book) => book.genres)),
      ];

      setGenres(allGenres);
      setAllBooks(allBooksData.allBooks);
      setBooks(allBooksData.allBooks);
    }
  }, [allBooksData]);

  useEffect(() => {
    if (selectedGenre === null) {
      setBooks(allBooks);
      return;
    }

    const cachedData = client.readQuery({
      query: FILTER_BOOKS,
      variables: { genre: selectedGenre },
    });

    if (cachedData) {
      setBooks(cachedData.allBooks);
    } else {
      refetch({ genre: selectedGenre }).then((result) => {
        if (result.data) {
          setBooks(result.data.allBooks);
        }
      });
    }
  }, [selectedGenre, client, refetch, allBooks]);

  if (!show) return null;
  if (filterBooksLoading || allBooksLoading) return <div>Loading...</div>;

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
  };

  return (
    <div>
      <h2>Books</h2>

      <p>
        Filtering by <b>{selectedGenre ? selectedGenre : "All"}</b>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button
          onClick={() => handleGenreSelect(null)}
          style={{ fontWeight: !selectedGenre ? "bold" : "normal" }}
        >
          All Genres
        </button>
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => handleGenreSelect(genre)}
            style={{ fontWeight: selectedGenre === genre ? "bold" : "normal" }}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

Books.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default Books;

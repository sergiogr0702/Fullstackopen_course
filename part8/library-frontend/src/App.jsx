import { useState, useEffect } from "react";
import { useQuery, useApolloClient, useSubscription } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import { ME, BOOK_ADDED, ALL_BOOKS, FILTER_BOOKS } from "./utils/queries";
import Recommendations from "./components/Recommendations";

function App() {
  const client = useApolloClient();
  const { loading, data } = useQuery(ME);

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const [page, setPage] = useState(false);
  const [user, setUser] = useState(null);

  const updateCacheWith = (newBook) => {
    const dataInAllBooks = client.readQuery({ query: ALL_BOOKS });

    if (dataInAllBooks) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: {
          allBooks: dataInAllBooks.allBooks.concat(newBook),
        },
      });
    }

    const genres = newBook.genres || [];
    genres.forEach((genre) => {
      try {
        const dataInFilterBooks = client.readQuery({
          query: FILTER_BOOKS,
          variables: { genre },
        });

        if (dataInFilterBooks) {
          client.writeQuery({
            query: FILTER_BOOKS,
            variables: { genre },
            data: {
              allBooks: dataInFilterBooks.allBooks.concat(newBook),
            },
          });
        }
      } catch (e) {
        console.log(`No cache for genre: ${genre}`);
      }
    });
  };

  useSubscription(BOOK_ADDED, {
    onData: (response) => {
      if (response?.data?.data?.bookAdded) {
        const newBook = response.data.data.bookAdded;
        notify(`${newBook.title} added!`, "success");
        updateCacheWith(newBook);
      }
    },
  });

  useEffect(() => {
    if (data && data.me) {
      setUser(data.me);
    }
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      resetApolloStore();
    }, 1800000); // 30 minutes

    const resetApolloStore = async () => {
      await client.resetStore();
    };
    return () => clearInterval(interval);
  }, [client]);

  const notify = (message, type) => {
    if (type && type === "success") {
      setMessageType("success");
    }
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
      setMessageType(null);
    }, 5000);
  };

  const logout = () => {
    localStorage.removeItem("library-user-token");
    setUser(null);
    client.resetStore();
  };

  const handleLogin = () => {
    client.resetStore();
    setPage(false);
    window.location.reload();
  };

  if (loading) {
    return <div>Loading ...</div>;
  } else {
    return (
      <div>
        <div>
          <button onClick={() => setPage("authors")}>Authors</button>
          <button onClick={() => setPage("books")}>Books</button>
          {user ? (
            <>
              <button onClick={() => setPage("add")}>Add book</button>
              <button onClick={() => setPage("recommendations")}>
                Recommended
              </button>
              <button onClick={logout}>Log out</button>
            </>
          ) : (
            <>
              <button onClick={() => setPage("login")}>Log in</button>
            </>
          )}
        </div>

        <Notification message={message} type={messageType} />

        <Authors show={page === "authors"} setError={notify} user={user} />

        <Books show={page === "books"} />

        <NewBook show={page === "add"} setError={notify} />

        <Recommendations show={page === "recommendations"} user={user} />

        <LoginForm
          show={page === "login"}
          setError={notify}
          onLogin={handleLogin}
        />
      </div>
    );
  }
}

export default App;

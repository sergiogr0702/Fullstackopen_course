import PropTypes from "prop-types";
import { useLazyQuery } from "@apollo/client";
import { FILTER_BOOKS } from "../utils/queries";

const Recommendations = ({ show, user }) => {
  const [getRecommended, { called, loading, data }] =
    useLazyQuery(FILTER_BOOKS);

  if (!show || !user) return null;
  if (!called) {
    getRecommended({ variables: { genre: user.favoriteGenre } });
  }
  if (called && loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        Books in your favorite genre <b>{user.favoriteGenre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data?.allBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Recommendations.propTypes = {
  show: PropTypes.bool.isRequired,
  user: PropTypes.object,
};

export default Recommendations;

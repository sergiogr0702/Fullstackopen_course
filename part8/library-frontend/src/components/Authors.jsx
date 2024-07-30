import PropTypes from "prop-types";
import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../utils/queries";
import EditAuthor from "./EditAuthor";

const Authors = ({ show, setError, user }) => {
  const { loading, data } = useQuery(ALL_AUTHORS);

  if (!show) {
    return null;
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.allAuthors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {user && <EditAuthor setError={setError} />}
    </div>
  );
};

Authors.propTypes = {
  show: PropTypes.bool.isRequired,
  setError: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default Authors;

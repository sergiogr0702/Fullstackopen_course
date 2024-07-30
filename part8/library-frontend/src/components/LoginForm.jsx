import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { ME, LOGIN } from "../utils/queries";

const LoginForm = ({ show, setError, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("secret");

  const [login, result] = useMutation(LOGIN, {
    refetchQueries: [{ query: ME }],
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

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      localStorage.setItem("library-user-token", token);
      onLogin();
    }
  }, [onLogin, result.data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ variables: { username, password } });
    setUsername("");
    setPassword("");
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password{" "}
          <input
            value={password}
            type="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  show: PropTypes.bool.isRequired,
  setError: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;

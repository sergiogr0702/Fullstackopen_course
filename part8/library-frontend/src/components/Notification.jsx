import PropTypes from "prop-types";

const Notification = ({ message, type }) => {
  if (!message) {
    return null;
  }

  return (
    <div style={{ color: type && type === "success" ? "green" : "red" }}>
      {message}
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
};

export default Notification;

import PropTypes from 'prop-types';

const Notification = ({classes, message}) => {
    return (
        <div className={classes}>
            {message}
        </div>
    );
}

Notification.propTypes = {
    classes: PropTypes.string,
    message: PropTypes.string,
};

export default Notification;
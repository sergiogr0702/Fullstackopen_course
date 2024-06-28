import PropTypes from 'prop-types';

const Part = (props) => {
    return (
    <>
        <p>
            {props.name} {props.exercises}
        </p>
    </>
    );
}

Part.propTypes = {
    name: PropTypes.string,
    exercises: PropTypes.number,
};

export default Part;
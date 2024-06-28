import PropTypes from 'prop-types';

const Total = ({parts}) => {
    return (
        <p>Number of exercises {parts.reduce((accumulator, currentValue) => accumulator + currentValue['exercises'], 0)}</p>
    );
}

Total.propTypes = {
    parts: PropTypes.array,
};

export default Total;
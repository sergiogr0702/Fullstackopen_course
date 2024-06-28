import PropTypes from 'prop-types';

const StatisticLine = ({text, value, percent}) => {
    return <td>{text} {value}{percent && ' %'}</td>;
}

StatisticLine.propTypes = {
    text: PropTypes.string,
    value: PropTypes.number,
    percent: PropTypes.bool,
}

export default StatisticLine;
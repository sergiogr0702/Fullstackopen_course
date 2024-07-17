import PropTypes from 'prop-types';

const Filter = ({filter, handleFilter}) => {
    return (
        <div>
            Filter shown with <input value={filter} onChange={handleFilter}/>
        </div>
    );
}

Filter.propTypes = {
    filter: PropTypes.string,
    handleFilter: PropTypes.func,
}

export default Filter;
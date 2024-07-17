import PropTypes from 'prop-types';

const Part = ({part}) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    )
}

Part.propTypes = {
    part: PropTypes.object,
}

export default Part;
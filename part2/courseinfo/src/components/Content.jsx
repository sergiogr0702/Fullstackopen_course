import PropTypes from 'prop-types';
import Part from './Part';

const Content = ({parts}) => {
  const total = parts.reduce((total, part) => total + part.exercises, 0);

  console.log(total);
    return (
      <div>
        {
            parts.map(coursePart => {
              return <Part key={coursePart.id} part={coursePart} />
            })
        }
        <p>Total of {total} exercises</p>
      </div>
    )
}

Content.propTypes = {
    parts: PropTypes.array,
}

export default Content;
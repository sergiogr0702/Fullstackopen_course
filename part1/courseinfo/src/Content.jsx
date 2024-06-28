import PropTypes from 'prop-types';
import Part from './Part';

const Content = ({parts}) => {
    return (
    <div>
        {
            parts.map( part => {
                return (
                    <Part key={part.name} name={part.name} exercises={part.exercises} />
                )
            })
        }
    </div>
    );
}

Content.propTypes = {
    parts: PropTypes.array,
};

export default Content;
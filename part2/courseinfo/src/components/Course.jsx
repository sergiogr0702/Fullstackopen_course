import PropTypes from 'prop-types';
import Header from './Header';
import Content from './Content';

const Course = ({course}) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
        </div>
    );
}

Course.propTypes = {
    course: PropTypes.object,
}

export default Course;
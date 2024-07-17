import PropTypes from 'prop-types';

const Persons = ({persons, filter, deletePerson}) => {
    const handleDelete = (person) => (e) => {
        e.preventDefault();
        if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
            deletePerson(person.id);
        }
    }

    return (
        <div>
            {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person => (
                <p key={person.name}>
                    {person.name} {person.number} <button type='button' onClick={handleDelete(person)}>Delete</button>
                </p>
            ))}
        </div>
    );
};

Persons.propTypes = {
    persons: PropTypes.array,
    filter: PropTypes.string,
    deletePerson: PropTypes.func,
};

export default Persons;
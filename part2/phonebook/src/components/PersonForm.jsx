import { useState } from 'react';
import PropTypes from 'prop-types';

const PersonForm = ({addPerson}) => {
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addPerson(newName, newNumber);
        setNewName('');
        setNewNumber('');
    };

    const handleNameChange = (e) => {
        e.preventDefault();
        setNewName(e.target.value);
      }
    
      const handleNumberChange = (e) => {
        e.preventDefault();
        setNewNumber(e.target.value);
      }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                Name: <input value={newName} onChange={handleNameChange}/>
            </div>
            <div>
                Number: <input value={newNumber} onChange={handleNumberChange}/>
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    );
};

PersonForm.propTypes = {
    addPerson: PropTypes.func,
}

export default PersonForm;
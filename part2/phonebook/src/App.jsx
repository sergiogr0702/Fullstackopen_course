import { useEffect, useState } from 'react';
import personService from './services/persons';
import Notification from './components/Notification';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);
  const [notificationClass, setNotificationClass] = useState(null);

  useEffect(() => {
    personService.getAll()
      .then(response => {
        setPersons(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const addPerson = (newName, newNumber) => {
    const person = persons.find(persons => persons.name === newName);

    if (person) {
      if(window.confirm(`${newName} is already added to phonebook. Do you want to replace the old number with a new one?`)) {
        const changedPerson = { ...person, number: newNumber };
        personService.update(person.id, changedPerson)
          .then(response => {
            setPersons(persons.map(updatePerson => updatePerson.id !== person.id ? updatePerson : response.data));
          })
          .catch(error => {
            console.error('Error updating contact:', error);
            setMessage(`Information of ${newName} has already been removed from server`);
            setNotificationClass('error');
            setTimeout(() => {
              setMessage(null);
              setNotificationClass(null);
            }, 5000);
          });
      }
      return;
    } else {
      const newContact = {
        name: newName,
        number: newNumber,
      };

      personService.create(newContact)
        .then(response => {
          setPersons(persons.concat(response.data));
          setMessage(`Added ${newName}`);
          setNotificationClass('success');
          setTimeout(() => {
            setMessage(null);
            setNotificationClass(null);
          }, 5000);
        })
        .catch(error => {
          console.error('Error creating contact:', error);
        });
    }
  }

  const deletePerson = (id) => {
    personService.delete(id)
     .then(() => {
        setPersons(persons.filter(person => person.id!== id));
      })
     .catch(error => {
        console.error('Error deleting contact:', error);
      });
  }

  const handleFilter = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} classes={notificationClass} />
      <Filter filter={filter} handleFilter={handleFilter} />

      <h2>Add a new Number</h2>
      <PersonForm addPerson={addPerson} />

      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  )
}

export default App
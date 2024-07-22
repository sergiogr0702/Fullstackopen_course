const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument!');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@fullstackopen-course.msu9odg.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {

  console.log('Phonebook');
  Person.find({})
    .then(result => {
      result.forEach(person => {
        console.log(`${person.name} ${person.number}`);
      });
      mongoose.connection.close();
    })

} else if (process.argv.length === 5) {

  const person = new Person(
    {
      name: process.argv[3],
      number: process.argv[4],
    }
  );
    
  person.save().then(() => {
    console.log(`Added ${person.name} number ${person.number} to phonebook.`);
    mongoose.connection.close();
  });

} else {
  console.log('There is no invocation method available with these arguments.');
  console.log('Valid invocation methods:');
  console.log('node mongo.js <database_password>');
  console.log('node mongo.js <database_password> <name> <number>');
  mongoose.connection.close();
  process.exit(1);
}
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const Person = require('./models/person');

const app = express();

morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : '';
});
const customFormat = ':method :url :status :res[content-length] - :response-time ms :body';

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use(morgan(customFormat));

app.get('/info', (req, res) => {
  let currentDate = new Date();
  let entries = 0;
  Person.find({})
    .then(result => {
      entries = result.length;
      res.send(`
            <p>Phonebook has info for ${entries} people</p>
            <p>${currentDate.toString()}</p>
      `);
    })
});

app.get('/api/persons', (req, res) => {
  Person.find({})
    .then(result => {
      res.json(result);
    })
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(result => {
      if(result) {
        res.json(result);
      } else {
        res.status(404).end();
      }
    })
    .catch(err => next(err));
});

app.post('/api/persons', (req, res, next) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'Content missing' });
  }

  const newPerson = new Person(
    {
      name: body.name,
      number: body.number
    }
  );

  newPerson.save()
    .then(result => {
      res.json(result);
    })
    .catch(err => next(err));
});

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body;

  if (!body.name ||!body.number) {
    return res.status(400).json({ error: 'Content missing' });
  }

  const { name, number } = body;

  Person.findByIdAndUpdate(
    req.params.id, 
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(result => {
      res.json(result);
    })
    .catch(err => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end();
    })
    .catch(err => next(err));
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Endpoint not found' });
}

app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
  console.log(err.message);

  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Malformatted ID' });
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  next(err);
}

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () =>{
  console.log(`Server running on port ${PORT}`)
});
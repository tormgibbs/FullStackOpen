require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/phonebook')

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())

morgan.token('body', function getId (res) {
  return JSON.stringify(res.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


// GET persons list
app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(persons => {
      response.json(persons)
    })
    .catch(error => next(error))
})


// GET person object
app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})


// POST new person object
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

// Delete a person object
app.delete('/api/persons/:id', (request, response, next) => {
  console.log('testing...')
  console.log(request.params.id)
  Person.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch(error => next(error))

  response.status(204).end()
})


app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => response.json(updatedPerson))
    .catch(error => next(error))
})



app.get('/info', (request, response, next) => {
  Person.countDocuments({})
    .then(count => {
      const view = `
        <p>Phonebook has info for ${count}</p>
        <p>${Date()}</p>
      `
      response.send(view)
    })
    .catch(error => next(error))
})


const errorMiddleware = (error, request, response) => {
  console.log('error: ',error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  return response.status(500).send({ error: 'Something went wrong' })
}

app.use(errorMiddleware)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
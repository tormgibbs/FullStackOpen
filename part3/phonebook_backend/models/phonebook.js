const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to database....')

mongoose.connect(url)
  .then(() => {
    console.log('connected to database')
  })
  .catch(error => {
    console.log('error connecting to database: ', error.message)
  })

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function (value) {
        return /\d{2,3}-\d{5,}/.test(value)
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  }
})

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Contact', contactSchema)
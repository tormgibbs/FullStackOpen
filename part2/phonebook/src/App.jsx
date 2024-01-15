/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { Person, DisplayTitle, Filter, PersonForm, DisplayMessage } from './components/components'
import contactService from './services/persons'



function App() {
  const [persons, setPersons] = useState([])
  const [newName, setnewName] = useState('')
  const [newNumber, setnewNumber] = useState('')
  const [newSearch, setnewSearch] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filteredPersons, setfilteredPersons] = useState([])
  const [message, setMessage] = useState(null)
  const [messageClass, setMessageClass] = useState(null)

  const hooks = () => {
    contactService
      .getAll()
      .then(returnedPersons => 
        setPersons(returnedPersons)
      )
  }

  useEffect(hooks, [])

  const personsToShow = showAll ? persons : filteredPersons

  const addPerson = event => {
    event.preventDefault()

    // Checking for duplicates
    const isDuplicate = persons.some(person => person.name === newName)

    // if duplicate request to update number
    if (isDuplicate){
      setnewName('')
      setnewNumber('')
      const message = `${newName} is already added to phonebook, replace the old number with a new one?`
      const replaceNumber = confirm(message )
      if (replaceNumber) {
        const person = persons.find(p => p.name === newName)
        const updatedPerson = { ...person, number: newNumber}
        contactService
          .updatePerson(updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id != person.id ? p : returnedPerson))
          })
      }
      return;
    }

    const contactObject ={
      name: newName,
      number: newNumber
    }

    contactService
      .addPerson(contactObject)
      .then(returnedContact => {
        setPersons(persons.concat(returnedContact))
        setMessageClass('messageSuccess')
        setMessage(`Added ${newName}`)
        setTimeout(() => {
          setMessage(null)
          setMessageClass(null)
        }, 3000)
        setnewName('')
        setnewNumber('')
      })

  }

  const deletePerson = person => {
    const confirmDelete = confirm(`Delete ${person.name}?`)
    if (confirmDelete) {
      contactService
        .deletePerson(person)
        .then(() => {
          setPersons(persons.filter(p => p.id != person.id))
        })
        .catch(() => {
          setMessageClass('messageError')
          setMessage(`Information of ${person.name} has already been removed from the server`)
          setTimeout(() => {
            setMessage(null)
            setMessageClass(null)
          }, 3000)
          setPersons(persons.filter(p => p.id != person.id))
        })
    }
  }

  const handleNameInput = event => {
    setnewName(event.target.value)
  }

  const handleNumberInput = event => {
    setnewNumber(event.target.value)
  }
  
  const handleSearchInput = event => {
    setnewSearch(event.target.value)
    if (event.target.value.length !== 0) {
      setShowAll(false)
      const filteredContacts = persons.filter(contact => 
        contact.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
      setfilteredPersons(filteredContacts)
    }
    else {
      setShowAll(true)
    }
  }

  return (
    <div>
      <DisplayTitle text='Phonebook' />

      <DisplayMessage message={message} messageCLass={messageClass}/>

      <Filter onChange={handleSearchInput} value={newSearch} />

      <DisplayTitle text='Add New Contact' />

      <PersonForm 
        onNameChange={handleNameInput} nameValue={newName}
        onNumberChange={handleNumberInput} numberValue={newNumber}
        onClick={addPerson}
      />

      <DisplayTitle text='Contacts' />
      
      {personsToShow.map(person => 
          <Person key={person.id} person={person} deleteContact={() => deletePerson(person)} />
        )}
    </div>
  )
  
}

export default App

import axios from "axios";


const baseUrl = 'http://localhost:3001/persons'

const getAll = () => (
  axios.get(baseUrl)
  .then(response => response.data)
)

const addPerson = newPersonObject => {
  const request = axios.post(baseUrl, newPersonObject)
  return request.then(response => response.data)
}

const deletePerson = personObject => {
  const request = axios.delete(`${baseUrl}/${personObject.id}`)
  return request.then(response => response.data)
}

const updatePerson = (newPersonObject) => {
  const request = axios.put(`${baseUrl}/${newPersonObject.id}`, newPersonObject)
  return request.then(response => response.data)
}




export default { addPerson, getAll, deletePerson, updatePerson }
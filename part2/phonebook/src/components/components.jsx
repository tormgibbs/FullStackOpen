/* eslint-disable react/prop-types */

export const DisplayTitle = ({ text }) => <h2>{text}</h2>

export const DisplayMessage = ({ message, messageCLass }) => {
  if (message === null){
    return;
  }
  return (
    <div className={messageCLass}>
      {message}
    </div>
  )
}



export const Person = ({ person, deleteContact }) => (
  <div>
    {person.name} {person.number} <button onClick={deleteContact}>Delete</button>
  </div>
)

export const Filter = ({onChange, value}) => (
  <div>
     filter shown with: <input onChange={onChange} value={value}/>
  </div>
)

export const PersonForm = ({onNameChange, onNumberChange, nameValue, numberValue, onClick}) => (
  <form>
    <div>
      name: <input onChange={onNameChange} value={nameValue} />
    </div>
    <div>
      number: <input onChange={onNumberChange} value={numberValue} />
    </div>
    <div>
      <button onClick={onClick} type="submit">add</button>
    </div>
  </form>
)

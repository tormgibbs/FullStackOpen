/* eslint-disable react/prop-types */
import { useState } from "react"

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const DisplayAnecdote = ({anecdote, index}) => (
  <div>
    {anecdote[index]}
  </div>
)


const DisplayVoteCount = ({selected, votes}) => {
  if (votes[selected] === 1) {
    return <div>has {votes[selected]} vote</div>
  }
  return <div>has {votes[selected]} votes</div>
}

const DisplayInfo = ({text}) => <h1>{text}</h1>

const DisplayMostVotedAnecdote = ({votes, anecdotes}) => {
  const allZero = votes.every(vote => vote === 0)
  
  if (allZero) {
    return <div>No votes have been made yet</div>
  }
  const maxIndex = votes.indexOf(Math.max(...votes))
  return (
    <div>
      {anecdotes[maxIndex]}
      <DisplayVoteCount selected={maxIndex} votes={votes} />
    </div>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const [ selected, setSelected ] = useState(0)
  const [ votes, setVotes ] = useState(new Array(anecdotes.length).fill(0))

  const voteForAnecdote = () => {
    const updatedVotes = votes.map((value, index) =>
      index === selected ? value + 1 : value
    )
    setVotes(updatedVotes)
  }

  const selectAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  return (
    <>
      <DisplayAnecdote anecdote={anecdotes} index={selected} />
      <DisplayVoteCount selected={selected} votes={votes} />
      <Button handleClick={voteForAnecdote} text='vote' />
      <Button handleClick={selectAnecdote} text='next anecdote' />

      <DisplayInfo text='Anecdotes with most votes' />
      <DisplayMostVotedAnecdote anecdotes={anecdotes} votes={votes} />
    </>
  )
}

export default App
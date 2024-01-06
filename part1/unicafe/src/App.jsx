/* eslint-disable react/prop-types */
import { useState } from 'react'

const DisplayInfo = ({text}) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticLine  = ({ text, stat }) => (
  <tr>
    <td>{text}</td>
    <td>{stat}</td>
  </tr>
)

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  return (
    <div>
    <table>
      <tbody>
      <StatisticLine  stat={props.good} text='good' />
      <StatisticLine  stat={props.neutral} text='neutal' />
      <StatisticLine  stat={props.bad} text='bad' />
      <StatisticLine  stat={props.all} text='all' />
      <StatisticLine  stat={props.average} text='average' />
      <StatisticLine  stat={props.positive + '%'} text='positive' />
      </tbody>
    </table>
    </div>
  )
}

const App = () => {
  const [ goodCount, setGoodCount] = useState(0)
  const [ neutralCount, setNeutralCount] = useState(0)
  const [ badCount, setBadCount] = useState(0)
  const [ all, setAll ] = useState(0)
  const [ average, setAverage] = useState(0)
  const [ positive, setPositive] = useState(0)

  const increaseGood = () => {
    const updatedGoodCount = goodCount + 1
    setGoodCount(updatedGoodCount)

    const totalReviews = updatedGoodCount + neutralCount + badCount
    setAll(totalReviews)

    const avg = (updatedGoodCount*1 + neutralCount*0 + badCount*-1)/totalReviews
    setAverage(avg)

    const calculatePositive = (updatedGoodCount / totalReviews) * 100
    setPositive(calculatePositive)
  }

  const increaseNeutral = () => {
    const updatedNeutralCount = neutralCount + 1
    setNeutralCount(updatedNeutralCount)

    const totalReviews = goodCount + updatedNeutralCount + badCount
    setAll(totalReviews)

    const avg = (goodCount*1 + updatedNeutralCount*0 + badCount*-1)/totalReviews
    setAverage(avg)

    const calculatePositive = (goodCount / totalReviews) * 100
    setPositive(calculatePositive)
  }

  const increaseBad = () => {
    const updatedBadCount = badCount + 1
    setBadCount(updatedBadCount)

    const totalReviews = goodCount + neutralCount + updatedBadCount
    setAll(totalReviews)

    const avg = (goodCount*1 + neutralCount*0 + updatedBadCount*-1)/totalReviews
    setAverage(avg)

    const calculatePositive = (goodCount / totalReviews) * 100
    setPositive(calculatePositive)
  }
  
  return (
    <>
      <DisplayInfo text='give feedback' />
      <Button handleClick={increaseGood} text='good' />
      <Button handleClick={increaseNeutral} text='neutral' />
      <Button handleClick={increaseBad} text='bad' />

      <DisplayInfo text='statistics' />

      <Statistics 
        good={goodCount} neutral={neutralCount} 
        bad={badCount} all={all} average={average} 
        positive={positive} 
      /><br/>
    </>
  )
}

export default App
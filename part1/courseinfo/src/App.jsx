/* eslint-disable react/prop-types */
const Header = props => {
  // console.log(props)
  return (
    <h1>{props.course}</h1>
  )
}

const Part = props => {
  return (
    <p>{props.partName} {props.exercise}</p>
  )
}

const Content = props => {
  // console.log(props)
  return (
    <div>
      <Part partName={props.part1} exercise={props.exercise1}/>
      <Part partName={props.part2} exercise={props.exercise2}/>
      <Part partName={props.part3} exercise={props.exercise3}/>
    </div>
  )
}

const Total = props => {
  return (
    <p>
      Number of exercises {props.total}
    </p>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
  
    parts: [ 
      {
        name: 'Fundamental of React',
        exercises: 10
      },

      {
        name: 'Using props to pass data',
        exercises: 7
      },

      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header course={course.name}/>
      <Content 
        part1={course.parts[0].name} exercise1={course.parts[0].exercises} 
        part2={course.parts[1].name} exercise2={course.parts[1].exercises} 
        part3={course.parts[2].name} exercise3={course.parts[2].exercises}
      />
      <Total total={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}/>

    </>
  )
}

export default App
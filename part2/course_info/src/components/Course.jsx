/* eslint-disable react/prop-types */
const Header = ({ name }) => <h2>{name}</h2>

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercise}
  </p>
)
const Content = ({ parts }) => (
  <div>
    {parts.map(part => 
      <Part key={part.id} part={part}/>
    )}
  </div>
)

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercise, 0)

  return <p>Total of {totalExercises} exercises</p>
}


const Course = ({ courses }) => {
  return (
    <div>
      <h1>Web development curriculum</h1> 
      {courses.map(course => (
          <div key={course.id}>
            <Header name={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts} />
          </div>
        )
      )}
    </div>
  )
}


export default Course

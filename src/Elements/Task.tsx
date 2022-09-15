import React from 'react'
import './css/task.css'

function Task (props: any): JSX.Element {
  return <div className={'task'}>
    <h2>{props.element.name}</h2>
    <p>{props.element.description}</p>
    <button className={'btn btn-danger'}>Delete</button>
  </div>
}

export default Task

import React from 'react'
import './css/board-route.css'
import { Link } from 'react-router-dom'
import CreateTaskModal from '../Modals/CreateTaskModal'
import { URLSearchParams } from 'url'

function BoardRoute (): JSX.Element {
  const urlSearchParams = new URLSearchParams(location.search)

  return <div>
        <Link to={'/main'}>
          <button className={'btn btn-primary mb-2'}>Go back</button>
        </Link>
        <button className={'btn btn-info mb-2'} data-bs-toggle="modal" data-bs-target="#createTaskModal">Create task</button>
        <div className={'column-container'}>
        <div className={'todo-column'}>
          <h3>TODO</h3>
        </div>
        <div className={'active-column'}>
          <h3>Active</h3>
        </div>
        <div className={'closed-column'}>
          <h3>Closed</h3>
        </div>
        </div>
      <CreateTaskModal boardId={urlSearchParams.get('id')}/>
      </div>
}

export default BoardRoute

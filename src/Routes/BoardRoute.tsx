import React, { useEffect, useState } from 'react'
import './css/board-route.css'
import { Link } from 'react-router-dom'
import CreateTaskModal from '../Modals/CreateTaskModal'
import Cookies from 'js-cookie'
import { TOKEN_COOKIE_NAME } from '../index'
import Task from '../Elements/Task'
import $ from 'jquery'

function BoardRoute (): JSX.Element {
  const urlParams = new URLSearchParams(location.search)
  const boardId = urlParams.get('id')
  const [todoTasks, setTodoTasks] = useState([])
  const [activeTasks, setActiveTasks] = useState([])
  const [closedTasks, setClosedTasks] = useState([])
  const [firstTime, initFirstTime] = useState(true)

  const updateAllTasks = (): void => {
    updateTasksColumn(1)
    updateTasksColumn(2)
    updateTasksColumn(3)
  }

  const updateTasksColumn = (statusId: number): void => {
    /* eslint-disable-next-line @typescript-eslint/no-floating-promises */
    $.ajax({
      /* eslint-disable-next-line @typescript-eslint/restrict-plus-operands */
      url: 'http://localhost:8000/api/boards/' + boardId + '/columns/' + statusId + '/tasks',
      type: 'GET',
      crossDomain: true,
      beforeSend: function (xhr) {
        /* eslint-disable-next-line @typescript-eslint/restrict-plus-operands */
        xhr.setRequestHeader('Authorization', 'Bearer ' + Cookies.get(TOKEN_COOKIE_NAME))
      }
    }).done(function (response: any): void {
      if (response.result === 'success') {
        if (statusId === 1) {
          setTodoTasks(response.tasks)
        } else if (statusId === 2) {
          setActiveTasks(response.tasks)
        } else {
          setClosedTasks(response.tasks)
        }
      }
    })
  }

  useEffect(() => {
    if (firstTime) {
      updateAllTasks()
      initFirstTime(false)
    }
  })

  return <div>
        <Link to={'/main'}>
          <button className={'btn btn-primary mb-2'}>Go back</button>
        </Link>
        <button className={'btn btn-info mb-2 ms-1'} data-bs-toggle="modal" data-bs-target="#createTaskModal">Create task</button>
        <div className={'column-container'}>
        <div className={'todo-column'}>
          <h3>TODO</h3>
          <div>
            { todoTasks.map(function (element: any, i: number) {
              return <Task
                  element={element}
                  boardId={boardId}
                  updateTasks={updateAllTasks}
                  key={i}
              />
            }) }
          </div>
        </div>
        <div className={'active-column'}>
          <h3>Active</h3>
          <div>
            { activeTasks.map(function (element: any, i: number) {
              return <Task element={element} boardId={boardId} updateTasks={updateAllTasks} key={i} />
            }) }
          </div>
        </div>
        <div className={'closed-column'}>
          <h3>Closed</h3>
          <div>
            { closedTasks.map(function (element: any, i: number) {
              return <Task element={element} boardId={boardId} updateTasks={updateAllTasks} key={i} />
            }) }
          </div>
        </div>
        </div>
      <CreateTaskModal boardId={boardId}/>
      </div>
}

export default BoardRoute

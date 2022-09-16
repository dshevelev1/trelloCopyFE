import React from 'react'
import './css/task.css'
import $ from 'jquery'
import Cookies from 'js-cookie'
import { TOKEN_COOKIE_NAME } from '../index'
function Task (props: any): JSX.Element {
  const moveTaskRequest = (): void => {
    /* eslint-disable-next-line @typescript-eslint/no-floating-promises */
    $.ajax({
      /* eslint-disable-next-line @typescript-eslint/restrict-plus-operands */
      url: 'http://localhost:8000/api/boards/' + props.boardId + '/columns/' + props.element.status + '/tasks/' + props.element.id,
      type: 'PUT',
      beforeSend: function (xhr) {
        /* eslint-disable-next-line @typescript-eslint/restrict-plus-operands */
        xhr.setRequestHeader('Authorization', 'Bearer ' + Cookies.get(TOKEN_COOKIE_NAME))
      }
    }).done(function (response: any): void {
      if (response.result === 'success') {
        props.updateTasks()
      }
    }).fail(function (response) {
      if (response.status === 401) {
        Cookies.remove(TOKEN_COOKIE_NAME)
      }
    })
  }

  const sendDeleteRequest = (): void => {
    if (confirm('Вы уверены?')) {
      /* eslint-disable-next-line @typescript-eslint/no-floating-promises */
      $.ajax({
        /* eslint-disable-next-line @typescript-eslint/restrict-plus-operands */
        url: 'http://localhost:8000/api/boards/' + props.boardId + '/columns/' + props.element.status + '/tasks/' + props.element.id,
        type: 'DELETE',
        beforeSend: function (xhr) {
          /* eslint-disable-next-line @typescript-eslint/restrict-plus-operands */
          xhr.setRequestHeader('Authorization', 'Bearer ' + Cookies.get(TOKEN_COOKIE_NAME))
        }
      }).done(function (response: any): void {
        if (response.result === 'success') {
          props.updateTasks()
          alert('Успешно удалено')
        }
      }).fail(function (response) {
        if (response.status === 401) {
          Cookies.remove(TOKEN_COOKIE_NAME)
        }
      })
    }
  }

  return <div className={'task'}>
    <h2>{props.element.name}</h2>
    <p>{props.element.description}</p>
    <button className={'btn btn-danger'} onClick={sendDeleteRequest}>Delete</button>
    <button className={'btn btn-success ms-1'} onClick={moveTaskRequest}>Move</button>
  </div>
}

export default Task

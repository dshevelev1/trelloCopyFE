import React, { useState } from 'react'
import $ from 'jquery'
import Cookies from 'js-cookie'
import { TOKEN_COOKIE_NAME } from '../index'
import 'bootstrap/dist/js/bootstrap.min'

function CreateTaskModal (props: any): JSX.Element {
  const [name, setName] = useState('')
  const [status, setStatus] = useState('')
  const [description, setDescription] = useState('')

  const sendRequest = (): void => {
    /* eslint-disable-next-line @typescript-eslint/no-floating-promises */
    $.ajax({
      /* eslint-disable-next-line @typescript-eslint/restrict-plus-operands */
      url: 'http://localhost:8000/api/boards/' + props.boardId + '/columns/1/tasks',
      type: 'POST',
      crossDomain: true,
      beforeSend: function (xhr) {
        /* eslint-disable-next-line @typescript-eslint/restrict-plus-operands */
        xhr.setRequestHeader('Authorization', 'Bearer ' + Cookies.get(TOKEN_COOKIE_NAME))
      },
      data: {
        name,
        description,
        status
      }
    }).done(function (response: any): void {
      if (response.result === 'success') {
        $('#createTaskModal').hide()
        location.reload()
      } else {
        $('.alert-danger').removeClass('d-none')
      }
    }).fail(function (response) {
      if (response.status === 401) {
        Cookies.remove(TOKEN_COOKIE_NAME)
      }
    })
  }

  const onChangeName = (event: any): void => {
    setName(event.target.value)
  }

  const onChangeDescription = (event: any): void => {
    setDescription(event.target.value)
  }

  const onChangeStatus = (event: any): void => {
    setStatus(event.target.value)
  }

  return <div className="modal" id={'createTaskModal'} tabIndex={-1}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">New Task</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="alert alert-danger d-none" role="alert">
          Wrong data
        </div>
        <div className="modal-body">
          <label className={'text-start'}>
            Task Name
            <input type={'text'} className={'form-control'} placeholder={'Name'} onChange={onChangeName}/>
          </label>
          <label className={'text-start mt-2'}>
            Task Description
            <textarea className={'form-control'} cols={23} placeholder={'Description'} onChange={onChangeDescription}></textarea>
          </label>
          <label className={'text-start mt-2'}>
            Task Status
            <input type={'number'} className={'form-control'} placeholder={'(1 - todo, 2 - active, 3 - closed)'} onChange={onChangeStatus}/>
          </label>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" className="btn btn-primary ms-1" onClick={sendRequest}>Create</button>
        </div>
      </div>
    </div>
  </div>
}

export default CreateTaskModal

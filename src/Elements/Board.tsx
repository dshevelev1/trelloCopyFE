import React from 'react'
import './css/board.css'
import Cookies from 'js-cookie'
import $ from 'jquery'
import { TOKEN_COOKIE_NAME } from '../index'
import { Link } from 'react-router-dom'

function Board (props: any): JSX.Element {
  function sendDeleteRequest (): void {
    if (confirm('Вы уверены?')) {
      /* eslint-disable-next-line @typescript-eslint/no-floating-promises */
      $.ajax({
        /* eslint-disable-next-line @typescript-eslint/restrict-plus-operands */
        url: 'http://localhost:8000/api/boards/' + props.data.id,
        type: 'DELETE',
        beforeSend: function (xhr) {
          /* eslint-disable-next-line @typescript-eslint/restrict-plus-operands */
          xhr.setRequestHeader('Authorization', 'Bearer ' + Cookies.get(TOKEN_COOKIE_NAME))
        }
      }).done(function (response: any) {
        if (response.result === 'success') {
          props.updateBoards()
          alert('Успешно удалено')
        }
      }).fail(function (response) {
        if (response.status === 401) {
          Cookies.remove(TOKEN_COOKIE_NAME)
        }
      })
    }
  }

  return <div className={'board card col-lg-2'} /* eslint-disable-next-line @typescript-eslint/restrict-plus-operands */>
    <Link to={'/board?id=' + props.data.id}><h3 className={'card-header bg-primary text-white'}>{props.data.name}</h3></Link>
    <p className={'card-body'}>
      {props.data.description}
    </p>
    <div className={'card-footer'}>
      <button className={'btn btn-danger'} onClick={sendDeleteRequest}>Delete</button>
    </div>
  </div>
}

export default Board

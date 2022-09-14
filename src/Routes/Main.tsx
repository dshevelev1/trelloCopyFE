import React, { useEffect, useState } from 'react'
import Board from '../Elements/Board'
import $ from 'jquery'
import Cookies from 'js-cookie'
import { TOKEN_COOKIE_NAME } from '../index'

export interface IBoard {
  id: number
  name: string
  description: string
}

function Main (): JSX.Element {
  const [boards, setBoards] = useState<IBoard[] | []>([])
  const [firstTime, setFirstTime] = useState(true)

  const updateBoards = (): void => {
    /* eslint-disable-next-line @typescript-eslint/no-floating-promises */
    $.ajax({
      url: 'http://localhost:8000/api/boards',
      type: 'GET',
      crossDomain: true,
      beforeSend: function (xhr) {
        /* eslint-disable-next-line @typescript-eslint/restrict-plus-operands */
        xhr.setRequestHeader('Authorization', 'Bearer ' + Cookies.get(TOKEN_COOKIE_NAME))
      }
    }).done(function (response: any) {
      if (response.result === 'success' && typeof response.boards !== 'undefined') {
        setBoards(response.boards)
        setFirstTime(false)
      }
    }).fail(function (response) {
      if (response.status === 401) {
        Cookies.remove(TOKEN_COOKIE_NAME)
        location.href = '/login'
      }
    })
  }

  useEffect(() => {
    if (firstTime) {
      updateBoards()
    }
  })

  return <div className={'boards-container'}>
    { boards.map(function (element: IBoard, i: number) {
      return <Board key={i} data={element} updateBoards={updateBoards} />
    }) }
  </div>
}

export default Main

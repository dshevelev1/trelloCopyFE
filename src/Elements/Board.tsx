import React from 'react'
import './css/board.css'
import { Link } from 'react-router-dom'

function Board (): JSX.Element {
  return <Link className={'board card col-lg-3'} to={'/board'}>
    <h3 className={'card-header bg-primary text-white'}>Board Name</h3>
    <p className={'card-body'}>
      Board description Board description Board description
      Board description Board description Board description
      Board description Board description Board description
    </p>
    <div className={'card-footer'}>
      <button className={'btn btn-danger'}>Delete</button>
    </div>
  </Link>
}

export default Board

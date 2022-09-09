import React from 'react'

function CreateBoardModal (): JSX.Element {
  return <div className="modal" id={'createBoardModal'} tabIndex={-1}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">New Board</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form className="modal-body">
          <label className={'text-start'}>
            Board Name
            <input type={'text'} className={'form-control'} placeholder={'Name'}/>
          </label>
          <label className={'text-start mt-2'}>
            Board Description
            <input type={'text'} className={'form-control'} placeholder={'Description'}/>
          </label>
          <br />
          <label className={'text-start mt-2'}>
            Board Participants
            <select className={'form-control'} multiple={true}>
              <option value={1}>Guy 1</option>
              <option value={1}>Guy 2</option>
              <option value={1}>Guy 3</option>
            </select>
          </label>
        </form>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" className="btn btn-primary">Create</button>
        </div>
      </div>
    </div>
  </div>
}

export default CreateBoardModal

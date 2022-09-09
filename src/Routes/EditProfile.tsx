import React from 'react'

function EditProfile (): JSX.Element {
  return <div>
    <form className={'card col-lg-3 m-auto'}>
      <h3 className={'card-header'}>Edit profile</h3>
      <div className={'card-body'}>
        <label>
          <input type={'text'} className={'form-control'} placeholder={'New Login'}/>
          <input type={'password'} className={'form-control mt-2'} placeholder={'Old Password'}/>
          <input type={'password'} className={'form-control mt-2'} placeholder={'New Password'}/>
          <input type={'submit'} value={'Save'} className={'btn btn-primary mt-2'}/>
        </label>
      </div>
    </form>
    <form className={'mt-5 card col-lg-3 m-auto'}>
      <h3 className={'card-header'}>Delete profile</h3>
      <div className={'card-body'}>
        <input type={'submit'} value={'Delete'} className={'btn btn-warning'}/>
      </div>
    </form>
  </div>
}

export default EditProfile

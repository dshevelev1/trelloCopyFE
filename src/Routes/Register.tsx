import React from 'react'

function Register (): JSX.Element {
  return <form className={'card col-lg-3 m-auto'}>
    <h3 className={'card-header'}>Register Form</h3>
    <div className={'card-body'}>
      <label className={'form-label'}>
          <input type={'text'} className={'form-control'} placeholder={'Login'} />
          <input type={'password'} className={'form-control mt-2'} placeholder={'Password'} />
          <input type={'password'} className={'form-control mt-2'} placeholder={'Repeat password'} />
          <input type={'submit'} value={'Sign up'} className={'btn btn-primary mt-2'} />
      </label>
    </div>
  </form>
}

export default Register

import React from 'react'

function Login (): JSX.Element {
  return <form>
    <h3>Login Form</h3>
    <label className={'form-label'}>
      <input type={'text'} className={'form-control'} placeholder={'Login'} />
      <input type={'password'} className={'form-control mt-2'} placeholder={'Password'} />
      <input type={'submit'} value={'Sign in'} className={'btn btn-primary mt-2'} />
    </label>
  </form>
}

export default Login

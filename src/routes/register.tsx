import React from 'react'

function Register (): JSX.Element {
  return <form>
      <h3>Register Form</h3>
      <label className={'form-label'}>
          <input type={'text'} className={'form-control'} placeholder={'Login'} />
          <input type={'password'} className={'form-control mt-2'} placeholder={'Password'} />
          <input type={'password'} className={'form-control mt-2'} placeholder={'Repeat password'} />
          <input type={'submit'} value={'Sign up'} className={'btn btn-primary mt-2'} />
      </label>
  </form>
}

export default Register

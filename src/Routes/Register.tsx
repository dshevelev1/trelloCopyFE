import React, { useState } from 'react'
import $ from 'jquery'
import './css/register.css'
import 'bootstrap/dist/js/bootstrap.min'

function Register (): JSX.Element {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [repeatedPassword, setRepeatedPassword] = useState('')
  const [email, setEmail] = useState('')

  const onLoginChange = (event: any): void => {
    setLogin(event.target.value)
  }

  const onEmailChange = (event: any): void => {
    setEmail(event.target.value)
  }

  const onPassChange = (event: any): void => {
    setPassword(event.target.value)
  }

  const onRepeatedPassChange = (event: any): void => {
    setRepeatedPassword(event.target.value)
  }

  const submitRegister = (): void => {
    /* eslint-disable-next-line @typescript-eslint/no-floating-promises */
    $.ajax({
      url: 'http://localhost:8000/api/auth/signup',
      data: {
        username: login,
        email,
        password,
        repeatedPassword
      },
      type: 'POST'
    }).done(function (response: any): void {
      $('.errors-container').html('')

      if (response.result === 'error') {
        for (const key in response.errors) {
          /* eslint-disable-next-line @typescript-eslint/restrict-plus-operands */
          $('.errors-container').append('<li>' + response.errors[key] + '</li>')
        }
      } else {
        $('.alert-success').removeClass('d-none')

        setTimeout(function () {
          window.location.href = '/login'
        }, 1500)
      }
    })
  }

  return <div className={'card col-lg-3 m-auto'}>
    <h3 className={'card-header'}>Register Form</h3>
    <div className="alert alert-success d-none" role="alert">
      Well Done, now sign in
    </div>
    <div className={'card-body'}>
      <label className={'form-label'}>
          <input
              type={'text'}
              className={'form-control'}
              placeholder={'Login'}
              value={login}
              onChange={onLoginChange}
          />
          <input
              type={'email'}
              className={'form-control mt-2'}
              placeholder={'Email'}
              value={email}
              onChange={onEmailChange}
              name={'email'}
          />
          <input
              type={'password'}
              className={'form-control mt-2'}
              placeholder={'Password'}
              value={password}
              onChange={onPassChange}
              name={'password'}
          />
          <input
              type={'password'}
              className={'form-control mt-2'}
              placeholder={'Repeat password'}
              value={repeatedPassword}
              onChange={onRepeatedPassChange}
          />
          <input
              type={'button'}
              value={'Sign up'}
              className={'btn btn-primary mt-2'}
              onClick={submitRegister}
          />
      </label>
      <ul className={'errors-container'}>
      </ul>
    </div>
  </div>
}

export default Register

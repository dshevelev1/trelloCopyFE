import React, { useState } from 'react'
import Cookies from 'js-cookie'
import $ from 'jquery'

function Login (): JSX.Element {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const TOKEN_COOKIE_NAME = 'jwt_token'

  const onLoginChange = (event: any): void => {
    setLogin(event.target.value)
  }

  const onPasswordChange = (event: any): void => {
    setPassword(event.target.value)
  }

  const submitLogin = (): void => {
    $('.alert').addClass('d-none')

    /* eslint-disable-next-line @typescript-eslint/no-floating-promises */
    $.ajax({
      url: 'http://localhost:8000/api/auth/login',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        username: login,
        password
      }),
      type: 'POST'
    }).done(function (response: any) {
      if (typeof response.token !== 'undefined') {
        Cookies.set(TOKEN_COOKIE_NAME, response.token)
        $('.alert-success').removeClass('d-none')

        setTimeout(function (): void {
          window.location.href = '/Main'
        }, 1500)
      } else {
        $('.alert-danger').removeClass('d-none')
      }
    }).fail(function () {
      $('.alert-danger').removeClass('d-none')
    })
  }

  return <div className={'card col-lg-3 m-auto'}>
    <h3 className={'card-header'}>Login Form</h3>
    <div className="alert alert-success d-none" role="alert">
      Well Done
    </div>
    <div className="alert alert-danger d-none" role="alert">
      Wrong credentials
    </div>
    <div className={'card-body'}>
      <label className={'form-label'}>
        <input type={'text'} className={'form-control'} placeholder={'Login'} onChange={onLoginChange} value={login} />
        <input type={'password'} className={'form-control mt-2'} placeholder={'Password'} onChange={onPasswordChange} value={password} />
        <input type={'button'} value={'Sign in'} className={'btn btn-primary mt-2'} onClick={submitLogin} />
      </label>
    </div>
  </div>
}

export default Login

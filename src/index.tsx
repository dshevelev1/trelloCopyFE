import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import Welcome from './Routes/Welcome'
import Login from './Routes/Login'
import Register from './Routes/Register'
import NotFound from './Routes/NotFound'
import EditProfile from './Routes/EditProfile'
import Main from './Routes/Main'
import BoardRoute from './Routes/BoardRoute'
import Cookies from 'js-cookie'
export const TOKEN_COOKIE_NAME = 'jwt_token'
const DEFAULT_AUTH_PATH = 'login'
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

export const authorized = (): boolean => {
  return typeof Cookies.get(TOKEN_COOKIE_NAME) !== 'undefined'
}

function privateRoute (path: string, elem: JSX.Element): JSX.Element {
  if (authorized()) {
    return <Route path={path} element={elem} />
  }

  return <Route path={DEFAULT_AUTH_PATH} element={<Login />} />
}

root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App />}>
                <Route path="/" element={<Welcome />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                {privateRoute('edit-profile', <EditProfile />)}
                {privateRoute('main', <Main />)}
                {privateRoute('board', <BoardRoute />)}
                <Route path='*' element={<NotFound />} />
              </Route>
          </Routes>
      </BrowserRouter>
  </React.StrictMode>
)

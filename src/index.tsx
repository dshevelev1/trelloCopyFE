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
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App />}>
                <Route path="/" element={<Welcome />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path='edit-profile' element={<EditProfile />} />
                <Route path='main' element={<Main />} />
                <Route path='board' element={<BoardRoute />} />
                <Route path='*' element={<NotFound />} />
              </Route>
          </Routes>
      </BrowserRouter>
  </React.StrictMode>
)

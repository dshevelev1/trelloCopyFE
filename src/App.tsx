import * as React from 'react'
import './css/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import { Link, Outlet, useLocation } from 'react-router-dom'
import LocalizedStrings from 'react-localization'
import { useState } from 'react'
import CreateBoardModal from './Modals/CreateBoardModal'
import Cookies from 'js-cookie'

const ENGLISH_LANG = 'en'; const RUSSIAN_LANG = 'ru'
const TOKEN_COOKIE_NAME = 'jwt_token'

const strings = new LocalizedStrings({
  en: {
    signin: 'Sign In',
    signup: 'Sign Up',
    signout: 'Sign Out',
    welcome: 'Welcome to the Trello Copy!',
    logo: 'Trello Copy',
    editprofile: 'Edit Profile',
    createnewboard: 'Create New Board',
    main: 'Boards'
  },
  ru: {
    signin: 'Войти',
    signup: 'Регистрация',
    welcome: 'Добро пожаловать в Trello Copy!',
    logo: 'Копия Трелло',
    editprofile: 'Редактировать профиль',
    signout: 'Выйти',
    createnewboard: 'Создать новый проект',
    main: 'Главная'
  }
})

function App (): JSX.Element {
  const [lang, setLang] = useState(ENGLISH_LANG)
  const isActive = (link: string): string => {
    return useLocation().pathname === link ? 'active' : ''
  }

  const changeLanguage = (): void => {
    const newLang = lang === ENGLISH_LANG ? RUSSIAN_LANG : ENGLISH_LANG
    strings.setLanguage(newLang)
    setLang(newLang)
  }

  const signout = (): void => {
    Cookies.remove(TOKEN_COOKIE_NAME)
    setLang(lang)
  }

  const authorized = (): boolean => {
    return typeof Cookies.get(TOKEN_COOKIE_NAME) !== 'undefined'
  }

  const getLinks = (): JSX.Element[] => {
    if (authorized()) {
      return [
        <Link to={'main'} key={2}>
          {strings.main}
        </Link>,
        <a href={'#'} data-bs-toggle="modal" data-bs-target="#createBoardModal" key={4}>
          {strings.createnewboard}
        </a>,
        <Link to={'edit-profile'} key={1}>
          {strings.editprofile}
        </Link>,
        <a href={'#'} key={3} onClick={signout}>
          {strings.signout}
        </a>
      ]
    } else {
      return [
        <Link to={'login'} className={isActive('/login')} key={5}>
          {strings.signin}
        </Link>,
        <Link to={'register'} className={isActive('/register')} key={6}>
          {strings.signup}
        </Link>
      ]
    }
  }

  return (
    <main className={'app-main'}>
      <header>
          <div className={'logo'}>
            <Link to={'/'}>{strings.logo}</Link>
          </div>
          <div className={'links'}>
            {getLinks()}
            <a href={'#'} onClick={changeLanguage}>{lang === RUSSIAN_LANG ? ENGLISH_LANG : RUSSIAN_LANG}</a>
          </div>
      </header>
      <section className={'main-content'}>
        <Outlet />
      </section>
        <footer>
          <h5 className={'text-white'}>{(new Date()).getFullYear()}</h5>
      </footer>
      <CreateBoardModal />
    </main>
  )
}

export default App

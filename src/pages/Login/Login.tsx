import { FC, useState } from 'react'
import './Login.scss'
import logo from '../../../public/images/icon/Logo 1.svg'
import LoginModal from './logInModal/LoginModal'
import AuthModal from './authModal/AuthModal'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Login: FC = () => {
  const isAdmin: boolean = true
  const { t } = useTranslation()
  const [elementLogin, setElementLogin] = useState<string>('login')
  return <div className='login'>
    <div className="login__bg">
      <div className="login__card">
        <div className="login__card-logo">
          <img src={logo} alt="logo" />
        </div>
        {
          elementLogin === 'login' ?
            <LoginModal /> :
            <AuthModal />
        }
        <div className="login__status">
          {
            isAdmin && (elementLogin === 'login' ?
              <button onClick={() => setElementLogin('auth')}>{t("LogIn.Registration")}</button> :
              <button onClick={() => setElementLogin('login')}>{t("LogIn.Authorization")}</button>)

          }
          <Link to='/' >{t("LogIn.Use as Guest")}</Link>
        </div>
      </div>
    </div>
  </div>
}

export default Login
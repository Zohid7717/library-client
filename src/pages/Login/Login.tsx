import { FC } from 'react'
import './Login.scss'
import logo from '../../assets/images/icon/Logo 1.svg'
import LoginModal from './logInModal/LoginModal'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Login: FC = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const fromPage: string = location.state?.from?.pathname || '/'
  return <div className='login'>
    <div className="login__bg">
      <div className="login__card">
        <div className="login__card-logo">
          <img src={logo} alt="logo" />
        </div>
        <LoginModal fromPage = {fromPage} />
        <div className="login__status">
          <Link to='/' >{t("LogIn.Use as Guest")}</Link>
        </div>
      </div>
    </div>
  </div>
}

export default Login
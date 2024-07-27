import { FC } from 'react'
import LogInHeader from './logInHeader/LogInHeader'
import { useTranslation } from 'react-i18next'
import enterIcon from '../../../../../public/images/icon/enter-svg.svg'

import './HeaderAccount.scss'
import { Link } from 'react-router-dom'

const HeaderAccount: FC = () => {
  const isAuth: boolean = false
  const {t} = useTranslation()
  return (
    <div className='header-account' >
      {isAuth ?
        <LogInHeader /> :
        <Link to='/login'>
          <img src={enterIcon} alt="enter-icon" />
          <span>{ t("HeaderAccount.logIn")}</span>
        </Link>}
    </div >
  )
}
export default HeaderAccount
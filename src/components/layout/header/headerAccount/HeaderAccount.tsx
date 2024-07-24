import { FC } from 'react'
import LogInHeader from './logInHeader/LogInHeader'
import { useTranslation } from 'react-i18next'
import enterIcon from '../../../../../public/images/icon/enter-svg.svg'

import './HeaderAccount.scss'

const HeaderAccount: FC = () => {
  const isAuth: boolean = true
  const {t} = useTranslation()
  return (
    <div className='header-account' >
      {isAuth ?
        <LogInHeader /> :
        <button>
          <img src={enterIcon} alt="enter-icon" />
          <span>{ t("HeaderAccount.logIn")}</span>
        </button>}
    </div >
  )
}
export default HeaderAccount
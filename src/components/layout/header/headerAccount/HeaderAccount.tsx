import { FC } from 'react'
import LogInHeader from './logInHeader/LogInHeader'
import { useTranslation } from 'react-i18next'
import enterIcon from '../../../../assets/images/icon/enter-svg.svg'

import './HeaderAccount.scss'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../../../server/redux/hooks'

const HeaderAccount: FC = () => {
  const role = useAppSelector(state => state.user.role)
  // console.log(role)
  const {t} = useTranslation()
  return (
    <div className='header-account' >
      {role !== null ?
        <LogInHeader /> :
        <Link to='/login'>
          <img src={enterIcon} alt="enter-icon" />
          <span>{ t("HeaderAccount.logIn")}</span>
        </Link>}
    </div >
  )
}
export default HeaderAccount
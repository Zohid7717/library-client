import { FC, useEffect, useRef, useState } from 'react'
import userIcon from '../../../../../assets/images/icon/user-ison.svg'
import './LogInHeader.scss'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../../../../server/redux/hooks'
import { logOut } from '../../../../../server/redux/userSlice/userSlice'

const LogInHeader: FC = () => {
  const userImg: string | null = null
  const [selectMenu, setSelectMenu] = useState<boolean>(false)
  const dropDownRef = useRef<HTMLDivElement>(null)
  const handleClickOutside = (event: MouseEvent) => {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
      setSelectMenu(false)
    }
  }
  const dispatch = useAppDispatch()
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  const { t } = useTranslation()

  return <div className='header-account__login' ref={dropDownRef}>
    <button onClick={() => setSelectMenu(!selectMenu)}>
      <img src={userImg ? userImg : userIcon} alt="user image" />
      <span>Kenson</span>
    </button>
    <div className={
      selectMenu ?
        "header-account__drop-down-list active" :
        "header-account__drop-down-list"
    }>
      <Link to='/profile'>
        {t("HeaderAccount.profile")}
      </Link>
      <button onClick={() => dispatch(logOut())}>
        {t("HeaderAccount.logOut")}
      </button>
    </div>
  </div>
}

export default LogInHeader
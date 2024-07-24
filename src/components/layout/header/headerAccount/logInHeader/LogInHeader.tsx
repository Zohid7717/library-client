import { FC, useEffect, useRef, useState } from 'react'
import userIcon from '../../../../../../public/images/icon/user-ison.svg'
import './LogInHeader.scss'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const LogInHeader: FC = () => {
  const userImg: string | null = null
  const [selectMenu, setSelectMenu] = useState<boolean>(false)
  const dropDownRef = useRef<HTMLDivElement>(null)
  const handleClickOutside = (event: MouseEvent) => {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
      setSelectMenu(false)
    }
  }
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
      <button>
        {t("HeaderAccount.logOut")}
      </button>
    </div>
  </div>
}

export default LogInHeader
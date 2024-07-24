import { FC } from 'react'
import './Header.scss'
import HeaderSearch from './headerSearch/HeaderSearch'
import HeaderAccount from './headerAccount/HeaderAccount'
import HeaderLang from './headerLang/HeaderLang'


const Header: FC = () => {
  return <header className='header'>
    <HeaderSearch />
    <HeaderLang />
    <HeaderAccount />
  </header>
}

export default Header

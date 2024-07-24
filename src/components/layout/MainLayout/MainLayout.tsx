import { FC } from 'react'
import Header from '../header/Header'
import Sidebar from '../sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import './MainLayout.scss'

const MainLayout: FC = () => {
  return <div className='main-layout'>
    <Header />
    <main>
      <Outlet/>
    </main>
    <Sidebar />
  </div>
}

export default MainLayout
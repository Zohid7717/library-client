import { FC } from 'react'
import './Home.scss'
import HomeCards from './HomeCards/HomeCards'
import HomeQuotes from './HomeQuotes/HomeQuotes'
import HomeTags from './HomeTags/HomeTags'

const Home: FC = () => {
  
  return <div className='home'>
    <div className="home__header">
      <HomeQuotes />
      <HomeTags/>
    </div>
    <HomeCards title=''/>
  </div>
}

export default Home
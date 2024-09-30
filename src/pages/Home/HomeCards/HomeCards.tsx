import { FC } from 'react'
import './HomeCards.scss'
type HomeCardsProps = {
  title: string
}
const HomeCards: FC<HomeCardsProps> = ({ title }) => {
  return <div className='home-cards'>
    <h2>{title}</h2>
  </div>
}

export default HomeCards
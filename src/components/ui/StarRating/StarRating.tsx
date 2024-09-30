import { Dispatch, FC, SetStateAction, useState } from 'react'
import './StarRating.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next'

type Props = {
  count: number,
  current: number,
  setCurrent?: Dispatch<SetStateAction<number>>
}

const StarRating: FC<Props> = ({ count = 5, current, setCurrent }) => {
  const stars = Array(count).fill(0)
  const [hoverItem, setHoverItem] = useState<number>(-1)
  const {t}=useTranslation()
  if (setCurrent) {
    return (
      <div className='star'>
        <div className='star__wrap'>
          {
            stars.map((item, index) => {
              const currentStyle = index <= current ? { color: 'gold' } : {}
              const hoverStyle = index <= hoverItem ? { color: 'gold' } : {}
              return (
                <div
                  className='star__item'
                  key={index}
                  style={{ ...currentStyle, ...hoverStyle }}
                  onMouseMove={() => setHoverItem(index)}
                  onMouseOut={() => setHoverItem(-1)}
                  onClick={() => setCurrent(index)}
                >
                  <FontAwesomeIcon icon={faStar} />
                </div>
              )
            })
          }
        </div >
        <h4><span>{current + 1}</span>{ t('book.Your rating')}</h4>
      </div>
    )
  } else {
    return (
      <div className='star'>
        <div className='star__wrap'>
          {
            stars.map((item, index) => {
              return (
                <div
                  className='star_item'
                  key={index}
                  style={index <= current - 1 ? { color: 'gold' } : {}}
                >
                  <FontAwesomeIcon icon={faStar} />
                </div>
              )
            })
          }
        </div >
        <h4><span>{current ? current : 0}</span> { t('book.Book rating')}</h4>
      </div>
    )
  }
}

export default StarRating
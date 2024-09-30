import { FC } from 'react'
import './BookImage.scss'
import { getImg } from '../../../server/apiImg'

type Props = {
  bookImg: string | null,
  title: string
}

const BookImage: FC<Props> = ({bookImg, title}) => {
  return <div className='book-img'>
    {bookImg ?
      <img src={getImg(bookImg)} alt={title}/> :
      <p>{title}</p>
    }
  </div>
}

export default BookImage
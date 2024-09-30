import { FC, useEffect, useState } from 'react'
import './BookInfo.scss'
import StarRating from '../../../components/ui/StarRating/StarRating'
import axios from '../../../server/axios/axios'
import { useAppSelector } from '../../../server/redux/hooks'
import BookAvailability from '../BookFormat/BookFormat'
import { useTranslation } from 'react-i18next'
import locationIcon from '../../../assets/images/icon/location.svg'

type Props = {
  id: number,
  title: string,
  author: string,
  ratings: number,
  voters: number,
  h_book: boolean,
  e_book: boolean,
  a_book: boolean,
  location: string,
  price: number,
  category_title: string,
  language: string
}

const BookInfo: FC<Props> = ({ id, title, author, ratings, voters, h_book, e_book, a_book, location, price, category_title, language }) => {
  const user_id = useAppSelector(state => state.user.user?.id)
  const [currentItem, setCurrentItem] = useState<number>(-1)

  const getUserRating = async (user_id: number, book_id: number) => {
    try {
      const rating = await axios.post('/rating/getUserRating', { user_id, book_id })
      setCurrentItem(rating.data.rating - 1)
    } catch (error) {
      console.log(error)
      setCurrentItem(0)
    }
  }

  const { t } = useTranslation()

  useEffect(() => {
    if (user_id && id) {
      getUserRating(user_id, id)
    }
  }, [user_id, id])

  console.log(ratings, voters)

  return <div className='book-info'>
    <h2>{title}</h2>
    <h3>{author}</h3>
    <div className="book-info__rating">
      <StarRating count={5} current={(ratings / voters)} />
      <StarRating count={5} current={currentItem} setCurrent={setCurrentItem} />
    </div>

    <div className="book-info__format-status">
      <div className="book-info__format">
        <h4>{t('book.Book format')}</h4>
        <BookAvailability title={t('admin.addBook.Hard book')} status={h_book} />
        <BookAvailability title={t('admin.addBook.E book')} status={e_book} />
        <BookAvailability title={t('admin.addBook.Audio book')} status={a_book} />
      </div>
      <div className="book-info__status">
        <h4>{t('book.Book location')}</h4>
        {h_book ?
          <p><img src={locationIcon} alt="location" /> <span>{location}</span></p> :
          <p>{t('book.Expected')}</p>}
      </div>
      <div className="book-info__additionally">
        <div>
          <h5>{t('book.Price')}</h5>
          <p>{ price}</p>
        </div>
        <div>
          <h5>{t('book.Category')}</h5>
          <p>{category_title}</p>
        </div>
        <div>
          <h5>{t('book.Language')}</h5>
          <p>{ language}</p>
        </div>
      </div>
    </div>

  </div>
}

export default BookInfo
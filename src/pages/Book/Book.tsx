import { FC, useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../server/redux/hooks'
import { getBook } from '../../server/redux/bookSlice/bookSlice'
import { useTranslation } from 'react-i18next'
import BookImage from './BookImage/BookImage'
import BookInfo from './BookInfo/BookInfo'
import BookFragment from './BookFragment/BookFragment'
import BookFunctional from './BookFunctional/BookFunctional'
import './Book.scss'

const Book: FC = () => {
  const params = useParams()
  const id = params.id
  const dispatch = useAppDispatch()
  const location = useLocation()
  const fromPage: string = location.state?.from?.pathname || '/'
  const { t } = useTranslation()
  const { book, isLoading } = useAppSelector(state => state.bookSlice)
  useEffect(() => {
    if (id) {
      dispatch(getBook(id))
    }
  }, [id])

  if (isLoading) {
    return
    <section>
      Loading...
    </section>
  }

  if (!book) {
    return
    <section>
      {t("book.No data available")}
    </section>
  }

  console.log(book)

  return (
    <section className='book'>
      <Link to={fromPage}> <span>{`${'<'}`}</span>{t("book.Go back")}</Link>
      <div className="book__wrap">
        <div className="book__left">
          <div className="book__img-info">
            <BookImage title={book.title} bookImg={book.image} />
            <BookInfo
              id={book.id}
              title={book.title}
              author={book.authors_names}
              ratings={book.sum_of_ratings}
              voters={book.number_of_voters}
              h_book={book.h_book}
              e_book={book.e_book}
              a_book={book.a_book}
              location={book.book_location}
              price={book.price}
              category_title={book.category_title}
              language={book.book_lang}
            />
          </div>
          <div className="book__functional">
            <BookFunctional
              reviews={book.reviews}
              annotation={book.book_about}
            />
          </div>
        </div>
        <div className="book__fragment">
          <BookFragment />
        </div>
      </div>
    </section>
  )
}

export default Book
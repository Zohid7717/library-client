import { FC, useState } from 'react'
import './BookFunctional.scss'
import { useTranslation } from 'react-i18next'
import { ReviewType } from '../../../server/redux/bookSlice/types'
import Annotation from './Annotation/Annotation'
import AudioBook from './AudioBook/AudioBook'
import EBook from './EBook/EBook'
import Reviews from './Reviews/Reviews'
import AddReview from './AddReview/AddReview'

type Props = {
  reviews: ReviewType[],
  annotation: string
}

const BookFunctional: FC<Props> = ({ reviews, annotation }) => {
  const [activeTab, setActiveTab] = useState<string>('annotation')
  const { t } = useTranslation()
  const titleArr = [
    {
      title: 'annotation',
      value: t('book.Annotation')
    }, {
      title: 'reviews',
      value: t('book.Reviews')
    }, {
      title: 'e-book',
      value: t('book.Download electronic copy')
    }, {
      title: 'a-book',
      value: t('book.Download audio copy')
    }, {
      title: 'review',
      value: t('book.Add Review')
    }]
  return <div className='book-func'>
    <ul className='book-func__links'>
      {
        titleArr.map((item, index) => (
          <li
            key={index}
            onClick={() => setActiveTab(item.title)}
            className={activeTab === item.title ? 'active-link' : ''}
          >
            {item.value}
          </li>
        ))
      }
    </ul>
    <div className="book-func__items">
      {
        activeTab === 'annotation' ?
          <Annotation annotation={annotation} /> :
          activeTab === 'a-book' ?
            <AudioBook /> :
            activeTab === 'e-book' ?
              <EBook /> :
              activeTab === 'reviews' ?
                <Reviews reviews={reviews}/> :
                <AddReview />
      }
    </div>
  </div>
}

export default BookFunctional
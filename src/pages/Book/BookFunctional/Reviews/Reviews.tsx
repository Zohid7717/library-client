import { FC } from 'react'

import './Reviews.scss'
import { ReviewType } from '../../../../server/redux/bookSlice/types'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'

type Props = {
  reviews: ReviewType[]
}

const Reviews: FC<Props> = ({ reviews }) => {
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode:"onChange"
  })
  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
    reset()
  })
  return <div className='reviews func-container'>
    <h2>{t('book.Reviews')}</h2>
    <form onSubmit={onSubmit}>
      <textarea
        placeholder={t('book.Your review')}
        {...register('comment', {
          required: t("Authorization.error empty input")
        })}
      ></textarea>
      {errors?.comment && <p className='form-error'>{String(errors.comment.message)}</p>}
      <button type='submit'>{ t('book.Save')}</button>
    </form>
    <div className="reviews__wrap">
      {
        reviews.length > 0 ?
          reviews.map((item, index) => (
            <div key={index} className='reviews__item'>
              <blockquote>
                {item.comment}
              </blockquote>
              <cite>
                <span>{item.user.user_firstname} </span>
                <span>{item.user.user_lastname}</span>
              </cite>
              
            </div>
          )) : <p>{t('book.Empty review')}</p>
      }
    </div>
  </div>
}

export default Reviews
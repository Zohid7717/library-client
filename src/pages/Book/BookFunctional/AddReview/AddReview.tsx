import { FC } from 'react'

import './AddReview.scss'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'

const AddReview: FC = () => {
  const {t}=useTranslation()
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

  return <div className='add-review func-container'>
    <h2>{t('book.Add Review')}</h2>
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
  </div>
}

export default AddReview
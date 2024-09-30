import { FC } from 'react'
import './Annotation.scss'
import { useTranslation } from 'react-i18next'

type Props = {
  annotation: string
}

const Annotation: FC<Props> = ({ annotation }) => {
  const { t } = useTranslation()
  return <div className='annotation func-container'>
    <h2>{t('book.Annotation')}</h2>
    <p>{annotation}</p>
  </div>
}

export default Annotation
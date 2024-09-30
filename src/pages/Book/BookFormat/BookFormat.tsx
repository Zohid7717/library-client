import { FC } from 'react'
import './BookFormat.scss'
import trueIcon from '../../../assets/images/icon/true.svg'
import falseIcon from '../../../assets/images/icon/false.svg'

type Props = {
  title: string,
  status: boolean
}

const BookFormat: FC<Props> = ({ title, status }) => {
  console.log(status)
  return <div className='format'>
    {status ?
      <img src={trueIcon} alt='we have this copy' /> :
      <img src={falseIcon} alt='we do not have this copy' />
    }
    <p>{title}</p>
  </div>
}

export default BookFormat
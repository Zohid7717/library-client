import { FC, useEffect } from 'react'
import { useAppDispatch } from '../../../server/redux/hooks'
import { clearMessage } from '../../../server/redux/toastSlice/toastSlice'
import './Toast.scss'

interface ToastProps {
  message: string | null,
  onClose: ()=>void
}

const Toast: FC<ToastProps> = ({message, onClose}) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const timeOut = setTimeout(() => {
      onClose()
    }, 5000)
    if (message) {
      dispatch(clearMessage())
    }
    return ()=> clearTimeout(timeOut)
  },[onClose])
  return <div className='toast'>
    <p>{message}</p>
    <button onClick={onClose} className='close-btn'></button>
  </div>
}

export default Toast
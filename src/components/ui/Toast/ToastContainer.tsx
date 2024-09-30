import { FC, useEffect, useState } from 'react'
import { useAppSelector } from '../../../server/redux/hooks'
import Toast from './Toast'

const ToastContainer: FC = () => {
  const message = useAppSelector(state => state.toastSlice.message)
  const [toasts, setToasts] = useState<string[]>([])
  const addToast = (message: string) => {
    setToasts([...toasts, message])
  }
  const removeToast = (index: number) => {
    const newToasts = [...toasts]
    newToasts.splice(index, 1)
    setToasts(newToasts)
  }

  useEffect(() => {
    if (message) {
      addToast(message)
    }
  }, [message])

  return <div className='toast-container'>
    {
      toasts.map((message, i) => (
        <Toast key={i} message={message} onClose={() => removeToast(i)} />
      ))
    }
  </div>
}

export default ToastContainer
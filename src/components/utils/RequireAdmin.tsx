import { FC, ReactNode } from 'react'
import { useAppSelector } from '../../server/redux/hooks'
import { Navigate, useLocation } from 'react-router-dom'

const RequireAdmin: FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation()
  const isRole = useAppSelector(state => state.user.role)
  console.log(isRole)
  if (isRole !== 'admin') {
    return <Navigate to='/login' state={{ from: location }} />
  }
  return children
}

export default RequireAdmin
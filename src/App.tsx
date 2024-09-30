import './App.scss'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout/MainLayout';
import React, { Suspense, useEffect } from 'react';
import Home from './pages/Home/Home';
import ToastContainer from './components/ui/Toast/ToastContainer';
import { useAppDispatch } from './server/redux/hooks';
import { getMe } from './server/redux/userSlice/userSlice';
import RequireAdmin from './components/utils/RequireAdmin';
import Book from './pages/Book/Book';

const LoginPage = React.lazy(() => import('./pages/Login/Login'))
const AdminPage = React.lazy(() => import('./pages/Admin/Admin'))
const AddBookPage = React.lazy(() => import('./pages/AddBook/AddBook'))

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<MainLayout />}>
    <Route path='' element={
      <Suspense fallback={
        <p>Loading...</p>
      }>
        <Home />
      </Suspense>
    } />

    <Route path='admin' element={
      <Suspense fallback={
        <p>Loading...</p>
      }>
        <AdminPage />
      </Suspense>
    } />

    <Route path='login' element={
      <Suspense fallback={
        <p>Loading...</p>
      }>
        <LoginPage />
      </Suspense>
    } />
    <Route path='addbook' element={
      <Suspense fallback={
        <p>Loading...</p>
      }>
        <RequireAdmin>
          <AddBookPage />
        </RequireAdmin>
      </Suspense>
    } />
    <Route path='book/:id' element={ 
      <Suspense fallback={
        <p>Loading...</p>
      }>
        <Book/>
      </Suspense>
    } />
  </Route>
))
function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getMe())
  }, [])
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

export default App

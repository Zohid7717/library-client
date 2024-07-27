import './App.scss'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout/MainLayout';
import { Suspense } from 'react';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<MainLayout />}>
    <Route path='' element={
      <Suspense fallback={
        <p>Loading...</p>
      }>
        <Home />
      </Suspense>
    } />
    <Route path='login' element={ 
      <Suspense fallback={
        <p>Loading...</p>
      }>
        <Login/>
      </Suspense>
    } />
  </Route>
))
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App

import './App.scss'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout/MainLayout';
import { Suspense } from 'react';
import Home from './pages/Home/Home';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<MainLayout/>}>
    <Route path='' element={
      <Suspense fallback={
        <p>Loading...</p>
      }>
        <Home/>
      </Suspense>
    }
    />
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

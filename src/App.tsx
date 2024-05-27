import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


//pagesComponents
import PageSingInOut from './pages/singInOut/singInOut'

function App() {

  const router = createBrowserRouter([
    {
      path: "/sing-in-out",
      element: <PageSingInOut/>
    }
  ])
  
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App

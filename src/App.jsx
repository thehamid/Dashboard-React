import { useState } from 'react'
import Register from './features/identity/components/register/register'
import { RouterProvider } from 'react-router-dom'
import  router from "./router";



function App() {
  return (
   <RouterProvider router={router} />
  )
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Carts from './pages/Carts'
import Home from './pages/Home'
import Orders from './pages/Orders'
import Signup from './pages/Auth/Signup'
import Signin from './pages/Auth/Signin'
import Auth from './pages/Auth/Auth'



function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
          {/* auth parent route */}
        <Route path = '/auth'>
          <Route index element = {<Auth />}/>
          <Route path='signup' element = {<Signup />} />
          <Route path='signin' element = {<Signin />} />
        </Route>
        {/* dashboard route */}
        <Route path = '/' element = {<Dashboard />}>
          <Route index element = {<Home/>} />
          <Route path='/products' element = {<Products />} />
          <Route path='/product/:id' element = {<ProductDetail/>} />
          <Route path='/carts' element = {<Carts/>} />
          <Route path='/orders' element = {<Orders/>} />
        
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

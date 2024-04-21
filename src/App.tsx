
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { lazy } from 'react'
import ProtectedRoute from './protectedRoute/ProtectedRoute';
import React from 'react';


const Home = lazy(()=> import('./pages/Home/Home'));
const Products = lazy(()=> import('./pages/product/Products'));
const Details = lazy(()=> import('./pages/product/Details'));
const Login = lazy(()=> import('./pages/login/Login'));
const Cart = lazy(()=>import('./pages/cart/Cart'));

function App() {
  

  return (
    <>
     <BrowserRouter>
     
     <Routes>
     <Route path='/login' element ={<ProtectedRoute/>}>
      <Route index element={<Login/>}/>
     </Route>
     <Route path='/' element ={<ProtectedRoute/>}>
      <Route index element={<Home/>}/>
     </Route>
     <Route path='/products' element ={<ProtectedRoute/>}>
      <Route index element={<Products/>}/>
     </Route>
     <Route path={`/details/:id`} element ={<ProtectedRoute/>}>
      <Route index element={<Details/>}/>
     </Route>
     <Route path={`/cart`} element ={<ProtectedRoute/>}>
      <Route index element={<Cart/>}/>
     </Route>

     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App

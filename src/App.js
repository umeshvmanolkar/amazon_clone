import React from 'react'
import Header from './componenets/header/Header';
import Footer from './componenets/footer/Footer';
import {createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider, ScrollRestoration}  from 'react-router-dom';
import Home from './pages/Home';
import { productsData } from './api/Api';
import Signin from './pages/Signin';
import Cart from './pages/Cart';
import Registration from './pages/Registration';
import ProductsDetails from './pages/ProductsDetails';

const Layout = () =>{

  return(
    <div>
      <Header />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </div>
  )
}
function App() {
  const router = createBrowserRouter(createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} loader={productsData}></Route>
        <Route path="/login" element={<Signin />}></Route>
        <Route path="/register" element={<Registration />}></Route>
        <Route path="/cart" element={<Cart /> }></Route>
        <Route path="/productDeatils/:id" element={<ProductsDetails />}></Route>
      </Route>
      
  ))
  return (
    <div className='font-bodyFont bg-gray-100'>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;

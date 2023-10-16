import React from 'react'
import Banner from '../componenets/home/Banner'
import Products from '../componenets/home/Products'


const Home = () => {

  return (
    <div>
      <Banner />
      <div className='w-full -mt-14 xl:-mt-36 py-14 px-5'>
        <Products />
      </div>
    </div>
  )
}

export default Home

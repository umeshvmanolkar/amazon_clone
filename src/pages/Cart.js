import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { decrementQuantity, deleteItem, incrementQuantity, resetCart } from '../redux/amazonSlice';
import { emptyCart } from '../assets/images/index';
import {motion} from 'framer-motion';
import { Link } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.amazon.products);
  const [totalPrice, setTotalPrice]=useState("");
  useEffect(()=>{
    let Total=0;
    products.map((items)=>{
      Total += items.price * items.quantity;
      return setTotalPrice(Total.toFixed(2));
    })
  }, [products])
  return (
    <div className='w-full bg-gray-100 p-4'>
     {
      products.length>0?(
        <div className='container mx-auto h-auto grid grid-cols-5 gap-8'>
        <div className='w-full h-full bg-white px-4 col-span-4'>
          <div className='font-titleFont flex items-center justify-between border-b-[1px] border-b-gray-400 py-3'>
            <h2 className='text-3xl font-medium'>Shopping Cart</h2>
            <h4 className='text-xl font-normal'>Subtitle</h4>
          </div>
          {/* Products starts Here */}
          <div>
            {
              products.map((items)=>(
                <div key={items.id} className='w-full border-b-[1px] border-b-gray-300 p-4 flex items-center gap-6'>
                 <div className='w-full flex items-center gap-6'>
                 <div className='w-2/5'>
                    <img className="w-full h-44 object-contain" src={items.image}  alt="Product Image"/>
                  </div>
                  <div className='w-4/5'>
                    <h2 className='font-semibold text-lg'>{items.title}</h2>
                    <p className='text-sm'>{items.description.substring(0,200)}</p>
                    <p className='font-semibold text-base'>${items.price}</p>
                    <div className='bg-[#F0F2F2] flex justify-center items-center gap-1 w-24 py-1 text-center drop-shadow-lg rounded-md'>
                      <p>Qty:</p>
                      <p onClick={() => dispatch(decrementQuantity(items.id))} className='cursor-pointer bg-gray-200 px-1 rounded-md hover:bg-gray-400 duration-300'>-</p>
                      <p>{items.quantity}</p>
                      <p onClick={()=>dispatch(incrementQuantity(items.id))} className='cursor-pointer bg-gray-200 px-1 rounded-md hover:bg-gray-400 duration-300'>+</p>
                    </div>
                    <button onClick={() =>dispatch(deleteItem(items.id))} className='bg-red-500 w-36 py-1 rounded-lg text-white mt-2 hover:bg-red-700 active:bg-red-900 duration-300'> Delete Item</button>
                  </div>
                  <div>
                    <p>${items.price * items.quantity}</p>
                  </div>
                 </div>
                </div>
              ))
            }
          </div>
          <div className='w-full py-2'>
            <button onClick={()=>dispatch(resetCart())} className='px-10 py-2 bg-red-500 hover:bg-red-600 active:bg-red-500 text-white rounded-lg font-titleFont font-semibold text-lg tracking-wide mt-3'>Clear Cart</button>
          </div>
        </div>
        <div className='bg-full h-52 bg-white col-span-1 flex flex-col items-center justify-center p-4'>
          <div>
            <p className='flex gap-2 items-start text-sm'>
              <span><CheckCircleRoundedIcon className='bg-white text-green-500 rounded-full' /></span>
            Your order qualifies for FREE Shipping Choose this option at checkout. See details...</p>
          </div>
          <div>
            <p className='font-semibold px-10 py-1 flex items-center gap-2 justify-between'>
              Total: <span className='text-lg font-bold'> ${totalPrice}</span></p>
          </div>
          <button className='w-full font-titleFont font-medium text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border hover:from-yellow-300 hover:to-yellow border-yellow-500 hover:border-yellow-700 active:bg-gredient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200 py-1.5 rounded-md mt-3'> Proceed To Pay </button>
        </div>
      </div>
      ):
      <motion.div 
          initial={{ y: 70, opacity: 0 }}
          animate={{ y:0, opacity:1 }}
          transition={{ delay:0.5, duration: 0.5 }}
          className='flex justify-center items-center gap-4 py-10'>
        <div>
          <img classname="w-80 rounded-lg p-4 mx-auto"
          src={emptyCart} alt="Empty cart image" />
        </div>
        <div className='w-96 p-4 bg-white flex flex-col items-center rounded-md shadow-lg'>
          <h2 className='font-titleFont text-xl font-bold'>Your's Amazon Cart is empty.</h2>
          <p className='text-sm text-center'>Shop on today's deal</p>
          <Link to="/">
          <button className='mt-6 bg-yellow-400 rounded-md cursor-pointer hover:bg-yellow-500 active:bg-yellow-700 px-8 py-2 font-titleFont font-semibold text-lg'>Continue Shopping</button>
          </Link>
        </div>
      </motion.div>
     }
    </div>
  )
}

export default Cart

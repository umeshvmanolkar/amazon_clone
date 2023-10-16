import React from 'react'
import { Link } from 'react-router-dom'

const FooterTop = () => {
  return (
    <div className='w-full bg-white py-6'>
        {/* border-t-[1px] border-b-[1px]  */}
      <div className='w-full py-8'> 
        <div className='w-64 mx-auto text-center flex flex-col gap-1'>
            <p className='text-sm'>See personalized recommendations</p>
            <Link to="/login">
              <button className='w-full bg-yellow-400 rounded-md py-1 font-semibold cursor-pointer hover:bg-yellow-500 active:bg-yellow-700'>Sign In</button>
            </Link>
            <Link to="register">
            <p className='text-xs mt-1'>New Customer? {" "} 
                <span className='text-blue-600 ml-1 cursor-pointer'>Start Here.</span></p>
            </Link>
          
        </div>
      </div>
    </div>
  )
}

export default FooterTop

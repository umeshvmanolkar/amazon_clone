import React from 'react'
import { footerBottomItem } from '../../constants'

const FooterBottom = () => {
  return (
    <div className='w-full bg-footerBottom py-8'>
      <div className='max-w-5xl mx-auto px-4'>
        <div className='text-gray-400 w-full grid grid-cols-2 md:grid-cols-3 lgl:grid-cols-5 gap-5 place-content-center'>
          {
            footerBottomItem.map((item)=>(
              <div className="group cursor-pointer" key={item._id}>
                <h6 className='w-32 group-hover:underline text-[#DDD] leading-3 mb-2'>{item.title}</h6>
                <p className='w-32 tracking-tight text-[12px] text-[#999] group-hover:underline leading-3'>{item.des}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default FooterBottom

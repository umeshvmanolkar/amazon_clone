import React, { useEffect, useRef, useState } from 'react';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SidenavContent from './SidenavContent';
import {motion} from 'framer-motion';
import { useSelector } from 'react-redux';


const HeaderBottom = () => {
    const ref=useRef();
    const userInfo = useSelector((state) => state.amazon.userInfo);
    const [sidebar, setSidebar] = useState(false);
    useEffect(()=>{
        document.body.addEventListener("click", (e)=>{
           if(e.target.contains(ref.current)){
            setSidebar(false)
           }
        })
    },[ref,sidebar])
  return (
    <div className='w-full px-4 h-[36px] bg-amazon_light text-white flex items-center'>
      <ul className='flex items-center gap-2 text-sm tracking-wide'>
        <li onClick={() =>setSidebar(true) } className='headerHover flex items-center gap-2 text-sm tracking-wide'><MenuOutlinedIcon />All</li>
        <li className='headerHover hidden mdl:inline-flex'>Today's Deal</li>
        <li className='headerHover hidden mdl:inline-flex'>Customer Service</li>
        <li className='headerHover hidden mdl:inline-flex'>Gift Card's</li>
        <li className='headerHover hidden mdl:inline-flex'>Registry</li>
        <li className='headerHover hidden mdl:inline-flex'>Sell</li>
      </ul>
      {/* Sidebar */}
      {
        sidebar && (
            <div className='w-full h-screen text-black fixed top-0 left-0 bg-amazon_light bg-opacity-50'>
                <div className='w-full h-full relative'>
                    <motion.div ref={ref} initial={{x:-500,opacity:0}} animate={{x:0, opacity:1}}  transition={{duration:.5}} className='w-[80%]  md:w-[350px] h-full bg-white border border-black'>
                        <div className='w-full bg-amazon_light text-white px-6 py-2 flex itmes-center gap-4'>
                            <AccountCircleIcon />
                            {
                              userInfo ? (
                                <h3 className='font-titleFont font-bold text-lg tracking-wide'>{userInfo.userName}</h3>
                              ):(
                                <h3 className='font-titleFont font-bold text-lg tracking-wide'>Hello, Sign In</h3>
                              )
                            }
                        </div>
                       <SidenavContent title="Trending" one="Best Selers" two="New Releases" three="Movers & Shakers" />
                       <SidenavContent title="Digital Content & Devices" one="Echo & Alexa" two="Fire TV" three="Amazon Prime Videos"  four="Amazon Prime Music" />
                       <SidenavContent title="Shop By Categories" one="Mobiles, Computers" two="TV, Appliances, Electronics" three="Men's Fashion" four="Women's Fashion"  />
                       <SidenavContent title="Program & Features" one="Gift Card's" two="Mobile Recharges" three="Flight Tickets" />
                       <SidenavContent title="Help & Settings" one="Your Account" two="Customer Service" three="Sign In" />
                       <span onClick={() => setSidebar(false)}className='cursor-pointer absolute top-0 left-[82%] mdl:left-[360px] w-10 h-10 text-black flex items-center justify-center border bg-gray-200 hover:bg-red-500 hover:text-white duration-300'><CloseIcon /></span>
                    </motion.div>
                    
                </div>
            </div>
        )
      }
    </div>
  )
}

export default HeaderBottom

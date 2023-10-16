import React, { useRef, useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {logo} from '../../assets/images/index';
import {allItems} from '../../constants/index';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import HeaderBottom from './HeaderBottom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import { getAuth, signOut } from "firebase/auth";
import { userLogout } from '../../redux/amazonSlice';

const Header = () => {
    const ref = useRef();
    const auth = getAuth();
    const dispatch = useDispatch();
    const [showAll, setShowAll] = useState(false);
    const products = useSelector((state) => state.amazon.products);
    const userInfo = useSelector((state) => state.amazon.userInfo);

    const handleLogout=() =>{
        console.log("Done")
        signOut(auth).then(() => {
            console.log("Sign-out successful.");
            dispatch(userLogout());
          }).catch((error) => {
            console.log("An error happened.");
          });
    }

  return (
    <div className='w-full sticky top=0 z-50'>
      <div className='max-w-container bg-black text-white px-4 py-3 flex items-center gap-4'>
        {/* Logo */}
       <Link to='/'>
            <div className="headerHover">
                <img className="mt-2 w-24" src={logo} alt="logo" />
            </div>
       </Link>
        {/* Delivery To */}
        <div className="headerHover hidden mdl:inline-flex">
            <LocationOnIcon/>
            <p className='text-sm text-lightText font-light flex flex-col'>
                Deliver to {" "} 
                <span className='text-sm font-semibold -mt-1 text-whiteText'>Panchkula</span>
            </p>
        </div>
        {/* Serach Bar */}
        <div className='h-10 rounded-md hidden lgl:flex flex-grow relative'> 
            <span onClick={() => setShowAll(!showAll)} className='w-14 h-full bg-gray-200 hover:bg-gray-300 border-2 cursur-pointer duration-300 text-sm text-amazon_light font-titleFont flex itmes-center justify-center rounded-tl-md rounded-bl-md'>
                All
                <span>
                    <ArrowDropDownIcon />
                </span>
                {
                    showAll && (
                        <div>
                            <ul className='absolute w-56 h-80 top-10 left-0 overflow-y-scroll overflow-x-hidden bg-white border-[1px] border-amazon_light text-black p-2 flex-col gap-1 z-50'>
                                {allItems.map((items) => (
                                    <li className='text-sm tracking-wide font-titleFont border-b-[1px] border-b-transparent hover:border-b-amazon_light cursor-pointer duration-200' key={items.id}>{items.title}</li>
                                ))}
                            </ul>
                        </div>
                    )
                }
            </span>
            <input className="h-full text-base text-amazon_light flex-grow outline-none border-none px-2" type="text" />
            <span className='w-12 h-full flex items-center justify-center bg-amazon_yellow hover:bg-[#f3a847] duration-300 text-amazon_light curser-pointer rounded-tr-md rounded-br-md'>
                <SearchIcon />
            </span>
        </div>
        {/* Accounts & List */}
       <Link to="/login">
        <div className='flex-col items-start justify-center px-2 h-[80%] flex border border-transparent hover:border-white cursor-pointer duration-100'>
            {
                userInfo?(
                    <p className='text-sm mdl:text-sm text-white mdl:text-lightText font-light'>
                        {userInfo.userName}
                    </p>
                ):(
                    <p className='text-sm mdl:text-xstext-white mdl:text-lightText font-light'>Hello, sign in</p>
                )
            }
                
                <p className='text-sm font-semibold -mt-1 text-WhiteText hidden mdl:flex'>Accounts & List{" "}
                <span><ArrowDropDownOutlinedIcon /></span></p>
            </div>
       </Link>
        {/* Orders */}
        <div className='hidden lgl:flex flex-col items-start justify-center px-2 h-[80%] border border-transparent hover:border-white cursor-pointer duration-100'>
            <p className='text-xs text-lightText font-light'>Return</p>
            <p className='text-sm font-semibold -mt-1 text-WhiteText'>& Orders</p>
        </div>
        {/* Cart */}
        <Link to='/cart'>
            <div className='flex items-start justify-center px-2 h-[80%] border border-transparent hover:border-white cursor-pointer duration-100 relative'>
                <ShoppingCartIcon />
                <p className='text-xs font-semibold mt-3 text-WhiteText'>Cart 
                    <span className='absolute text-xs -top-1 left-6 font-semibold p-1 h-4 bg-[#f3a847] text-amazon_light rounded-full flex justify-center items-center'>{products.length>0?products.length:0}</span></p>
            </div>
        </Link>
        {
            userInfo && (
                <div onClick={handleLogout} className='flex flex-col justify-center items-center headerHover relative'>
                    <LogoutIcon />
                    <p className='hidden mdl:inline-flex text-xs font-semibold text-white'>Log out</p>
                </div>
            )
        }
      </div>
      <HeaderBottom />
    </div>
  )
}

export default Header
